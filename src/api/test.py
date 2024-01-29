import requests
from datetime import datetime


symbols = "eurusd,gbpusd,usdjpy,audusd,gbpjpy,usdcad,eurjpy,usdchf,eurgbp,gbpaud,nzdusd,euraud,audjpy,cadjpy,gbpcad,eurcad,audcad,chfjpy,eurnzd,gbpnzd,eurchf,audchf,gbpchf,audnzd,cadchf,nzdjpy,nzdcad,nzdchf,usdzar,usdmxn,usdcnh,usdtry,usdsek,eursek,usdhkd,usdnok,eurnok,eurtry,mxnjpy,eurhuf,zarjpy,usdhuf,tryjpy"

headers = {"Content-Type": "application/json"}
forexResponse = requests.get(
    f"https://api.tiingo.com/tiingo/fx/top?tickers={symbols}&token=d29461d6a952547a6a6c50e5253276f740fe2fd8",
    headers=headers,
)

delete = requests.delete("https://sample-service-name-q610.onrender.com/forex")

add = requests.post(
    "https://sample-service-name-q610.onrender.com/forex",
    data=forexResponse,
    headers=headers,
)
# --------------------------------------------------------------------------------------

url = "https://rest.coinapi.io/v1/assets"

payload = {}
headers = {
    "Accept": "application/json",
    "X-CoinAPI-Key": "D2CAF66A-587F-4540-8BD7-3B4471CACAA6",
}

cryptoResponse = requests.request("GET", url, headers=headers, data=payload)

filtered = list(filter(lambda e: e["type_is_crypto"] != 0, cryptoResponse.json()))

delete = requests.delete("https://sample-service-name-q610.onrender.com/crypto")

add = requests.post(
    "https://sample-service-name-q610.onrender.com/crypto",
    json=filtered,
)


# --------------------------------------------------------------------------------------


url = " https://api.iex.cloud/v1/data/core/energy/GASDESW,GASREGCOVW,GASMIDCOVW,GASPRMCOVW,DHOILNYH,DJFUELUSGULF,DHHNGSP,DCOILWTICO,DCOILBRENTEU,DPROPANEMBTX?token=pk_927a9adce7014932b03623915609933a"

payload = {}
headers = {"Accept": "application/json"}

commoditiesResponse = requests.request("GET", url)

delete = requests.delete("https://sample-service-name-q610.onrender.com/commodity")

add = requests.post(
    "https://sample-service-name-q610.onrender.com/commodity",
    data=commoditiesResponse,
    headers={"Content-Type": "application/json"},
)


# --------------------------------------------------------------------------------------

log_url = "https://sample-service-name-q610.onrender.com/log"
date = datetime.utcnow()

result = requests.post(
    log_url, json={"date": str(date)}, headers={"Content-Type": "application/json"}
)
print(result.json())
