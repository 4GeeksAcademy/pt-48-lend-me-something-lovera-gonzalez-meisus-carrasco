from api.Repositories.user_repository import UserRepository
from api.Services.HTTP_Status import HTTP_Status

class UserService:
    @staticmethod
    def get_user():
        raw_data =  UserRepository.get_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data