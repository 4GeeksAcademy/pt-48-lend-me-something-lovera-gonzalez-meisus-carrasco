import random
from datetime import date
import requests

now = date.today()
with open(
    "src/api/test.txt",
    "a",
) as f:
    f.write("The date is {}\n".format(now))

symbols = "eurusd,gbpusd,usdjpy,audusd,gbpjpy,usdcad,eurjpy,usdchf,eurgbp,gbpaud,nzdusd,euraud,audjpy,cadjpy,gbpcad,eurcad,audcad,chfjpy,eurnzd,gbpnzd,eurchf,audchf,gbpchf,audnzd,cadchf,nzdjpy,nzdcad,nzdchf,usdzar,usdmxn,usdcnh,usdtry,usdsek,eursek,usdhkd,usdnok,eurnok,eurtry,mxnjpy,eurhuf,zarjpy,usdhuf,tryjpy"

headers = {"Content-Type": "application/json"}
forexResponse = requests.get(
    f"https://api.tiingo.com/tiingo/fx/top?tickers={symbols}&token=d29461d6a952547a6a6c50e5253276f740fe2fd8",
    headers=headers,
)

delete = requests.delete(
    "https://studious-space-sniffle-jjpp6wvv5wfj7q6-3001.app.github.dev/forex"
)

add = requests.post(
    "https://studious-space-sniffle-jjpp6wvv5wfj7q6-3001.app.github.dev/forex",
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


delete = requests.delete(
    "https://studious-space-sniffle-jjpp6wvv5wfj7q6-3001.app.github.dev/crypto"
)

add = requests.post(
    "https://studious-space-sniffle-jjpp6wvv5wfj7q6-3001.app.github.dev/crypto",
    data=cryptoResponse,
    headers={"Content-Type": 'application/json'},
)


# --------------------------------------------------------------------------------------


url = " https://api.iex.cloud/v1/data/core/energy/GASDESW,GASREGCOVW,GASMIDCOVW,GASPRMCOVW,DHOILNYH,DJFUELUSGULF,DHHNGSP,DCOILWTICO,DCOILBRENTEU,DPROPANEMBTX?token=pk_927a9adce7014932b03623915609933a"

payload = {}
headers = {"Accept": "application/json"}

commoditiesResponse = requests.request("GET", url)

print(commoditiesResponse.text)

delete = requests.delete(
    "https://studious-space-sniffle-jjpp6wvv5wfj7q6-3001.app.github.dev/commodity"
)

add = requests.post(
    "https://studious-space-sniffle-jjpp6wvv5wfj7q6-3001.app.github.dev/commodity",
    data=commoditiesResponse,
    headers={"Content-Type": 'application/json'},
)
