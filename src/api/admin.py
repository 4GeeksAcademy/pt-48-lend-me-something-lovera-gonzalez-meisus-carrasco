import os
from flask_admin import Admin


from .models import db
from api.Models.user_model import User

from api.Models.subscription_model import Subscription
from api.Models.value_model import Value
from api.Models.index_model import Index
from api.Models.market_model import Market
from api.Models.portfolio_model import Portfolio
from api.Models.portfolio_list_model import PortfolioList
from api.Models.forex_model import Forex
from api.Models.crypto_model import Crypto
from api.Models.commodities_model import Commodity
from flask_admin.contrib.sqla import ModelView
from api.Models.user_model import User


def setup_admin(app):
    app.secret_key = os.environ.get("FLASK_APP_KEY", "sample key")
    app.config["FLASK_ADMIN_SWATCH"] = "cerulean"
    admin = Admin(app, name="4Geeks Admin", template_mode="bootstrap3")

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Value, db.session))
    admin.add_view(ModelView(Index, db.session))
    admin.add_view(ModelView(Market, db.session))
    admin.add_view(ModelView(Subscription, db.session))
    admin.add_view(ModelView(Portfolio, db.session))
    admin.add_view(ModelView(PortfolioList, db.session))
    admin.add_view(ModelView(Forex, db.session))
    admin.add_view(ModelView(Crypto, db.session))
    admin.add_view(ModelView(Commodity, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
