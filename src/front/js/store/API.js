const FF_API = process.env.BACKEND_URL
const API_KEY = "9883c939aa815f94accdfa4b810eac97";
const API_URL = "http://api.marketstack.com/v1";

const get_data = async (symbol) => {
    // console.log(symbol)
    // const params = { access_key: API_KEY, symbols: symbol }
    // console.log(process.env.BACKEND_URL)
    const request = await fetch(`${FF_API}/api_proxy?url=${API_URL}/eod?access_key=${API_KEY}&symbols=${symbol}`);
    const data = await request.json();
    // console.log(request)
    const STOCK_DATA = await data.data;
    return STOCK_DATA
};

export default get_data
