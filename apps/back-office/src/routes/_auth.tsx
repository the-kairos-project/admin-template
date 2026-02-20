import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "@template/convex";
import { isAdminEmail } from "@template/convex/config";
import { AdminProvider } from "@kairos/admin-ui/context";
import { TableTabBar } from "@kairos/admin-ui/navigation";
import { useAdminConfig } from "@/lib/admin-config";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  // CUSTOMIZE: Replace with your auth system
  const currentUser = useQuery(api.auth.getCurrentUser);

  if (currentUser === undefined) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!currentUser || !isAdminEmail(currentUser.email)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Access denied. You must be an admin to view this page.</p>
      </div>
    );
  }

  return <AuthenticatedLayout />;
}

function AuthenticatedLayout() {
  const adminConfig = useAdminConfig();

  return (
    <AdminProvider config={adminConfig}>
      <div className="flex h-screen flex-col">
        <TableTabBar />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </AdminProvider>
  );
}
