import "server-only";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { createHash, randomBytes, randomUUID } from "crypto";
import { createSeed } from "@/lib/seed";
import type { AuditRecord, Database, NotificationRecord, UserRecord } from "@/lib/types";

const dbPath = path.join(process.cwd(), "data", "db.json");
const redirectPath = path.join(process.cwd(), "data", "redirects.json");

function writeRedirectFile(db: Database) {
  fs.mkdirSync(path.dirname(redirectPath), { recursive: true });
  fs.writeFileSync(redirectPath, JSON.stringify(db.redirects, null, 2));
}

function ensure(): Database {
  if (!fs.existsSync(dbPath)) {
    const passwordHash = bcrypt.hashSync("PitchDemo2026!", 10);
    const initial = createSeed(passwordHash);
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify(initial, null, 2));
    writeRedirectFile(initial);
    return initial;
  }
  return JSON.parse(fs.readFileSync(dbPath, "utf8")) as Database;
}

export function readDb() {
  return ensure();
}

export function updateDb<T>(mutator: (db: Database) => T) {
  const db = ensure();
  const result = mutator(db);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  writeRedirectFile(db);
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

export function findUserByEmail(email: string) {
  return readDb().users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function findUserById(id: string) {
  return readDb().users.find((user) => user.id === id) ?? null;
}

export function addAudit(entry: Omit<AuditRecord, "id" | "createdAt">) {
  updateDb((db) => {
    db.audit.unshift({ ...entry, id: `aud_${randomUUID()}`, createdAt: new Date().toISOString() });
  });
}

export function notify(userId: string, type: string, title: string, body: string) {
  const user = findUserById(userId);
  const record: NotificationRecord = {
    id: `ntf_${randomUUID()}`,
    userId,
    type,
    title,
    body,
    read: false,
    createdAt: new Date().toISOString(),
  };
  updateDb((db) => {
    db.notifications.unshift(record);
  });
  if (user?.notifyEmail) {
    const outbox = path.join(process.cwd(), "data", "outbox.json");
    const existing = fs.existsSync(outbox) ? (JSON.parse(fs.readFileSync(outbox, "utf8")) as unknown[]) : [];
    existing.unshift({
      to: user.email,
      type,
      title,
      body,
      createdAt: record.createdAt,
      transport: process.env.SMTP_HOST ? "smtp" : "log",
    });
    fs.writeFileSync(outbox, JSON.stringify(existing.slice(0, 200), null, 2));
  }
  return record;
}

export function issueToken(userId: string, purpose: "reset" | "verify") {
  const token = randomBytes(24).toString("hex");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60).toISOString();
  updateDb((db) => {
    db.tokens = db.tokens.filter((item) => !(item.userId === userId && item.purpose === purpose));
    db.tokens.push({ id: `tok_${randomUUID()}`, userId, tokenHash, purpose, expiresAt });
  });
  return token;
}

export function takeToken(token: string, purpose: "reset" | "verify") {
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const found = readDb().tokens.find((item) => item.tokenHash === tokenHash && item.purpose === purpose);
  if (!found || new Date(found.expiresAt).getTime() < Date.now()) return null;
  updateDb((db) => {
    db.tokens = db.tokens.filter((item) => item.id !== found.id);
  });
  return found;
}
