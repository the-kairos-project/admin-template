import type { AdminConfig } from "@kairos/admin-ui";
import { api } from "@template/convex";
import { TABLE_REGISTRY } from "@template/convex/table-registry";
import { useBackOfficeStore } from "./store";
import { Link } from "@tanstack/react-router";

// CUSTOMIZE: Add custom detail views for specific tables
const customDetailViews: Record<string, React.ComponentType<{ docId: string }>> = {
  // Example: contacts: ContactProfile,
};

// CUSTOMIZE: Tables to hide from navigation
const HIDDEN_TABLES = new Set(["admin_views", "admin_comments", "admin_notifications"]);

// CUSTOMIZE: Program display labels
const PROGRAM_LABELS: Record<string, string> = {
  main: "Main",
};

export function useAdminConfig(): AdminConfig {
  return {
    registry: TABLE_REGISTRY,
    api: {
      listTable: api.admin.listTable,
      getDocument: api.admin.getDocument,
      patchDocument: api.admin.patchDocument,
      createDocument: api.admin.createDocument,
      deleteDocument: api.admin.deleteDocument,
      duplicateDocument: api.admin.duplicateDocument,
      resolveRefs: api.admin.resolveRefs,
      resolveLookupValues: api.admin.resolveLookupValues,
      resolveLinkedRecords: api.admin.resolveLinkedRecords,
      resolveStorageUrls: api.admin.resolveStorageUrls,
      listViews: api.admin.listViews,
      getView: api.admin.getView,
      saveView: api.admin.saveView,
      updateViewConfig: api.admin.updateViewConfig,
      deleteView: api.admin.deleteView,
      listComments: api.admin.listComments,
      addComment: api.admin.addComment,
      deleteComment: api.admin.deleteComment,
      listAdminUsers: api.admin.listAdminUsers,
    },
    hiddenTables: HIDDEN_TABLES,
    customDetailViews,
    programLabels: PROGRAM_LABELS,
    renderTableLink: ({ tableName, children, className }) => (
      <Link to="/$table" params={{ table: tableName }} className={className}>
        {children}
      </Link>
    ),
    useStore: () => useBackOfficeStore(),
  };
}
