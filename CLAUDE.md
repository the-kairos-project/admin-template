# Admin Template

Template monorepo for building Convex admin back-offices.

## Structure
- `backend/` -- Convex backend with example schema
- `apps/back-office/` -- Admin UI (React + ag-grid + @kairos/admin-ui)
- `apps/forms/` -- Public forms (React + TanStack Router)

## Key Customization Points
- `backend/convex/schema.ts` -- Table definitions
- `backend/convex/config.ts` -- Admin email list
- `apps/back-office/src/lib/store.ts` -- Program configuration
- `apps/back-office/src/lib/admin-config.tsx` -- AdminProvider config

## Commands
- `bun run dev` -- Start all services
- `bun run dev:backoffice` -- Back-office + backend only
- `bun run dev:forms` -- Forms + backend only
- `bun run build` -- Build all
- `bun run check-types` -- TypeScript check

## Package Manager
Always use `bun` (not npm/yarn/pnpm).
