# BT Projects — Company Website

A full-stack web project for **B T Projects Private Limited**, an engineering and infrastructure company working in water supply, water and sewage management, and operation and maintenance of related systems.

This repository contains the fuller application stack: a React frontend, server-side application/API code, shared types, database schema and deployment configuration. It is distinct from the lightweight marketing-site implementation in `blue-white-waterworks`.

## Technology

- React 19 and TypeScript
- Vite
- Express and tRPC
- Drizzle ORM
- MySQL driver (`mysql2`)
- Tailwind CSS v4 and Radix UI components
- Vitest
- pnpm

## Getting started

Use the package manager pinned in `package.json`.

```bash
git clone https://github.com/Lunatic5202/bt--projects.git
cd bt--projects
pnpm install
pnpm dev
```

The development command starts the server entry point in watch mode. Review the server configuration and required environment variables before connecting a database or external services.

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Build the client and bundle the server |
| `pnpm start` | Start the production server bundle |
| `pnpm check` | Run TypeScript checks |
| `pnpm test` | Run Vitest |
| `pnpm format` | Format source files |
| `pnpm db:push` | Generate and apply Drizzle migrations |

## Repository map

```text
client/       React application and page components
server/       Server entry point, routers and database integration
api/          API/deployment entry points
shared/       Shared schemas and types
drizzle/      Database schema and migration output
docs/         Project documentation
scripts/      Maintenance and deployment helpers
DEPLOY.md     Deployment notes
NOTES.md      Development continuity notes
```

## Enquiries and external services

The repository includes server-side enquiry handling and notification-related code. Configure database and notification credentials in the deployment environment, not in source control. Treat submitted contact information as personal data: restrict access, avoid logging full enquiry contents, and use an approved retention policy.

## Deployment

See [DEPLOY.md](DEPLOY.md) for the repository's Vercel workflow notes. Confirm the required Vercel secrets and database configuration in the target project before enabling production deployment. A successful build alone does not prove that external services are configured.

## Development guidance

Run the type check, tests and production build before shipping:

```bash
pnpm check
pnpm test
pnpm build
```

Keep the marketing content factual and obtain approval before publishing company claims, contact changes or customer/project information.
