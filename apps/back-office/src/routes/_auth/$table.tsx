import { createFileRoute } from "@tanstack/react-router";
import { usePaginatedQuery, useMutation } from "convex/react";
import { useMemo, useState } from "react";
import { TABLE_MAP } from "@template/convex/table-registry";
import { DataGrid } from "@kairos/admin-ui/grid";
import { Toolbar } from "@kairos/admin-ui/grid";
import { useAdmin } from "@kairos/admin-ui/context";
import { applyFilters } from "@kairos/admin-ui/lib";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth/$table")({
  component: TableView,
});

function TableView() {
  const { table } = Route.useParams();
  const tableConfig = TABLE_MAP.get(table);
  const { config } = useAdmin();

  // Data fetching
  const { results, status, loadMore } = usePaginatedQuery(
    config.api.listTable,
    { tableName: table },
    { initialNumItems: 100 },
  );

  // Mutations
  const patchDocument = useMutation(config.api.patchDocument);
  const createDocument = useMutation(config.api.createDocument);

  // Filter state
  const [filterState, setFilterState] = useState({ conjunction: "and" as const, conditions: [] });

  // Apply client-side filters
  const filteredData = useMemo(() => {
    if (!tableConfig) return results;
    return applyFilters(results, filterState, tableConfig.fields);
  }, [results, filterState, tableConfig]);

  if (!tableConfig) {
    return <div className="p-8">Table "{table}" not found.</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <Toolbar
        tableConfig={tableConfig}
        tableName={table}
        filterState={filterState}
        onFilterChange={setFilterState}
        sortState={{ sorts: [] }}
        onSortChange={() => {}}
        totalCount={filteredData.length}
        displayMode="grid"
        onDisplayModeChange={() => {}}
        onCreateRecord={async () => {
          await createDocument({ tableName: table, fields: {} });
          toast.success("Record created");
        }}
      />
      <div className="flex-1">
        <DataGrid
          data={filteredData}
          tableConfig={tableConfig}
          tableName={table}
          onCellValueChanged={async (id, field, value) => {
            await patchDocument({ id, tableName: table, fields: { [field]: value } });
          }}
          onLoadMore={() => {
            if (status === "CanLoadMore") loadMore(100);
          }}
        />
      </div>
    </div>
  );
}
