from api.Repositories.user_repository import UserRepository
from enum import Enum


class HTTP_Status(Enum):
    OK = 200
    FORBIDDEN = 403
    NOT_FOUND = 404


class UserService:
    @staticmethod
    def get_user_list():
        raw_data = UserRepository.get_user_list()
        serialized_data = list(map(lambda element: element.serialize(), raw_data))
        return serialized_data, HTTP_Status.OK
