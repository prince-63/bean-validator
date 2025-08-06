const registry = new WeakMap();

const addRule = (target, fieldName, rules) => {
    if (!registry.has(target.constructor)) {
        registry.set(target.constructor, {});
    }
    const classRules = registry.get(target.constructor);
    classRules[fieldName] = rules;
}

const getRulesFor = (obj) => {
    return registry.get(obj.constructor) || {};
}

module.exports = { addRule, getRulesFor };
