const { addRule } = require("../core/registry");

/**
 * Defines a field on an object (typically a DTO) and registers its validation rules.
 *
 * This function is intended to be called inside a DTO class constructor to:
 * 1. Register validation rules for the specified field.
 * 2. Assign the initial value to the field.
 *
 * @param {Object} obj - The object instance (usually `this` in a DTO constructor).
 * @param {string} fieldName - The name of the field to define.
 * @param {*} initialValue - The initial value to set for the field.
 * @param {Array<Object>} rules - An array of validation rule objects.
 *        Each rule object can have:
 *        - {string} type: Validation type (e.g., "notEmpty", "email").
 *        - {string} message: Error message when validation fails.
 *        - {Object} [params]: Optional parameters for the validator.
 *
 * @example
 * const { defineField } = require("validator");
 * const { NOT_EMPTY, EMAIL } = require("validator");
 *
 * class UserDTO {
 *   constructor(name, email) {
 *     defineField(this, "name", name, [
 *       { type: NOT_EMPTY, message: "Name is required" }
 *     ]);
 *     defineField(this, "email", email, [
 *       { type: EMAIL, message: "Invalid email" }
 *     ]);
 *   }
 * }
 *
 * const user = new UserDTO("", "invalid@");
 * console.log(user.name); // ""
 */
const defineField = (obj, fieldName, initialValue, rules = []) => {
    addRule(obj, fieldName, rules);
    obj[fieldName] = initialValue;
};

module.exports = { defineField };
