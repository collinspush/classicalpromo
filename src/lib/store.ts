import "server-only";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { createHash, randomBytes, randomUUID } from "crypto";
import type { Prisma } from "@prisma/client";
import { createSeed } from "@/lib/seed";
import type { AuditRecord, Database, NotificationRecord, UserRecord } from "@/lib/types";

const dbPath = path.join(process.cwd(), "data", "db.json");
const redirectPath = path.join(process.cwd(), "data", "redirects.json");
const DB_KEY = "database";
const OUTBOX_KEY = "outbox";

function usePostgres() {
  return process.env.NODE_ENV === "production" && Boolean(process.env.DATABASE_URL);
}

function writeRedirectFile(db: Database) {
  fs.mkdirSync(path.dirname(redirectPath), { recursive: true });
  fs.writeFileSync(redirectPath, JSON.stringify(db.redirects, null, 2));
}

function readFileDb(): Database {
  if (!fs.existsSync(dbPath)) {
    const initial = createSeed(bcrypt.hashSync("PitchDemo2026!", 10));
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify(initial, null, 2));
    writeRedirectFile(initial);
    return initial;
  }
  return JSON.parse(fs.readFileSync(dbPath, "utf8")) as Database;
}

function writeFileDb(db: Database) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  writeRedirectFile(db);
}

function asDatabase(value: unknown): Database | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Partial<Database>;
  if (!Array.isArray(record.users) || !record.settings) return null;
  return record as Database;
}

async function prismaClient() {
  const { prisma } = await import("@/lib/prisma");
  return prisma;
}

async function readPostgres(): Promise<Database> {
  const prisma = await prismaClient();
  const row = await prisma.setting.findUnique({ where: { key: DB_KEY } });
  const existing = asDatabase(row?.value);
  if (existing) return existing;
  const initial = createSeed(bcrypt.hashSync("PitchDemo2026!", 10));
  try {
    await prisma.setting.create({
      data: { key: DB_KEY, value: initial as unknown as Prisma.InputJsonValue },
    });
    return initial;
  } catch {
    const again = await prisma.setting.findUnique({ where: { key: DB_KEY } });
    const saved = asDatabase(again?.value);
    if (saved) return saved;
    throw new Error("Could not seed the database");
  }
}

export async function readDb(): Promise<Database> {
  if (!usePostgres()) return readFileDb();
  return readPostgres();
}

export async function updateDb<T>(mutator: (db: Database) => T): Promise<T> {
  if (!usePostgres()) {
    const db = readFileDb();
    const result = mutator(db);
    writeFileDb(db);
    return result;
  }
  const prisma = await prismaClient();
  const copy = JSON.parse(JSON.stringify(await readPostgres())) as Database;
  const result = mutator(copy);
  const value = copy as unknown as Prisma.InputJsonValue;
  await prisma.setting.upsert({
    where: { key: DB_KEY },
    create: { key: DB_KEY, value },
    update: { value },
  });
  return result;
}

export function publicUser(user: UserRecord) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    emailVerified: user.emailVerified,
    demo: user.demo,
    phone: user.phone,
    country: user.country,
    city: user.city,
    company: user.company,
    notifyEmail: user.notifyEmail,
    profile: user.profile,
  };
}

export async function findUserByEmail(email: string) {
  const db = await readDb();
  return db.users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function findUserById(id: string) {
  const db = await readDb();
  return db.users.find((user) => user.id === id) ?? null;
}

export async function addAudit(entry: Omit<AuditRecord, "id" | "createdAt">) {
  await updateDb((db) => {
    db.audit.unshift({ ...entry, id: `aud_${randomUUID()}`, createdAt: new Date().toISOString() });
  });
}

export async function notify(userId: string, type: string, title: string, body: string) {
  const user = await findUserById(userId);
  const record: NotificationRecord = {
    id: `ntf_${randomUUID()}`,
    userId,
    type,
    title,
    body,
    read: false,
    createdAt: new Date().toISOString(),
  };
  await updateDb((db) => {
    db.notifications.unshift(record);
  });
  if (user?.notifyEmail) {
    const message = {
      to: user.email,
      type,
      title,
      body,
      createdAt: record.createdAt,
      transport: process.env.SMTP_HOST ? "smtp" : "log",
    };
    if (usePostgres()) {
      const prisma = await prismaClient();
      const row = await prisma.setting.findUnique({ where: { key: OUTBOX_KEY } });
      const existing = Array.isArray(row?.value) ? [...row.value] : [];
      existing.unshift(message);
      const value = existing.slice(0, 200) as Prisma.InputJsonValue;
      await prisma.setting.upsert({
        where: { key: OUTBOX_KEY },
        create: { key: OUTBOX_KEY, value },
        update: { value },
      });
    } else {
      const outbox = path.join(process.cwd(), "data", "outbox.json");
      const existing = fs.existsSync(outbox) ? (JSON.parse(fs.readFileSync(outbox, "utf8")) as unknown[]) : [];
      existing.unshift(message);
      fs.writeFileSync(outbox, JSON.stringify(existing.slice(0, 200), null, 2));
    }
  }
  return record;
}

export async function issueToken(userId: string, purpose: "reset" | "verify") {
  const token = randomBytes(24).toString("hex");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60).toISOString();
  await updateDb((db) => {
    db.tokens = db.tokens.filter((item) => !(item.userId === userId && item.purpose === purpose));
    db.tokens.push({ id: `tok_${randomUUID()}`, userId, tokenHash, purpose, expiresAt });
  });
  return token;
}

export async function takeToken(token: string, purpose: "reset" | "verify") {
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const found = (await readDb()).tokens.find((item) => item.tokenHash === tokenHash && item.purpose === purpose);
  if (!found || new Date(found.expiresAt).getTime() < Date.now()) return null;
  await updateDb((db) => {
    db.tokens = db.tokens.filter((item) => item.id !== found.id);
  });
  return found;
}
