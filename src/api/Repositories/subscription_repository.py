from api.Models.subscription_model import Subscription
from api.models import db


class SubscriptionRepository:
    @staticmethod
    def get_list():
        query = db.session.query(Subscription).all()
        return query

    @staticmethod
    def get_by_id(id):
        query = db.session.query(Subscription).filter(Subscription.id == id)
        return query

    @staticmethod
    def get_by_user_id(id):
        query = db.session.query(Subscription).filter(Subscription.user_id == id).first()
        return query

    @staticmethod
    def add(subscription_data):
        subscription_to_be_added = Subscription(
            level=subscription_data["level"],
            start_date=subscription_data["start_date"],
            end_date=subscription_data["end_date"],
            renew_date=subscription_data["renew_date"],
            user_id=subscription_data["user_id"],
        )
        db.session.add(subscription_to_be_added)
        db.session.commit()
        return True

    @staticmethod
    def update(subscription_data):
        user_to_be_updated = db.session.query(Subscription).filter(
            Subscription.id == subscription_data["subscription_id"]
        )
        if "subscription_level" in subscription_data:
            user_to_be_updated.update(
                {Subscription.level: subscription_data["subscription_level"]},
                synchronize_session=False,
            )
        if "start_date" in subscription_data:
            user_to_be_updated.update(
                {Subscription.start_date: subscription_data["start_date"]},
                synchronize_session=False,
            )
        if "end_date" in subscription_data:
            user_to_be_updated.update(
                {Subscription.end_date: subscription_data["end_date"]},
                synchronize_session=False,
            )
        if "renew_date" in subscription_data:
            user_to_be_updated.update(
                {Subscription.renew_date: subscription_data["renew_date"]},
                synchronize_session=False,
            )
        db.session.commit()
        query = db.session.query(Subscription).filter(Subscription.id == subscription_data["subscription_id"]).first()
        return query
