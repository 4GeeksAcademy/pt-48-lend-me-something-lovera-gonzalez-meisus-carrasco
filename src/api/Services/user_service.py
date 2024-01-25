from api.Repositories.user_repository import UserRepository
from api.Repositories.subscription_repository import SubscriptionRepository
from api.Services.subscription_service import SubscriptionService
from api.Services.HTTP_Status import HTTP_Status
import re
class UserService:
    @staticmethod
    def get_list():
        raw_data = UserRepository.get_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def get_by_id(id):
        raw_data = UserRepository.get_by_id(id)
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        if serialized_data == [] : return {'message': 'No user found'}, HTTP_Status.BAD_REQUEST
        return serialized_data, HTTP_Status.OK
    
    @staticmethod
    def get_by_email(email):
        email_valid = re.match(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b', email)
        if not email_valid : return {'message': 'Invalid email format'}, HTTP_Status.OK
        raw_data = UserRepository.get_by_email(email)
        serialized_data = raw_data.serialize()
        if serialized_data == [] : return {'message': 'No user found'}, HTTP_Status.OK
        return serialized_data, HTTP_Status.OK
    
    @staticmethod
    def add(new_user_data):
        user_result = UserRepository.add(new_user_data)
        new_user = UserService.get_by_email(new_user_data['email'])
        print(new_user)
        new_user_id = new_user[0]['id']
        subscription_data = {**new_user_data, 'user_id': new_user_id}
        print(subscription_data)
        subscription_result = SubscriptionRepository.add(subscription_data)
        new_subscription = SubscriptionService.get_by_user_id(new_user_id)
        return {"new_user": new_user[0],"subscription_result": new_subscription[0]}, HTTP_Status.OK
    
    @staticmethod
    def update(user_data):
        result = UserRepository.update(user_data)
        return result, HTTP_Status.OK
    
    @staticmethod
    def delete(user_data):
        result = UserRepository.delete(user_data)
        return result, HTTP_Status.OK
