import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { get_search_results } from '../store/API'

import { Context } from "../store/appContext";

const listas = [
	{
		"title": "Home",
		"link": "/",
	},
	{
		"title": "Dashboard",
		"link": "/dashboard",
	},
	{
		"title": "About Us",
		"link": "/aboutus",
	},
	{
		"title": "Profile",
		"link": "/login",
	},
	{
		"title": "Subscription",
		"link": "/subscription",
	},
	{
		"title": "Notifications",
		"link": "/notifications",
	},
]

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [valorStock, setValorStock] = useState('');
	const [result, setResult] = useState([...listas]);


	const getStockData = async (string) => {
		console.log(string)
		const data = await get_search_results(string);
		const data_with_links = data.map(element => ({...element, link: `/single/${element.symbol}`}))
		const newFilterData = listas.filter(elemento => {
			return elemento.title.toLowerCase().includes(string.toLowerCase())
		})
		setResult([...newFilterData, ...data_with_links])
	};
	const buscando = async (e) => {
		setValorStock(e.target.value)
		await getStockData(e.target.value)
		console.log(valorStock)
	}

	useEffect(() => { }, [])

	return (
		<div className="container navbar-margin">
			<label>Input search value:</label>
			<input type="text" value={valorStock} onChange={(e) => buscando(e)} />
			<ul className="list-group">
				{result && result.map((e, index) => (
					<li key={index}>
						{e.title ? e.title : (
							<div className="d-flex justify-content-between" style={{ width: '20em' }}>
								<span>
									{e.name}
								</span>
								<span>
									{e.link}
								</span>
							</div>
						)}
					</li>
				))}
			</ul>
			<br />

		</div>
	);
};
