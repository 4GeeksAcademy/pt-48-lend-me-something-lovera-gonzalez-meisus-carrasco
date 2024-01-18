import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useMemo, useState, useContext, useCallback } from 'react';
import { Context } from '../../store/appContext'
import { read, utils, writeFile } from "xlsx";
import { GreenContainer } from '../color_containers/green_container';

export const Table = (props) => {

    const { store, actions } = useContext(Context);

    const [stockData, setStockData] = useState([
        {
            "adj_close": 185.92,
            "adj_high": 186.74,
            "adj_low": 185.19,
            "adj_open": 186.06,
            "adj_volume": 40477782.0,
            "close": 185.92,
            "date": "2024-01-12T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 186.74,
            "low": 185.19,
            "open": 186.06,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 40477782.0
        },
        {
            "adj_close": 185.59,
            "adj_high": 187.05,
            "adj_low": 183.62,
            "adj_open": 186.54,
            "adj_volume": 49128408.0,
            "close": 185.59,
            "date": "2024-01-11T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 187.05,
            "low": 183.62,
            "open": 186.54,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 49128400.0
        },
        {
            "adj_close": 186.19,
            "adj_high": 186.4,
            "adj_low": 183.92,
            "adj_open": 184.35,
            "adj_volume": 46792908.0,
            "close": 186.19,
            "date": "2024-01-10T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 186.4,
            "low": 183.92,
            "open": 184.35,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 46792900.0
        },
        {
            "adj_close": 185.14,
            "adj_high": 185.15,
            "adj_low": 182.73,
            "adj_open": 183.92,
            "adj_volume": 42841809.0,
            "close": 185.14,
            "date": "2024-01-09T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 185.15,
            "low": 182.73,
            "open": 183.92,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 42841800.0
        },
        {
            "adj_close": 185.56,
            "adj_high": 185.6,
            "adj_low": 181.5,
            "adj_open": 182.085,
            "adj_volume": 59144470.0,
            "close": 185.56,
            "date": "2024-01-08T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 185.6,
            "low": 181.5,
            "open": 182.09,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 59144500.0
        },
        {
            "adj_close": 181.18,
            "adj_high": 182.76,
            "adj_low": 180.17,
            "adj_open": 181.99,
            "adj_volume": 62196924.0,
            "close": 181.18,
            "date": "2024-01-05T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 182.76,
            "low": 180.17,
            "open": 181.99,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 62303300.0
        },
        {
            "adj_close": 181.91,
            "adj_high": 183.0872,
            "adj_low": 180.88,
            "adj_open": 182.15,
            "adj_volume": 71983570.0,
            "close": 181.91,
            "date": "2024-01-04T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 183.09,
            "low": 180.88,
            "open": 182.15,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 71983600.0
        },
        {
            "adj_close": 184.25,
            "adj_high": 185.88,
            "adj_low": 183.43,
            "adj_open": 184.22,
            "adj_volume": 58414460.0,
            "close": 184.25,
            "date": "2024-01-03T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 185.88,
            "low": 183.43,
            "open": 184.22,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 58414500.0
        },
        {
            "adj_close": 185.64,
            "adj_high": 188.44,
            "adj_low": 183.885,
            "adj_open": 187.15,
            "adj_volume": 82488674.0,
            "close": 185.64,
            "date": "2024-01-02T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 188.44,
            "low": 183.89,
            "open": 187.15,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 82488700.0
        },
        {
            "adj_close": 192.53,
            "adj_high": 194.4,
            "adj_low": 191.725,
            "adj_open": 193.9,
            "adj_volume": 42672148.0,
            "close": 192.53,
            "date": "2023-12-29T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 194.4,
            "low": 191.73,
            "open": 193.9,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 42628800.0
        },
    ]);



    const [colStockDef, setColStockDef] = useState([
        { field: 'date' },
        { field: 'symbol' },
        { field: 'open' },
        { field: 'close' },
        { field: 'exchange' },
        { field: 'adj_volume' },
    ]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
    }), [])

    const exportFile = () => {
        /* generate worksheet from state */
        const ws = utils.json_to_sheet(stockData);
        /* create workbook and append worksheet */
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        /* export to XLSX */
        writeFile(wb, "prueba1.xlsx");
    };

    useEffect(() => {
        // console.log(props.data)
        if (props.data) setStockData(props.data)
    }, [])

    return (<>
        <GreenContainer style={{ width: '80%', display: 'flex', flexDirection: 'row', gap: '2em' }}>
            <div className="ag-theme-quartz-dark" style={{ width: '80%', height: 500 }}>
                <AgGridReact
                    rowData={stockData}
                    columnDefs={colStockDef}
                    defaultColDef={defaultColDef}
                    rowSelection='multiple'
                    animateRows={true}
                    pagination={true}
                />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '3em'}}>
                <button className="green--button" onClick={exportFile} style={{ height: '2em' }}>Get xlsx</button>
                <button className="red--button" style={{ height: '2em' }}>Get PDF</button>
            </div>
        </GreenContainer>
    </>)

}