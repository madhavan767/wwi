# WWI Careers API — Cloudflare Worker

Production backend for Work Wizards Innovations careers.
Stack: **Hono · D1 · R2 · KV** on Cloudflare Workers.

- Worker URL: `https://wwi-careers-api.workwizardsinnovations-official.workers.dev`
- Custom domain: `https://c.wwi.org.in`
- Frontend origin: `https://wwi.org.in` (CORS allow-list in `wrangler.toml`)

## Endpoints

| Method | Path                       | Auth  |
| ------ | -------------------------- | ----- |
| GET    | `/health`                  | –     |
| GET    | `/jobs`                    | –     |
| GET    | `/jobs/open`               | –     |
| GET    | `/jobs/archived`           | –     |
| GET    | `/jobs/count`              | –     |
| GET    | `/jobs/:id`                | –     |
| POST   | `/jobs`                    | admin |
| PUT    | `/jobs/:id`                | admin |
| DELETE | `/jobs/:id`                | admin |
| POST   | `/upload` (multipart)      | –     |
| GET    | `/applications`            | admin |
| GET    | `/applications/:id`        | admin |
| PUT    | `/applications/:id/status` | admin |
| PUT    | `/applications/:id/notes`  | admin |
| DELETE | `/applications/:id`        | admin |
| GET    | `/settings`                | –     |
| PUT    | `/settings`                | admin |

Admin auth: `Authorization: Bearer <ADMIN_TOKEN>`.

---

## One-time deploy

```bash
cd cloudflare-worker
npm install            # or: bun install

# Auth Cloudflare
npx wrangler login

# 1) Create D1 database (copy the printed database_id into wrangler.toml)
npx wrangler d1 create wwi_careers

# 2) Create R2 bucket for resumes
npx wrangler r2 bucket create wwi-careers-resumes
# Enable a public r2.dev URL for the bucket in the Cloudflare dashboard
# (R2 → wwi-careers-resumes → Settings → Public access).
# Paste that URL into wrangler.toml -> R2_PUBLIC_URL.

# 3) Create KV namespace (copy the id into wrangler.toml)
npx wrangler kv namespace create WWI_KV

# 4) Set the admin bearer token (used by dashboard write endpoints)
npx wrangler secret put ADMIN_TOKEN
# paste a long random string when prompted

# 5) Apply migrations to the remote D1
npx wrangler d1 migrations apply wwi_careers --remote

# 6) Deploy
npx wrangler deploy
```

After step 6 the API is live at the worker URL and at `c.wwi.org.in`.

## Smoke test

```bash
curl https://wwi-careers-api.workwizardsinnovations-official.workers.dev/health
curl https://wwi-careers-api.workwizardsinnovations-official.workers.dev/jobs/open
curl -X POST https://wwi-careers-api.workwizardsinnovations-official.workers.dev/jobs \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Frontend Engineer","department":"Engineering","location":"Remote","employmentType":"Full Time","experience":"2+ yrs","salaryRange":"₹6–12 LPA","skills":"React, TypeScript","description":"Build the WWI web platform.","deadline":"2026-12-31","status":"OPEN","published":true}'
```

## Frontend wiring (already in repo)

```
VITE_API_URL=https://wwi-careers-api.workwizardsinnovations-official.workers.dev
VITE_R2_PUBLIC_URL=<paste R2 public URL>
```

Dashboard sends `Authorization: Bearer <ADMIN_TOKEN>` on write calls. Add the same token to the frontend env as `VITE_ADMIN_TOKEN` (or paste at login in the dashboard) — keep it out of public builds.

## Local dev

```bash
npx wrangler d1 migrations apply wwi_careers --local
npx wrangler dev
```

## Updating

After editing `migrations/*.sql`:

```bash
npx wrangler d1 migrations apply wwi_careers --remote
npx wrangler deploy
```
