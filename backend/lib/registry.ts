/**
 * Table registry — the central metadata structure for the admin UI.
 *
 * createRegistry() walks the Convex schema validators and produces a fully
 * resolved registry with field types, display names, cross-table lookups,
 * and linked record definitions. The admin UI reads this registry to render
 * grids, forms, and relationship columns.
 *
 * CUSTOMIZE: Update the `programs` array if you add program-specific table
 * prefixes (e.g., "sales_", "hr_"). Tables without a matching prefix are
 * assigned to the sharedProgram.
 */

import { createRegistry } from "@kairos/admin-schema/registry";
import { adminTables } from "@kairos/admin-schema/tables";
import { tables } from "../convex/schema";
import { requireAdmin, ADMIN_EMAILS } from "../convex/config";

export const registry = createRegistry(
  { ...tables, ...adminTables },
  {
    // CUSTOMIZE: Define your program groupings here.
    // Tables are assigned to a program based on their name prefix.
    // Tables that don't match any prefix go to sharedProgram.
    programs: [
      { id: "main", label: "Main", prefix: "" },
    ],
    sharedProgram: "main",

    // Auth gate — handler factories call this before executing
    requireAdmin,

    // CUSTOMIZE: List all admin emails for comment notifications and @mention autocomplete.
    adminEmails: [...ADMIN_EMAILS],

    // CUSTOMIZE: Set this to the table name that stores your "people" records.
    // Used by the comments system to resolve author names from email addresses.
    // The table must have a `by_email` index and `firstName`/`lastName` fields.
    // Set to undefined if your contacts table uses a different field structure.
    peopleTable: "contacts",
  },
);

/** All tables with their field configurations. */
export const TABLE_REGISTRY = registry.tables;

/** Lookup table config by name. */
export const TABLE_MAP = registry.tableMap;
