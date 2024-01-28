import random
from datetime import date
import requests

now = date.today()
with open(
    "src/api/test.txt",
    "a",
) as f:
    f.write("The date is {}\n".format(now))



