/**
 * Admin access control configuration.
 *
 * CUSTOMIZE: Add your admin team's email addresses to ADMIN_EMAILS.
 * The requireAdmin() function is used by all admin API endpoints to
 * verify the caller has access.
 */

// CUSTOMIZE: Add your admin emails here.
export const ADMIN_EMAILS = [
  "admin@example.com",
] as const;

export function isAdminEmail(email: string): boolean {
  return (ADMIN_EMAILS as readonly string[]).includes(email.toLowerCase());
}

/**
 * Verify the caller is an authenticated admin. Returns their email.
 *
 * This function is passed to createRegistry() as the `requireAdmin` gate.
 * All handler factories call it before executing any logic.
 *
 * CUSTOMIZE: Replace ctx.auth.getUserIdentity() with your auth provider's
 * method if you're not using BetterAuth/Convex's built-in auth.
 */
export async function requireAdmin(ctx: any): Promise<string> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity?.email) {
    throw new Error("Unauthorized: not authenticated");
  }
  const email = identity.email as string;
  if (!isAdminEmail(email)) {
    throw new Error("Unauthorized: admin access required");
  }
  return email;
}
