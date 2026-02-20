import { createAdminStore } from "@kairos/admin-ui/lib";

// CUSTOMIZE: Update programs to match your organization
export const useBackOfficeStore = createAdminStore({
  programs: [
    { id: "main", label: "Main", prefix: "" },
  ],
  defaultProgram: "main",
  storageKey: "admin-back-office-state",
});
