import * as React from 'react';
import { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

export default function CustomTable({rows, columns, clickRowHandler}) {

  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
       onRowClick={clickRowHandler}
      
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        
      />
    </div>
  );
}

