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
	const [loading, setLoading] = useState(true);
	const [graphData, setGraphData] = useState()
	const { store, actions } = useContext(Context);
	const [tableData, setTableData] = useState([]);
	const [ticker, setTicker] = useState({});
	const [isOnUserPortfolio, setIsOnUserPortfolio] = useState()
	const params = useParams();
	let last_value, yesterday_value;
	let columns;
	const [tableColor, setTableColor] = useState('green');

	const loadTableData = async (symbol) => {
		const data = await get_eod_data(symbol)
		const ticker_info = await get_search_results(symbol, '', '')
		const data_for_tendency = data;
		const data_for_table = data;
		const data_for_graph = data;
		setGraphData(data_for_graph);
		[last_value, yesterday_value] = data_for_tendency.map(e => e.close);

		setTableData(data_for_table.map(
			element =>
			({
				Date: new Date(element.date).toLocaleDateString("es-es"),
				Symbol: element.symbol,
				Open: `$ ${element.open}`,
				Close: `$ ${element.close}`,
				Exchange: element.exchange,
				Volume: new Intl.NumberFormat("en-EN", { style: 'currency', currency: 'USD' }).format(element.adj_volume)
			})
		));
		setTicker(ticker_info.data[0]);
		columns = (Object.keys(data[0]).map(e => ({ 'field': e, 'flex': 1 })))
		if (yesterday_value > last_value) setTableColor('red');
		if (yesterday_value < last_value) setTableColor('green');
		store.userPortfolio?.filter(element => element.item_symbol === ticker_info.data[0].symbol).length > 0 ? setIsOnUserPortfolio(true) : setIsOnUserPortfolio(false)
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	};

	const addToPortfolio = (e) => {
		const ticker_data = JSON.parse(e.target.value)
		// console.log(ticker_data)
		actions.addToUserPortfolio(ticker_data.symbol, 'Stock', ticker_data.name);
	};

	const deleteFromPortfolio = (e) => {
		// console.log('Intended to be deleted in the future');
		setIsOnUserPortfolio(false)
	}



	useEffect(() => {
		if (params.symbol) {
			loadTableData(params.symbol);

		}

		return () => {
			setTableData([]);
			setLoading(true);

		}
	}, [params.symbol])

	return (<>
		{loading && <Spinner />}
		{!loading && <TopBarTitle topTitle={ticker.name} />}
		{!loading && <div className="d-flex flex-column gap-5 align-items-center justify-content-center navbar-margin">

			<BlueContainer style={{ position: 'relative', width: '70%' }}>
				{ticker.name && tableData && <>
					<div className='d-flex flex-row gap-2'>
						{isAuthenticated && !isOnUserPortfolio &&
							<button className="blue--button single-portfolio--button" value={JSON.stringify(ticker)} onClick={(e) => {addToPortfolio(e); setIsOnUserPortfolio(true)}} >Add to Portfolio</button>}
						{isAuthenticated && isOnUserPortfolio &&
							<button className="green--button single-portfolio--button-added" value={ticker.symbol} onClick={(e) => deleteFromPortfolio(e)} >
								<i style={{ fontSize: '2em' }} className="fa-regular fa-circle-check"></i>
							</button>}
						{!isAuthenticated && <button disabled className="single-portfolio--button--disabled" title='Login to add to porfolio'>Add to Portfolio</button>}
					</div>
					<h3>Symbol/Ticker: {ticker.symbol} </h3>
					<div className="d-flex flex-row gap-2">
						<div className="d-flex flex-row  justify-content-start align-items-center gap-2">
							<span style={{ fontSize: '1.7em' }}>Last Value: </span>
							<span style={tableColor === 'green' ? { fontSize: '1.7em', color: '#0d715d' } : { fontSize: '1.7em', color: '#992828' }}>{tableData[0].Close}</span>
							{tableColor === 'green' && <i className="fa-solid fa-angles-up" style={{ color: '#0d715d', fontSize: '1.5em', marginTop: '0.2em' }}></i>}
							{tableColor === 'red' && <i className="fa-solid fa-angles-down" style={{ color: '#992828', fontSize: '1.5em', marginTop: '0.2em' }}></i>}
						</div>
					</div>
					<h5>{ticker.stock_exchange.country} market</h5>
					<h6>{ticker.stock_exchange.name}</h6>
					<div className="d-flex flex-column gap-5 justify-content-between align-items-center p-4 " style={{ width: '100%' }}>
						{tableColor === 'green' && <GreenContainer>
							<Linear color={'#0d715d'} data={graphData} title={ticker.symbol} />
						</GreenContainer>}
						{tableColor === 'red' && <PinkContainer>
							<Linear color={'#992828'} data={graphData} title={ticker.symbol} />
						</PinkContainer>}

						{tableData.length > 1 && <Table data={tableData} columns={columns} />}
					</div></>}
			</BlueContainer>

		</div>}
	</>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
