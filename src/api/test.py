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
requestResponse = requests.get(
    f"https://api.tiingo.com/tiingo/fx/top?tickers={symbols}&token=d29461d6a952547a6a6c50e5253276f740fe2fd8",
    headers=headers,
)
print(requestResponse.json())

delete = requests.delete(
    "https://studious-space-sniffle-jjpp6wvv5wfj7q6-3001.app.github.dev/forex"
)

print(delete)
add = requests.post(
    "https://studious-space-sniffle-jjpp6wvv5wfj7q6-3001.app.github.dev/forex",
    data=requestResponse,
    headers=headers,
)


print(add)
