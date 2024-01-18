import{get_eod_data} from './API'

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			title: null,
			stocks: null,
			user: null,
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
			setUser: (user) => {
				console.log(user);
				const store = getStore();
				setStore({ ...store, user: user })
				
			}
		}
	};
};

export default getState;
