import random
from datetime import date

now = date.today()
with open(
    "/workspaces/pt-48-lend-me-something-lovera-gonzalez-meisus-carrasco/src/api/test.txt",
    "a",
) as f:
    f.write("The date is {}\n".format(now))
