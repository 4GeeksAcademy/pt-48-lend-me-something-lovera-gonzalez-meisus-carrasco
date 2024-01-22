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
import { useAuth0 } from "@auth0/auth0-react";
import { LogginButton } from "../component/Auth0/loggin_button.js";
import { Linear } from '../component/dashboard/linear_chart.js'


export const Single = props => {
	const { isAuthenticated, user, isLoading } = useAuth0()
	const [loading, setLoading] = useState(true)
	const { store, actions } = useContext(Context);
	const [tableData, setTableData] = useState([]);
	const [ticker, setTicker] = useState({})
	const params = useParams();
	let last_value, yesterday_value;
	const [tableColor, setTableColor] = useState('green')

	const loadTableData = async (symbol) => {
		



		const data = await get_eod_data(symbol)
		const ticker_info = await get_search_results(symbol, '', '')
		console.log(await ticker_info)
		setTableData(data);
		setTicker(ticker_info.data[0]);
		[last_value, yesterday_value] = data.map(e => e.close);
		console.log(last_value, yesterday_value);
		if (yesterday_value > last_value) setTableColor('red');
		setTimeout(() => {
			setLoading(false)
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
		{!loading && <TopBarTitle topTitle={ticker.name} />}
		{!loading && <div className="d-flex flex-column gap-5 align-items-center justify-content-center navbar-margin">

			<BlueContainer style={{ position: 'relative', width: '60%' }}>
				{ticker.name && <>
					<div className='d-flex flex-row gap-2'>
						{isAuthenticated && <button className="blue--button single-portfolio--button" >Add to Portfolio</button>}
						{!isAuthenticated && <LogginButton style={{ height: '3rem', width: '15rem !important', position: 'absolute', bottom: '2rem', right: '2rem', backgroundColor: '#0d715d' }} />}
						<h1 className="display-4">{ticker.name}</h1>
					</div>
					<div className="d-flex flex-row gap-2">
					<h3>Symbol/Ticker: {ticker.symbol} </h3>
					{tableColor === 'green' && <i className="fa-solid fa-angles-up" style={{color: '#0d715d'}}></i>}
					{tableColor === 'red' && <i className="fa-solid fa-angles-down" style={{color: '#992828'}}></i>}
					</div>
					<h5>{ticker.stock_exchange.country} market</h5>
					<h6>{ticker.stock_exchange.name}</h6>
				<div className="d-flex flex-column gap-5 justify-content-between align-items-center p-4 " style={{ width: '100%' }}>
					{tableColor === 'green' && <GreenContainer>
						<Linear color={'#0d715d'} data={tableData} title={ticker.symbol} />
					</GreenContainer>}
					{tableColor === 'red' && <PinkContainer>
						<Linear color={'#992828'} data={tableData}  title={ticker.symbol}/>
					</PinkContainer>}

					{tableData.length > 1 && <Table data={tableData} />}
				</div></>}
			</BlueContainer>

		</div>}
	</>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
