/**
 * Example schema for a projects-and-contacts back-office.
 *
 * Demonstrates how to annotate Convex table definitions with @kairos/admin-schema
 * metadata so the admin UI auto-derives field types, display labels, cross-table
 * lookups, and linked record columns.
 *
 * CUSTOMIZE: Replace these tables with your own domain tables.
 */

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  withMeta,
  vLongText,
  vEmail,
  vPhone,
  vUrl,
  vTimestamp,
  vISODate,
  vRating,
  vCurrency,
  vEnum,
  vOptional,
} from "@kairos/admin-schema";
import { adminTables } from "@kairos/admin-schema/tables";

// ---------------------------------------------------------------------------
// Enum value arrays (single source of truth for validators + display)
// ---------------------------------------------------------------------------

// CUSTOMIZE: Define your own status/category enums here.
export const PROJECT_STATUSES = [
  "planning",
  "active",
  "on_hold",
  "completed",
  "cancelled",
] as const;

export const TASK_STATUSES = [
  "todo",
  "in_progress",
  "in_review",
  "done",
  "blocked",
] as const;

export const TASK_PRIORITIES = [
  "low",
  "medium",
  "high",
  "critical",
] as const;

// ---------------------------------------------------------------------------
// Table definitions
// ---------------------------------------------------------------------------

/**
 * Exported so the registry can import and introspect the table definitions.
 * Spread adminTables alongside your own to include views, comments, and
 * notifications infrastructure.
 */
export const tables = {
  // -------------------------------------------------------------------------
  // Contacts — the "people" table for this org
  // -------------------------------------------------------------------------
  contacts: withMeta(
    defineTable({
      firstName: v.string(),
      lastName: v.string(),
      email: vEmail(),
      phone: vOptional(vPhone()),
      organization: v.optional(v.string()),
      website: vOptional(vUrl()),
      notes: vOptional(vLongText()),
    })
      .index("by_email", ["email"])
      .index("by_name", ["lastName", "firstName"]),
    {
      // Array primaryField — the registry joins these with a space for display labels
      primaryField: ["firstName", "lastName"],
      icon: "Users",
      category: "Core",
      description: "People and organizations you work with.",
      reviewConfig: {
        subtitleField: "organization",
        badgeField: undefined,
      },
      defaultFieldOrder: [
        "firstName",
        "lastName",
        "email",
        "organization",
        "phone",
        "website",
        "notes",
      ],
    },
  ),

  // -------------------------------------------------------------------------
  // Projects — the main work containers
  // -------------------------------------------------------------------------
  projects: withMeta(
    defineTable({
      title: v.string(),
      description: vOptional(vLongText()),
      status: vEnum(PROJECT_STATUSES),
      leadId: v.optional(v.id("contacts")),
      startDate: vOptional(vISODate()),
      budget: vOptional(vCurrency("USD")),
      createdAt: vTimestamp(),
    })
      .index("by_status", ["status"])
      .index("by_lead", ["leadId"]),
    {
      primaryField: "title",
      icon: "FolderKanban",
      category: "Core",
      description: "Projects your team is working on.",
      defaultSort: { field: "createdAt", direction: "desc" },
      reviewConfig: {
        subtitleField: "description",
        badgeField: "status",
      },
      // Follow the leadId ref to show the contact's name and email
      lookups: [
        { sourceField: "leadId", targetField: "firstName", label: "Lead" },
        { sourceField: "leadId", targetField: "email", label: "Lead Email" },
      ],
      // Show tasks linked to each project as chips
      linkedRecords: [
        {
          key: "tasks",
          label: "Tasks",
          target: "tasks",
          reverse: "projectId",
          displayField: "title",
        },
      ],
      defaultFieldOrder: [
        "title",
        "status",
        "leadId",
        "startDate",
        "budget",
        "description",
        "createdAt",
      ],
    },
  ),

  // -------------------------------------------------------------------------
  // Tasks — work items within projects
  // -------------------------------------------------------------------------
  tasks: withMeta(
    defineTable({
      title: v.string(),
      projectId: v.id("projects"),
      assigneeId: v.optional(v.id("contacts")),
      status: vEnum(TASK_STATUSES),
      priority: vEnum(TASK_PRIORITIES),
      dueDate: vOptional(vISODate()),
      effort: vOptional(vRating(5)),
      notes: vOptional(vLongText()),
      createdAt: vTimestamp(),
    })
      .index("by_project", ["projectId"])
      .index("by_assignee", ["assigneeId"])
      .index("by_status", ["status"]),
    {
      primaryField: "title",
      icon: "CheckSquare",
      category: "Core",
      description: "Individual tasks within projects.",
      defaultSort: { field: "createdAt", direction: "desc" },
      reviewConfig: {
        subtitleField: "notes",
        badgeField: "status",
      },
      lookups: [
        { sourceField: "projectId", targetField: "title", label: "Project" },
        { sourceField: "assigneeId", targetField: "firstName", label: "Assignee" },
      ],
      defaultFieldOrder: [
        "title",
        "projectId",
        "status",
        "priority",
        "assigneeId",
        "dueDate",
        "effort",
        "notes",
        "createdAt",
      ],
    },
  ),
};

// ---------------------------------------------------------------------------
// Schema export (includes admin infrastructure tables)
// ---------------------------------------------------------------------------

export default defineSchema({
  ...tables,
  // CUSTOMIZE: Spread additional program tables here if you add more.
  ...adminTables,
});
