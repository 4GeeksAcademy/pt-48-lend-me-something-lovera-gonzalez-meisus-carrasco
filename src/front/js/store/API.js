const FF_API = process.env.BACKEND_URL
const API_KEY = "9883c939aa815f94accdfa4b810eac97";
const API_URL = "http://api.marketstack.com/v1";
const stock_url = 'https://marketstack.com/stock_api.php';

export const get_eod_data = async (symbol) => {
    // console.log(symbol)
    // const params = { access_key: API_KEY, symbols: symbol }
    // console.log(process.env.BACKEND_URL)
    const request = await fetch(`${FF_API}/api_proxy?url=${API_URL}/eod?access_key=${API_KEY}&symbols=${symbol}`);
    const data = await request.json();
    // console.log(request)
    const EndOfDay_data = await data.data;
    // console.log(EndOfDay_data)
    return EndOfDay_data
};

export const get_search_results = async (symbol,exchange,offset) => {
    // print(`${FF_API}/api_proxy?url=${stock_url}&symbols=${symbol}`)
    const request = await fetch(`${FF_API}/api_proxy/searchbar?url=${stock_url}&symbols=${symbol}&exchange=${exchange}&offset=${offset}`);
    const data = await request.json();
    const search_results = await data;
    // console.log(await search_results)
    return search_results
}


export const get_ticker_info = async (symbol) => {
    // print(`${FF_API}/api_proxy?url=${stock_url}&symbols=${symbol}`)
    const request = await fetch(`${FF_API}/api_proxy/ticker?url=${API_URL}&symbols=${symbol}`);
    const ticker_info = await request.json();
    // console.log(request)
    return ticker_info
}


