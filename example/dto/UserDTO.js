const {defineField, NOT_EMPTY, EMAIL} = require('bean-validator');

class UserDTO {
    constructor(name, email) {
        defineField(this, "name", name, [
            { type: NOT_EMPTY, message: "Name is required" }
        ]);
        defineField(this, "email", email, [
            { type: EMAIL, message: "Invalid email" }
        ]);
    }
}

module.exports = {UserDTO};