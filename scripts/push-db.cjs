const { execSync } = require("child_process");

if (process.env.VERCEL !== "1") {
  console.log("Skipping database push outside Vercel.");
  process.exit(0);
}

const pooled = process.env.DATABASE_URL;
if (!pooled) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const direct = process.env.DATABASE_URL_UNPOOLED || pooled.replace("-pooler.", ".").replace("-pooler", "");

execSync("npx prisma generate", { stdio: "inherit" });
execSync("npx prisma db push --skip-generate", {
  stdio: "inherit",
  env: { ...process.env, DATABASE_URL: direct },
});
