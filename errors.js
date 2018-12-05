function ValidationError(message) {
    this.name = 'ValidationError';
    this.message = message;
}

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

module.exports = {ValidationError};