import axios from "axios"

API_KEY = 'D2CAF66A-587F-4540-8BD7-3B4471CACAA6'

export const get_coin = () => {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://rest.coinapi.io/v1/assets',
        headers: {
            'Accept': 'text/plain',
            'X-CoinAPI-Key': API_KEY
        }
    };

    axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return JSON.stringify(response)
        })
        .catch((error) => {
            console.log(error);
        });

}

