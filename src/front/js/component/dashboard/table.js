import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useEffect, useMemo, useState, useContext, useCallback } from 'react';
import { Context } from '../../store/appContext'
import { read, utils, writeFile } from "xlsx";
import { GreenContainer } from '../color_containers/green_container';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { element, object } from 'prop-types';

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
        {
            "adj_close": 193.58,
            "adj_high": 194.66,
            "adj_low": 193.17,
            "adj_open": 194.14,
            "adj_volume": 34049898.0,
            "close": 193.58,
            "date": "2023-12-28T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 194.66,
            "low": 193.17,
            "open": 194.14,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 34049900.0
        },
        {
            "adj_close": 193.15,
            "adj_high": 193.5,
            "adj_low": 191.09,
            "adj_open": 192.49,
            "adj_volume": 47899806.0,
            "close": 193.15,
            "date": "2023-12-27T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 193.5,
            "low": 191.09,
            "open": 192.49,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 48087700.0
        },
        {
            "adj_close": 193.05,
            "adj_high": 193.89,
            "adj_low": 192.83,
            "adj_open": 193.61,
            "adj_volume": 28919310.0,
            "close": 193.05,
            "date": "2023-12-26T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 193.89,
            "low": 192.83,
            "open": 193.61,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 28919300.0
        },
        {
            "adj_close": 193.6,
            "adj_high": 195.41,
            "adj_low": 192.97,
            "adj_open": 195.18,
            "adj_volume": 37149570.0,
            "close": 193.6,
            "date": "2023-12-22T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 195.41,
            "low": 192.97,
            "open": 195.18,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 37122800.0
        },
        {
            "adj_close": 194.68,
            "adj_high": 197.08,
            "adj_low": 193.5,
            "adj_open": 196.1,
            "adj_volume": 46482549.0,
            "close": 194.68,
            "date": "2023-12-21T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 197.08,
            "low": 193.5,
            "open": 196.1,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 46482500.0
        },
        {
            "adj_close": 194.83,
            "adj_high": 197.68,
            "adj_low": 194.83,
            "adj_open": 196.9,
            "adj_volume": 52242815.0,
            "close": 194.83,
            "date": "2023-12-20T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 197.68,
            "low": 194.83,
            "open": 196.9,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 52242800.0
        },
        {
            "adj_close": 196.94,
            "adj_high": 196.95,
            "adj_low": 195.89,
            "adj_open": 196.16,
            "adj_volume": 40233138.0,
            "close": 196.94,
            "date": "2023-12-19T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 196.95,
            "low": 195.89,
            "open": 196.16,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 40714100.0
        },
        {
            "adj_close": 195.89,
            "adj_high": 196.63,
            "adj_low": 194.39,
            "adj_open": 196.09,
            "adj_volume": 55751861.0,
            "close": 195.89,
            "date": "2023-12-18T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 196.63,
            "low": 194.39,
            "open": 196.09,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 55751900.0
        },
        {
            "adj_close": 197.57,
            "adj_high": 198.3999,
            "adj_low": 197.0,
            "adj_open": 197.53,
            "adj_volume": 128538401.0,
            "close": 197.57,
            "date": "2023-12-15T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 198.4,
            "low": 197.0,
            "open": 197.53,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 128256700.0
        },
        {
            "adj_close": 198.11,
            "adj_high": 199.62,
            "adj_low": 196.16,
            "adj_open": 198.02,
            "adj_volume": 66831572.0,
            "close": 198.11,
            "date": "2023-12-14T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 199.62,
            "low": 196.16,
            "open": 198.02,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 66831600.0
        },
        {
            "adj_close": 197.96,
            "adj_high": 198.0,
            "adj_low": 194.85,
            "adj_open": 195.09,
            "adj_volume": 70404183.0,
            "close": 197.96,
            "date": "2023-12-13T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 198.0,
            "low": 194.85,
            "open": 195.09,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 70404200.0
        },
        {
            "adj_close": 194.71,
            "adj_high": 194.72,
            "adj_low": 191.721,
            "adj_open": 193.08,
            "adj_volume": 52696900.0,
            "close": 194.71,
            "date": "2023-12-12T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 194.72,
            "low": 191.72,
            "open": 193.08,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 52696900.0
        },
        {
            "adj_close": 193.18,
            "adj_high": 193.49,
            "adj_low": 191.42,
            "adj_open": 193.11,
            "adj_volume": 60943699.0,
            "close": 193.18,
            "date": "2023-12-11T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 193.49,
            "low": 191.42,
            "open": 193.11,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 60943700.0
        },
        {
            "adj_close": 195.71,
            "adj_high": 195.99,
            "adj_low": 193.67,
            "adj_open": 194.2,
            "adj_volume": 53406358.0,
            "close": 195.71,
            "date": "2023-12-08T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 195.99,
            "low": 193.67,
            "open": 194.2,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 53377300.0
        },
        {
            "adj_close": 194.27,
            "adj_high": 195.0,
            "adj_low": 193.59,
            "adj_open": 193.63,
            "adj_volume": 47477655.0,
            "close": 194.27,
            "date": "2023-12-07T00:00:00+0000",
            "dividend": 0.0,
            "exchange": "XNAS",
            "high": 195.0,
            "low": 193.59,
            "open": 193.63,
            "split_factor": 1.0,
            "symbol": "AAPL",
            "volume": 47477700.0
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
    const generatePdf = () => {
        const doc = new jsPDF('l');
        doc.text('Flow Finance Report', 125, 20)
        const columns = ['Symbol', 'Open', 'Close', 'Date', 'Exchange'];
        // const columns = Object.keys(stockData[0]);
        // const data = stockData.map(element => ([element.symbol, element.open, element.close, element.date, element.exchange, element.adj_volume]));
        const data = stockData.map((value, index) => (Object.keys(stockData.map(element => ({ 'symbol': element.symbol, 'open': element.open, 'close': element.close, 'date': element.date, 'exchange': element.exchange }))[index]).map(element => stockData[index][`${element}`])));
        // console.log(stockData.map(element => ({'symbol':element.symbol,'open':element.open,'close':element.close,'date':element.date,'exchange':element.exchange})))
        doc.autoTable({
            startY: 25,
            orientation: 'landscape',
            head: [columns],
            body: data,
            theme: 'grid',
            style: {
                overflow: 'ellipsize',
                cellWidth: 'wrap'
            }
        },
        )

        doc.save('stocks.pdf');
    }

    useEffect(() => {
        // console.log(props.data)
        if (props.data) setStockData(props.data)
        if (props.columns) setColStockDef(props.columns)
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3em' }}>
                <button className="green--button" onClick={exportFile} style={{ height: '2em' }}>Get xlsx</button>
                <button className="red--button" onClick={generatePdf} style={{ height: '2em' }} >Get PDF</button>
            </div>
        </GreenContainer>

    </>)

}