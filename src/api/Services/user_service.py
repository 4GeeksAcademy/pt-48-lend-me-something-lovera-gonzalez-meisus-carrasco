from api.Repositories.user_repository import UserRepository
from api.Services.HTTP_Status import HTTP_Status
class UserService:
    @staticmethod
    def get_list():
        raw_data = UserRepository.get_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK

    @staticmethod
    def add(user_data):
        result = UserRepository.add(user_data)
        return result, HTTP_Status.OK
    
    @staticmethod
    def update(user_data):
        result = UserRepository.update(user_data)
        return result, HTTP_Status.OK
