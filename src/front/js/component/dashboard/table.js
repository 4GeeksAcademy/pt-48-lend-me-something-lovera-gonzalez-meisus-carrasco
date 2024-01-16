import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useMemo, useState } from 'react';

export const Table = () => {
    
    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([
        { field: "mission"},
        { field: "company"},
        { field: "location"},
        { field: "date" },
        { field: "price",
        valueFormatter: params => { return '$' + params.value.toLocaleString();}
    }
    ]);
    const defaultColDef = useMemo (() => ({
        sortable: true,
        filter: true,
    }), [])

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/space-mission-data.json') 
          .then(result => result.json()) // 
          .then(rowData => setRowData(rowData)) 
    },[])


    return (<>
        <div className="ag-theme-quartz-dark" style={{ width: 1000, height: 500 }}>
        <AgGridReact 
        rowData={rowData} 
        columnDefs={colDefs} 
        defaultColDef={defaultColDef}
        rowSelection='multiple'
        animateRows= {true}
        pagination={true}
        sideBar={'columns'}
        />
        </div>
    </>)

}