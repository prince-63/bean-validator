const { addRule } = require("../core/registry");

const defineField = (obj, fieldName, initialValue, rules = []) => {
    addRule(obj, fieldName, rules);
    obj[fieldName] = initialValue;
}

module.exports = { defineField };