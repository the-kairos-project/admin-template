/**
 * Package entry point — re-exports the Convex API surface.
 *
 * Apps import from this package to call Convex functions:
 *   import { api } from "@template/convex";
 *   import type { Id, Doc } from "@template/convex";
 */

export { api } from "./convex/_generated/api";
export type { Id, Doc } from "./convex/_generated/dataModel";
