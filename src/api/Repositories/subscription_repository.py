from api.Models.subscription_model import Subscription
from api.engine import session


class SubscriptionRepository:
    @staticmethod
    def get_list():
        query = session.query(Subscription).all()
        return query

    @staticmethod
    def get_by_id(id):
        query = session.query(Subscription).filter(Subscription.id == id)
        return query

    @staticmethod
    def get_by_user_id(id):
        query = session.query(Subscription).filter(Subscription.user_id == id).first()
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
        session.add(subscription_to_be_added)
        session.commit()
        return True

    @staticmethod
    def update(subscription_data):
        user_to_be_updated = session.query(Subscription).filter(
            Subscription.id == subscription_data["id"]
        )
        if "level" in subscription_data:
            user_to_be_updated.update(
                {Subscription.level: subscription_data["level"]},
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
        session.commit()
        return True
