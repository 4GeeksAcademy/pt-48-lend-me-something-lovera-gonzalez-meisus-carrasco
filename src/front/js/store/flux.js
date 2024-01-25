import { get_eod_data } from './API'
import { getUser, addUser, editUser } from './flowfinance_api'


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			title: null,
			stocks: null,
			collapsableState: false,
			user: {
				subscription_level: 'Free'
			},
			subscription_level: 'Free',
			searchState: false,
			subscription: {},
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
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

			// getMessage: async () => {
			// 	try {
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	} catch (error) {
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			setTitle: (title) => {
				const store = getStore();
				setStore({ ...store, title: title })
			},
			// loadSomeData: async (symbol) => {
			// 	if (symbol === undefined) symbol = 'AAPL';
			// 	console.log(symbol);
			// 	const store = getStore();
			// 	const data = await get_eod_data(symbol);
			// 	setStore({ ...store, stocks: data });
			// },
			setUser: async (user) => {
				// console.log(user);
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
					const newUser = await addUser(newUserData)
					setStore({ ...store, user: newUser })
					console.log(store.user)
				}
				if (!userDB.message) {
					setStore({ ...store, user: userDB })
					console.log(store.user)
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
			setUserSubscriptionLevel: () => {
				const store = getStore();
				// console.log('Seteando subscription')
				const new_level = JSON.parse(localStorage.getItem('subscription')).level
				// console.log(JSON.parse(localStorage.getItem('subscription')).level)
				setStore({ ...store, subscription_level: new_level })
			},
			clearUser: () => {
				const store = getStore();
				setStore({ ...store, user: {} })
			}
		}
	};
};

export default getState;
