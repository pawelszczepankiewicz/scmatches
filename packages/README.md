# Live Match Dashboard

Full-stack sports match dashboard with real-time score updates. Built as a refactoring of the Statscore recruitment exercise.

## Architecture

- **Frontend** — Vue 3 + TypeScript + SCSS (Statscore design system)
- **Backend** — NestJS + Firestore + REST API
- **Shared** — Common types and config-driven sport parsing logic
- **Monorepo** — npm workspaces

## Quick Start for Local Env

```bash
npm install

# Start backend (requires Firebase project "statscoreapp")
npm run dev:backend

# Start frontend (separate terminal)
npm run dev:frontend
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:3000`.

## Project Structure

```
packages/
  shared/     — TypeScript types, sport config map, score formatters
  backend/    — NestJS app with Firestore and REST API
  frontend/   — Vue.js dashboard with Statscore styling
original-exercise/
  app.js      — Original unmodified exercise file
  readme.md   — Original task description
```

## Key Design Decisions

- **Config-driven dispatch** — Sport-specific behavior (name separators, score formatting) is defined in a single config map, eliminating all if/else chains from the original code
- **REST API** — CRUD endpoints for match data with input validation
- **Security essentials** — Helmet, CORS whitelist, rate limiting (`@nestjs/throttler`), input validation (`class-validator`)

## Tests

```bash
npm test
```

