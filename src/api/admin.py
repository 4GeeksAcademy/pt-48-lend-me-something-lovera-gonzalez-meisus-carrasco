import os
from flask_admin import Admin


from .models import db
from api.Models.user_model import User

from api.Models.subscription_model import Subscription
from api.Models.value_model import Value
from api.Models.index_model import Index

from api.Models.market_model import Market

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


    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
