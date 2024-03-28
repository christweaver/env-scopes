import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function CustomTable({
  rows,
  columns,
  clickRowHandler,
  isRowSelectable = true,
  isPaginationEnabled = true,
  showRowsPerPage = true,
  showRowCounter = true,
}) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        onRowClick={clickRowHandler}
        rows={rows}
        columns={columns}
        pagination={isPaginationEnabled}
        pageSize={showRowsPerPage ? 5 : rows.length}
        rowsPerPageOptions={showRowsPerPage ? [5, 10, 25] : []}
        checkboxSelection={isRowSelectable}
        disableSelectionOnClick={!isRowSelectable}
        hideFooterPagination={!isPaginationEnabled}
        hideFooterRowCount={!showRowCounter}
        hideFooter={!isPaginationEnabled && !showRowCounter}
      />
    </div>
  );
}
