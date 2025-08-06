const { getRulesFor } = require("./registry");
const { validators } = require("./validators");

const validate = (obj) => {
    const errors = {};
    const rules = getRulesFor(obj);

    for (const field in rules) {
        const value = obj[field];
        for (const { type, message, params } of rules[field]) {
            const fn = validators[type];
            if (!fn) throw new Error(`Validator '${type}' not found`);
            if (!fn(value, params || {})) {
                if (!errors[field]) errors[field] = [];
                errors[field].push(message);
            }
        }
    }

    return errors;
}

module.exports = { validate };
