import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { GreenContainer } from '../component/color_containers/green_container'
import { Table } from "../component/dashboard/table";
import { BlueContainer } from "../component/color_containers/blue_container";
import { PurpleContainer } from "../component/color_containers/purple_container";
import { YellowContainer } from "../component/color_containers/yellow_container";
import { PinkContainer } from "../component/color_containers/pink_container";
import { get_eod_data, get_ticker_info, get_search_results } from '../store/API'
import Spinner from "../component/spinner";
import '../../styles/single.sass'
import { TopBarTitle } from "../component/topBarTitle.js";

export const Single = props => {
	const [loading, setLoading] = useState(true)
	const { store, actions } = useContext(Context);
	const [tableData, setTableData] = useState([]);
	const [ticker, setTicker] = useState({})
	const params = useParams();

	const loadTableData = async (symbol) => {
		const data = await get_eod_data(symbol)
		const ticker_info = await get_search_results(symbol,'','')
		console.log(await ticker_info)
		console.log(ticker_info.data[0])
		setTableData(data);
		setTicker(ticker_info.data[0]);
		setTimeout(() => {
			setLoading(false)
			console.log(ticker)
		}, 1000)

	}


	useEffect(() => {
		if (params.symbol) {
			loadTableData(params.symbol);
		}
		return () => {
			setTableData([])
		}
	}, [params.symbol])

	return (<>
		{loading && <Spinner />}
		{!loading && <TopBarTitle topTitle={ticker.symbol}/>}
		{!loading && <div className="d-flex flex-column gap-5 align-items-center justify-content-center navbar-margin">

			<BlueContainer style={{ position: 'relative', width: '60%' }}>
				{ticker.name && <>
					<div className='d-flex flex-row gap-2'>
						<button className="blue--button single-portfolio--button" >Add to Portfolio</button>
						<h1 className="display-4">{ticker.name}</h1>
					</div>
					<h3>Symbol/Ticker: {ticker.symbol} </h3>
					<h5>{ticker.stock_exchange.country} market</h5>
					<h6>{ticker.stock_exchange.name}</h6></>}
				<div className="d-flex flex-column gap-5 justify-content-between align-items-center p-4 " style={{ height: 700, width: '100%' }}>
					{tableData.length > 1 && <Table data={tableData} />}
				</div>
			</BlueContainer>

		</div>}
	</>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
