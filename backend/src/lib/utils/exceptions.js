NotFoundException.prototype = Object.create(Error.prototype);
NotFoundException.prototype.constructor = NotFoundException;
NotFoundException.prototype.name = 'NotFoundException';
NotFoundException.prototype.message = 'Resource not found';
NotFoundException.prototype.status = 404;

function NotFoundException(message) {
    this.message = message || NotFoundException.prototype.message;
    this.status = NotFoundException.prototype.status;
}

UnauthorizedException.prototype = Object.create(Error.prototype);
UnauthorizedException.prototype.constructor = UnauthorizedException;
UnauthorizedException.prototype.name = 'UnauthorizedException';
UnauthorizedException.prototype.message = 'Unauthorized';
UnauthorizedException.prototype.status = 401;

function UnauthorizedException(message) {
    this.message = message || UnauthorizedException.prototype.message;
    this.status = UnauthorizedException.prototype.status;
}

ForbiddenException.prototype = Object.create(Error.prototype);
ForbiddenException.prototype.constructor = ForbiddenException;
ForbiddenException.prototype.name = 'ForbiddenException';
ForbiddenException.prototype.message = 'Forbidden';
ForbiddenException.prototype.status = 403;

function ForbiddenException(message) {
    this.message = message || ForbiddenException.prototype.message;
    this.status = ForbiddenException.prototype.status;
}

UnsupportedMediaTypeException.prototype = Object.create(Error.prototype);
UnsupportedMediaTypeException.prototype.constructor = UnsupportedMediaTypeException;
UnsupportedMediaTypeException.prototype.name = 'UnsupportedMediaTypeException';
UnsupportedMediaTypeException.prototype.message = 'Unsupported Media Type';
UnsupportedMediaTypeException.prototype.status = 415;

function UnsupportedMediaTypeException(message) {
    this.message = message || UnsupportedMediaTypeException.prototype.message;
    this.status = UnsupportedMediaTypeException.prototype.status;
}

BadRequestException.prototype = Object.create(Error.prototype);
BadRequestException.prototype.constructor = BadRequestException;
BadRequestException.prototype.name = 'BadRequestException';
BadRequestException.prototype.message = 'Bad Request';
BadRequestException.prototype.status = 400;

function BadRequestException(message) {
    this.message = message || BadRequestException.prototype.message;
    this.status = BadRequestException.prototype.status;
}


ServiceUnavailableException.prototype = Object.create(Error.prototype);
ServiceUnavailableException.prototype.constructor = ServiceUnavailableException;
ServiceUnavailableException.prototype.name = 'ServiceUnavailableException';
ServiceUnavailableException.prototype.message = 'Service Unavailable';
ServiceUnavailableException.prototype.status = 503;

function ServiceUnavailableException(message) {
    this.message = message || ServiceUnavailableException.prototype.message;
    this.status = ServiceUnavailableException.prototype.status;
}



module.exports = {
    NotFoundException,
    UnauthorizedException,
    ForbiddenException,
    UnsupportedMediaTypeException,
    BadRequestException,
    ServiceUnavailableException
};