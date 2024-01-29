import { get_eod_data } from './API'
import { getUser, addUser, editUser, updateSubscription, getPortfolio, addToPortfolio, cancelSubscription } from './flowfinance_api'
import { get_all_data_commodities } from './commodities_api';
import { get_all_data_crypto } from './crypto_api';
import { get_all_data_forex } from './forex_api'

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			title: null,
			collapsableState: false,
			user: {
				subscription_level: ''
			},
			subscription_level: 'Free',
			searchState: false,
			subscription: {},
		},
		actions: {
			// Use getActions to call a function within a fuction
			switchSearchState: () => {
				const store = getStore();
				setStore({ ...store, searchState: !store.searchState });
				
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			setTitle: (title) => {
				const store = getStore();
				setStore({ ...store, title: title })
				
			},
			setUser: async (user) => {
				
				const actions = getActions();
				const store = getStore();
				setStore({ ...store, user: user })
				const userDB = await getUser(store.user.email)
				if (userDB.message) {
					const today = new Date()
					const nextMonth = new Date()
					const month = today.getMonth()
					nextMonth.setMonth(month < 11 ? month + 1 : 0)
					const newUserData = {
						"email": store.user.email,
						"created_at": today.toLocaleDateString(),
						"level": "FREE",
						"start_date": today.toLocaleDateString(),
						"end_date": nextMonth.toLocaleDateString(),
						"renew_date": nextMonth.toLocaleDateString(),
					}
					const newUser = await addUser(newUserData);
					actions.setUser(user)
					// console.log(store.user)
				}
				if (!userDB.message) {
					await setStore({ ...store, user: userDB });
					// console.log(store.user);
					actions.getUserPortfolio();
				}
			},
			setStreet: (street) => {
				const store = getStore();
				setStore({ ...store, user: { ...store.user, street: street } })
			},
			setCity: (city) => {
				const store = getStore();
				setStore({ ...store, user: { ...store.user, city: city } })
			},
			setCountry: (country) => {
				const store = getStore();
				setStore({ ...store, user: { ...store.user, country: country } })
			},
			editUser: () => {
				const store = getStore();
				const updatedUser = editUser(store.user)

			},
			setSubscription: (subscription) => {
				const store = getStore();
				setStore({ ...store, subscription: subscription })
			},
			switchVisible: () => {
				const store = getStore();
				setStore({ ...store, collapsableState: !store.collapsableState });
				// console.log(store.collapsableState)
			},
			storePriceId: (priceId) => {
				const store = getStore();
				setStore({ ...store, priceId: priceId })
			},
			setUserSubscriptionLevel: async (amount, user, subscription_stripe) => {
				const store = getStore();
				const actions = getActions();
				console.log('Seteando subscription');
				// console.log(JSON.parse(localStorage.getItem('subscription')).level)
				const today = new Date();
				const nextMonth = new Date();
				const month = today.getMonth();
				nextMonth.setMonth(month < 11 ? month + 1 : 0);
				await actions.setUser(user)
				const response = await updateSubscription(
					{
						...store.user,
						subscription_level: amount === 999 ? "BUSINESS" : "ESSENTIAL",
						start_date: today.toLocaleDateString(),
						end_date: nextMonth.toLocaleDateString(),
						renew_date: nextMonth.toLocaleDateString(),
						subscription_stripe: subscription_stripe
					}
				)
				actions.setUser(user)
				// console.log(response)
			},
			clearUser: () => {
				const store = getStore();
				setStore({ ...store, user: {} })
			},
			getUserPortfolio: async () => {
				const store = getStore();
				const data = await getPortfolio(store.user.portfolio_id);
				setStore({ ...store, userPortfolio: await data });
				// console.log(await store.userPortfolio);
			},
			addToUserPortfolio: async (item_symbol, item_type, item_name) => {
				const store = getStore();
				const actions = getActions();
				const portfolio_id = store.user.portfolio_id;
				const data = await addToPortfolio({
					'portfolio_id': portfolio_id,
					'item_type': item_type.toUpperCase(),
					'item_symbol': item_symbol,
					'item_name': item_name
				});
				actions.getUserPortfolio();
			},
			cancelSubscription: async () => {
				const store = getStore();
				const subscription_stripe = store.user.subscription_stripe
				const resp = await cancelSubscription({ subscription_stripe: subscription_stripe })
				return await resp

			},
			setForexDB: async () => {
				const store = getStore();
				const result = await get_all_data_forex();
				setStore({ ...store, forexDB: result });
				// console.log(store.forexDB)
			},
			setCryptoDB: async () => {
				const store = getStore();
				const result = await get_all_data_crypto();
				setStore({ ...store, cryptoDB: result });
				// console.log(store.cryptoDB)
			},
			setCommoditiesDB: async () => {
				const store = getStore();
				const result = await get_all_data_commodities();
				setStore({ ...store, commoditiesDB: await result });
				console.log(store.commoditiesDB)
			},
		}
	};
};

export default getState;
