class ErrorResponseDTO {
    constructor(apiPath, errorCode, errorMessage) {
        this.apiPath = apiPath;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.errorTime = new Date().toISOString();
    }
}

module.exports = {ErrorResponseDTO};