/**
 * BetterAuth configuration for Convex.
 *
 * This file is loaded by Convex to configure JWT-based authentication.
 * The CONVEX_SITE_URL environment variable is set automatically in Convex
 * deployments; it points to your Convex HTTP Actions endpoint.
 *
 * CUSTOMIZE: If you use a different auth provider, replace this config.
 */

const siteUrl = (globalThis as any).process?.env?.CONVEX_SITE_URL ?? "";

export default {
  providers: [
    {
      type: "customJwt" as const,
      issuer: siteUrl,
      applicationID: "convex",
      algorithm: "RS256" as const,
      jwks: `${siteUrl}/api/auth/convex/jwks`,
    },
  ],
};
