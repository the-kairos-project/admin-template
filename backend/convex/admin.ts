/**
 * Generic admin API — Convex query/mutation endpoints for the back-office.
 *
 * Each export wraps a handler factory from @kairos/admin-schema with this
 * deployment's `query`/`mutation` and the project's table registry. The
 * handler factories contain all the business logic; this file is pure wiring.
 *
 * CUSTOMIZE: If you need custom admin endpoints (e.g., domain-specific reports),
 * add them below alongside these generic handlers.
 */

import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { registry } from "../lib/registry";
import { requireAdmin } from "./config";

// Handler factories — each returns an `async (ctx, args) => result` function
import {
  createListTableHandler,
  createGetDocumentHandler,
  createPatchDocumentHandler,
  createCreateDocumentHandler,
  createDeleteDocumentHandler,
  createDuplicateDocumentHandler,
  createResolveRefsHandler,
  createResolveLookupValuesHandler,
  createResolveLinkedRecordsHandler,
  createBatchResolveLinkedRecordsHandler,
  createResolveStorageUrlsHandler,
  createListViewsHandler,
  createSaveViewHandler,
  createDeleteViewHandler,
  createGetOrCreateDefaultViewHandler,
  createUpdateViewConfigHandler,
  createRenameViewHandler,
  createDuplicateViewHandler,
  createReassignViewHandler,
  createListCommentsHandler,
  createCreateCommentHandler,
  createUpdateCommentHandler,
  createDeleteCommentHandler,
  createGetCommentCountHandler,
  createListAdminUsersHandler,
} from "@kairos/admin-schema/handlers";

// Arg validators — Convex requires explicit `args` declarations
import {
  listTableArgs,
  getDocumentArgs,
  patchDocumentArgs,
  createDocumentArgs,
  deleteDocumentArgs,
  duplicateDocumentArgs,
  resolveRefsArgs,
  resolveLookupValuesArgs,
  resolveLinkedRecordsArgs,
  batchResolveLinkedRecordsArgs,
  resolveStorageUrlsArgs,
  listViewsArgs,
  saveViewArgs,
  deleteViewArgs,
  getOrCreateDefaultViewArgs,
  updateViewConfigArgs,
  renameViewArgs,
  duplicateViewArgs,
  reassignViewArgs,
  listCommentsArgs,
  createCommentArgs,
  updateCommentArgs,
  deleteCommentArgs,
  getCommentCountArgs,
  listAdminUsersArgs,
} from "@kairos/admin-schema/validators";

// =========================================================================
// Core CRUD
// =========================================================================

export const listTable = query({
  args: listTableArgs,
  returns: v.any(),
  handler: createListTableHandler(registry),
});

export const getDocument = query({
  args: getDocumentArgs,
  returns: v.any(),
  handler: createGetDocumentHandler(registry),
});

export const patchDocument = mutation({
  args: patchDocumentArgs,
  returns: v.any(),
  handler: createPatchDocumentHandler(registry),
});

export const createDocument = mutation({
  args: createDocumentArgs,
  returns: v.any(),
  handler: createCreateDocumentHandler(registry),
});

export const deleteDocument = mutation({
  args: deleteDocumentArgs,
  returns: v.null(),
  handler: createDeleteDocumentHandler(registry),
});

export const duplicateDocument = mutation({
  args: duplicateDocumentArgs,
  returns: v.any(),
  handler: createDuplicateDocumentHandler(registry),
});

// =========================================================================
// Reference resolution (id_ref display labels, lookup columns, linked records)
// =========================================================================

export const resolveRefs = query({
  args: resolveRefsArgs,
  returns: v.any(),
  handler: createResolveRefsHandler(registry),
});

export const resolveLookupValues = query({
  args: resolveLookupValuesArgs,
  returns: v.any(),
  handler: createResolveLookupValuesHandler(registry),
});

export const resolveLinkedRecords = query({
  args: resolveLinkedRecordsArgs,
  returns: v.any(),
  handler: createResolveLinkedRecordsHandler(registry),
});

export const batchResolveLinkedRecords = query({
  args: batchResolveLinkedRecordsArgs,
  returns: v.any(),
  handler: createBatchResolveLinkedRecordsHandler(registry),
});

export const resolveStorageUrls = query({
  args: resolveStorageUrlsArgs,
  returns: v.any(),
  handler: createResolveStorageUrlsHandler(registry),
});

// =========================================================================
// Saved views
// =========================================================================

export const listViews = query({
  args: listViewsArgs,
  returns: v.any(),
  handler: createListViewsHandler(registry),
});

export const getView = query({
  args: { viewId: v.id("admin_views") },
  returns: v.any(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.get(args.viewId);
  },
});

export const saveView = mutation({
  args: saveViewArgs,
  returns: v.any(),
  handler: createSaveViewHandler(registry),
});

export const deleteView = mutation({
  args: deleteViewArgs,
  returns: v.null(),
  handler: createDeleteViewHandler(registry),
});

export const getOrCreateDefaultView = mutation({
  args: getOrCreateDefaultViewArgs,
  returns: v.any(),
  handler: createGetOrCreateDefaultViewHandler(registry),
});

export const updateViewConfig = mutation({
  args: updateViewConfigArgs,
  returns: v.null(),
  handler: createUpdateViewConfigHandler(registry),
});

export const renameView = mutation({
  args: renameViewArgs,
  returns: v.null(),
  handler: createRenameViewHandler(registry),
});

export const duplicateView = mutation({
  args: duplicateViewArgs,
  returns: v.any(),
  handler: createDuplicateViewHandler(registry),
});

export const reassignView = mutation({
  args: reassignViewArgs,
  returns: v.null(),
  handler: createReassignViewHandler(registry),
});

// =========================================================================
// Comments
// =========================================================================

export const listComments = query({
  args: listCommentsArgs,
  returns: v.any(),
  handler: createListCommentsHandler(registry),
});

export const addComment = mutation({
  args: createCommentArgs,
  returns: v.any(),
  handler: createCreateCommentHandler(registry),
});

export const updateComment = mutation({
  args: updateCommentArgs,
  returns: v.null(),
  handler: createUpdateCommentHandler(registry),
});

export const deleteComment = mutation({
  args: deleteCommentArgs,
  returns: v.null(),
  handler: createDeleteCommentHandler(registry),
});

export const getCommentCount = query({
  args: getCommentCountArgs,
  returns: v.number(),
  handler: createGetCommentCountHandler(registry),
});

// =========================================================================
// Admin users (for mention autocomplete)
// =========================================================================

export const listAdminUsers = query({
  args: listAdminUsersArgs,
  returns: v.any(),
  handler: createListAdminUsersHandler(registry),
});
