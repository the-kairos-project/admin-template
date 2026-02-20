# Admin Template

A template monorepo for building Convex-powered admin back-offices using the `@kairos` package ecosystem. Out of the box, you get:

- **Back-office** -- An Airtable-style data management interface with inline editing, filters, views, and keyboard shortcuts
- **Forms app** -- A public-facing application form built with React and TanStack Router
- **Convex backend** -- Schema-as-code database with type-safe queries, mutations, and real-time subscriptions

This template is designed to be cloned and customized for your organization. Define your tables, configure access, and you have a working admin tool.

## Prerequisites

- [Bun](https://bun.sh/) (v1.1+)
- [Node.js](https://nodejs.org/) 20+
- A [Convex](https://convex.dev/) account (free tier available)

## Quick Start

```bash
# Clone the template
gh repo create my-org/admin --template the-kairos-project/admin-template
cd admin

# Install dependencies
bun install

# Start the Convex backend (follow prompts to create a project)
bunx convex dev

# In another terminal, start all apps
bun run dev
```

The back-office will be available at `http://localhost:3003` and the forms app at `http://localhost:3002`.

## Customization Guide

### Add Your Tables

Edit `backend/convex/schema.ts` to define your data model. Use `withMeta()` from `@kairos/admin-schema` to annotate tables with display names, field labels, and UI hints:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { withMeta } from "@kairos/admin-schema";

export default defineSchema({
  contacts: defineTable(
    withMeta({
      firstName: v.string(),
      lastName: v.string(),
      email: v.string(),
      status: v.union(v.literal("active"), v.literal("inactive")),
    }, {
      displayName: "Contacts",
      fields: {
        firstName: { label: "First Name" },
        lastName: { label: "Last Name" },
        email: { label: "Email", fieldType: "email" },
        status: { label: "Status", fieldType: "singleSelect" },
      },
    })
  ),
});
```

### Configure Programs

Edit `apps/back-office/src/lib/store.ts` to define the programs (organizational units) that appear in the sidebar. Each program maps to a set of tables.

### Set Admin Access

Edit `backend/convex/config.ts` to define which email addresses have admin access to the back-office. This controls who can sign in and what data they can see.

### Add Custom Detail Views

Edit `apps/back-office/src/lib/admin-config.tsx` to register custom detail views for specific tables. Detail views appear when a user clicks into a record and can show related data, computed fields, or custom layouts.

### Add Form Routes

Add new routes to `apps/forms/src/routes/` following TanStack Router's file-based routing conventions. Each `.tsx` file in the routes directory becomes a URL path. See `apps/forms/src/routes/apply.tsx` for an example.

### Customize Theming

Edit `apps/back-office/src/index.css` to override CSS custom properties. The back-office uses OKLCH color tokens and supports both light and dark modes. The primary palette defaults to indigo/purple.

## Architecture

```
admin-template/
+-- backend/               Convex backend (deployed to Convex Cloud)
|   +-- convex/
|       +-- schema.ts      Table definitions with @kairos/admin-schema annotations
|       +-- config.ts      Admin access list and app configuration
|       +-- admin.ts       Auto-generated CRUD handlers from schema
+-- apps/
|   +-- back-office/       Admin UI (port 3003)
|   |   +-- src/
|   |       +-- lib/       Store, config, utilities
|   |       +-- components/ Grid, record detail, views
|   +-- forms/             Public forms (port 3002)
|       +-- src/
|           +-- routes/    File-based routes (TanStack Router)
```

All three apps connect to the same Convex deployment. The back-office reads schema annotations at runtime to render grids, forms, and detail views automatically. The forms app uses standard Convex mutations to write data that immediately appears in the back-office via real-time subscriptions.

## Packages Used

This template depends on the following packages from the Kairos ecosystem:

- **[@kairos/admin-schema](https://jsr.io/@kairos/admin-schema)** -- Schema annotation helpers, table registry, and handler factories. Provides `withMeta()` for annotating Convex table definitions and auto-generating CRUD operations.

- **[@kairos/admin-ui](https://jsr.io/@kairos/admin-ui)** -- React components for the admin back-office: data grid, record detail views, filter bar, views panel, and more. Built on ag-grid and designed for dense data management.

- **[@kairos/ui](https://jsr.io/@kairos/ui)** -- Base component library with buttons, dialogs, sheets, sidebars, and other foundational UI primitives. Built on Base UI for accessibility.

## Available Scripts

| Command                  | Description                          |
| ------------------------ | ------------------------------------ |
| `bun run dev`            | Start all services via Turborepo     |
| `bun run dev:backoffice` | Back-office + Convex backend only    |
| `bun run dev:forms`      | Forms app + Convex backend only      |
| `bun run build`          | Build all packages                   |
| `bun run check-types`    | TypeScript type-check all packages   |

## License

This project is licensed under the [Mozilla Public License 2.0](./LICENSE).

Copyright 2024-2025 Kairos Project.
