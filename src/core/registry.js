/**
 * A WeakMap to store validation rules for each class constructor.
 * - Key: The constructor function of a class (e.g., UserDTO).
 * - Value: An object mapping field names to arrays of validation rules.
 *
 * WeakMap is used here because:
 * - It allows garbage collection when the class is no longer referenced.
 * - Keys must be objects (in this case, constructors).
 */
const registry = new WeakMap();

/**
 * Adds validation rules for a specific field in a given object (usually inside a DTO class).
 *
 * @param {Object} target - The instance of the class where the field belongs.
 * @param {string} fieldName - The name of the field to validate.
 * @param {Array<Object>} rules - An array of validation rule objects.
 *        Each rule object should have:
 *        - {string} type: The validation type (e.g., "notEmpty", "email").
 *        - {string} message: The error message if validation fails.
 *        - {Object} [params]: Optional parameters for the validator.
 *
 * @example
 * addRule(userInstance, "email", [
 *   { type: "notEmpty", message: "Email is required" },
 *   { type: "email", message: "Invalid email format" }
 * ]);
 */
const addRule = (target, fieldName, rules) => {
    if (!registry.has(target.constructor)) {
        registry.set(target.constructor, {});
    }
    const classRules = registry.get(target.constructor);
    classRules[fieldName] = rules;
};

/**
 * Retrieves the validation rules for a given object's class.
 *
 * @param {Object} obj - The instance of the class to retrieve rules for.
 * @returns {Object} An object where:
 *          - Key: Field name.
 *          - Value: Array of validation rules for that field.
 *
 * @example
 * const rules = getRulesFor(userInstance);
 * console.log(rules.email);
 */
const getRulesFor = (obj) => {
    return registry.get(obj.constructor) || {};
};

module.exports = { addRule, getRulesFor };
