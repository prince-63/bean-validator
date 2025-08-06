const { validators } = require("../core/validators");

/**
 * Registers a custom validator function.
 *
 * This allows users to extend the built-in Jakarta & Hibernate validators
 * with their own custom validation logic.
 *
 * @param {string} name - The unique name of the validator (used in the `type` field of a rule).
 * @param {Function} fn - The validator function.
 *        - Receives: `(value, params)` where:
 *            - `value` is the field value being validated.
 *            - `params` is an optional object with extra parameters for the rule.
 *        - Must return: `true` if the value is valid, `false` otherwise.
 *
 * @example
 * const { registerValidator, defineField, validate } = require("js-bean-validator");
 *
 * // 1. Register a validator that checks if a string starts with "A"
 * registerValidator("startsWithA", (value) => typeof value === "string" && value.startsWith("A"));
 *
 * // 2. Use it in a DTO
 * class CategoryDTO {
 *   constructor(name) {
 *     defineField(this, "name", name, [
 *       { type: "startsWithA", message: "Name must start with 'A'" }
 *     ]);
 *   }
 * }
 *
 * const category = new CategoryDTO("Banana");
 * console.log(validate(category)); // { name: ["Name must start with 'A'"] }
 */
function registerValidator(name, fn) {
    validators[name] = fn;
}

module.exports = { registerValidator };
