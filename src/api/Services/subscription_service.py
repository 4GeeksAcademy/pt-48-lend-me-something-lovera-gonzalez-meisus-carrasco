from api.Repositories.subscription_repository import SubscriptionRepository
from api.Services.HTTP_Status import HTTP_Status
import re


class SubscriptionService:
    @staticmethod
    def get_list():
        raw_data = SubscriptionRepository.get_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def get_by_id(id):
        raw_data = SubscriptionRepository.get_by_id(id)
        serialized_data = raw_data.serialize()
        if serialized_data == []:
            return {"message": "No user found"}, HTTP_Status.OK
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def get_by_user_id(id):
        raw_data = SubscriptionRepository.get_by_user_id(id)
        serialized_data = raw_data.serialize()
        if serialized_data == []:
            return {"message": "No subscription found"}, HTTP_Status.OK
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def add(subscription_data):
        result = SubscriptionRepository.add(subscription_data)
        return result, HTTP_Status.OK

    @staticmethod
    def update(subscription_data):
        result = SubscriptionRepository.update(subscription_data)
        if result == None : return {'message': 'No subscription updated'}, HTTP_Status.OK
        else:  serialized_data = result.serialize()
        return serialized_data, HTTP_Status.OK
