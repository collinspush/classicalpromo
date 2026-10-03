# ClassicalPromo

Music promotion platform for artists, managers, labels and partners.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Demo password for every sample account: `PitchDemo2026!`

- artist@classicalpromo.com.ng
- manager@classicalpromo.com.ng
- label@classicalpromo.com.ng
- partner@classicalpromo.com.ng
- admin@classicalpromo.com.ng

The first request creates `data/db.json`. Campaign numbers in that workspace are labelled demo data.

## Production data

PostgreSQL schema: `prisma/schema.prisma`.

```bash
docker compose up -d
npx prisma db push
```

Copy `.env.example` to `.env.local` and set `AUTH_SECRET`. Payment and SMTP secrets stay in the environment. They are not shipped to the browser.

Until `DATABASE_URL` is connected in application code, the JSON store is the working database for this foundation.
