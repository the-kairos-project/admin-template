import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  ),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-600">Page not found</h1>
    </div>
  ),
});
