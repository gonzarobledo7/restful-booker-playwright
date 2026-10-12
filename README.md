# restful-booker-playwright

[![CI](https://github.com/gonzarobledo7/restful-booker-playwright/actions/workflows/ci.yml/badge.svg)](https://github.com/gonzarobledo7/restful-booker-playwright/actions/workflows/ci.yml)

API, UI and E2E test automation for [Restful Booker Platform](https://github.com/mwinteringham/restful-booker-platform), a bed and breakfast booking system made of six REST services and a Next.js front end. Built with Playwright and TypeScript, and run in GitHub Actions against a Dockerized copy of the app.

## Why it is built this way

- **The pipeline owns its environment.** CI starts the app from pinned Docker images, waits until every service is healthy, runs the tests and tears everything down. Nothing depends on a shared environment that someone else can break.
- **Most checks live at the API level.** Business rules are verified against the services, where tests are fast and stable. The UI layer covers what only a browser can prove, and a few end-to-end flows cover the critical journeys.
- **A forgotten `await` fails the build.** ESLint runs with type information and treats floating promises as errors, which removes the most common source of flaky Playwright tests.

## System under test

| Service  | Port | Responsibility                   |
| -------- | ---- | -------------------------------- |
| booking  | 3000 | Bookings and availability        |
| room     | 3001 | Room catalogue                   |
| branding | 3002 | Hotel details shown on the site  |
| auth     | 3004 | Admin login and token validation |
| report   | 3005 | Booking report for the admin     |
| message  | 3006 | Contact form messages            |
| UI       | 3003 | Public site and admin panel      |

The app version is pinned in [`docker-compose.yml`](docker-compose.yml). Each start gives a freshly seeded database.

## Getting started

Requirements: Node 20 or newer and Docker.

```bash
npm ci
npx playwright install chromium
npm run app:up      # starts the app and waits until it is healthy
npm test
npm run app:down
```

On Apple Silicon the images run through emulation, so the first start takes a few minutes.

## Commands

| Command              | What it does                   |
| -------------------- | ------------------------------ |
| `npm test`           | Runs every test                |
| `npm run test:api`   | Runs the service-level tests   |
| `npm run test:ui`    | Runs the browser tests         |
| `npm run test:smoke` | Runs the tests tagged `@smoke` |
| `npm run report`     | Opens the last HTML report     |
| `npm run lint`       | Lints the code                 |
| `npm run typecheck`  | Type-checks the code           |

Service URLs can be overridden with environment variables; see [`.env.example`](.env.example).

## Project layout

```
src/config/     where the suite learns where the app lives
tests/api/      service-level tests, no browser
tests/ui/       browser tests
.github/        CI workflow, issue and pull request templates
```

## How work is tracked

Every change starts as an issue written as a user story with acceptance criteria, is developed on its own branch and reaches `main` through a pull request with green checks. Defects found in the app are reported as issues with steps, evidence and severity.

## Roadmap

- [x] Project foundation: tooling, Dockerized app, CI and health checks
- [ ] Auth API
- [ ] Room API
- [ ] Message API
- [ ] Booking API
- [ ] Admin UI with a reused login session
- [ ] End-to-end booking journey
- [ ] Full pipeline: smoke on pull requests, sharded regression, nightly run, published report
