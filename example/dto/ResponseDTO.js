class ResponseDTO {
    constructor(message, data) {
        this.message = message;
        this.status = true;
        this.data = data;
    }
}

module.exports = {ResponseDTO};