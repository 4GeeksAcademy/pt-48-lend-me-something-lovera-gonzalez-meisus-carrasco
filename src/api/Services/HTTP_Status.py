from enum import Enum


class HTTP_Status(Enum):
    OK = 200
    FORBIDDEN = 403
    NOT_FOUND = 404
    BAD_REQUEST = 400
