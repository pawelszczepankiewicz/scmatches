# Statscore Recruitment Task

A refactoring of the Statscore coding exercise, delivered in two forms:

## What's in this repo

| Folder                                     | Description                                                                                                                                              |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`simple-solution/`](simple-solution/)     | Standalone TypeScript refactoring of `app.js` — clean architecture, 18 tests, no frameworks. **Start here** to see the core refactoring.                 |
| [`packages/`](packages/)                   | Full-stack application (Vue 3 + NestJS + Firestore) — live match dashboard with real-time WebSocket updates, REST API, and a technical showcase section. |
| [`original-exercise/`](original-exercise/) | The original unmodified `app.js` and task description.                                                                                                    |

## Quick Links

- [Simple solution & problems analysis](simple-solution/README.md)
- [Full-stack app details, architecture, and setup](packages/README.md)
- [Original task description](original-exercise/README.md)

## Running the simple solution

```bash
cd simple-solution
npm install
npx tsx src/index.ts   # identical output to the original app.js
npx jest               # 18 tests
```

## Running the full-stack app

```bash
npm install
npm run dev:backend    # NestJS on :3000
npm run dev:frontend   # Vue on :5173
```

## AI-Assisted Development

Additional project ([`fullstack solution in /packages/`](packages/)) was built with the help of [Claude Code](https://claude.ai) (AI pair programming).

**What I decided:**

- Architecture: monorepo with shared package, NestJS + Vue, config-driven dispatch pattern
- Tech stack choices: Firestore, Socket.io, SCSS with design tokens
- UI/UX direction: scoreboard layout, page routing structure
- What to build and what to skip — scoping each feature to stay production-aware without over-engineering

**Where AI accelerated the work:**

- Scaffolding boilerplate (NestJS modules, Vue components, SCSS structure)
- Solving environment issues (CJS/ESM interop, SCSS module imports, Vite proxy config)
- Writing test cases after I defined what to test
- CSS responsive breakpoints and cross-browser details

**What I verified and adjusted:**

- Every architectural decision was a deliberate choice, not an AI suggestion accepted blindly
- Reviewed all generated code for correctness, security (no hardcoded secrets, proper validation), and consistency with the codebase patterns
- The `simple-solution/` folder demonstrates the core refactoring logic can be explained line by line

Using AI tooling is a deliberate skill choice — the same way a developer uses an IDE, linter, or Copilot. The value is in knowing _what to build_ and _when the output is correct_, not in typing speed.
