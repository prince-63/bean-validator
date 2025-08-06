const { getRulesFor } = require("./registry");
const { validators } = require("./validators");

/**
 * Validates an object's fields against its registered validation rules.
 *
 * This function:
 * 1. Retrieves validation rules for the object's class from the registry.
 * 2. Iterates through each field's rules.
 * 3. Executes the appropriate validator function for each rule.
 * 4. Collects error messages for any failed validations.
 *
 * @param {Object} obj - The object instance to validate (e.g., a DTO instance).
 * @returns {Object} errors - An object where:
 *          - Key: Field name.
 *          - Value: Array of error messages for that field.
 *
 * @throws {Error} If a rule references a validator type that doesn't exist in `validators`.
 *
 * @example
 * const errors = validate(userInstance);
 * if (Object.keys(errors).length > 0) {
 *   console.log(errors);
 * }
 *
 * @example Output:
 * {
 *   email: ["Invalid email format"],
 *   name: ["Name cannot be empty"]
 * }
 */
const validate = (obj) => {
    const errors = {};
    const rules = getRulesFor(obj); // Get all validation rules for this object's class

    // Loop through each field with rules
    for (const field in rules) {
        const value = obj[field];

        // Loop through each rule for the field
        for (const { type, message, params } of rules[field]) {
            const fn = validators[type];
            if (!fn) throw new Error(`Validator '${type}' not found`);

            // Run the validator, if it fails, add an error message
            if (!fn(value, params || {})) {
                if (!errors[field]) errors[field] = [];
                errors[field].push(message);
            }
        }
    }

    return errors;
};

module.exports = { validate };
