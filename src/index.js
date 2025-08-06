/**
 * Public API entry point for validator.
 *
 * This file re-exports the contents of `interfaces/validationService.js`,
 * which exposes:
 * - `defineField(obj, fieldName, initialValue, rules)` — Define a field and attach validation rules.
 * - `validate(obj)` — Validate an object against its defined rules.
 * - Validation constants — e.g. `DIGITS`, `EMAIL`, `NOT_EMPTY`, etc.
 *
 * Example:
 * const { defineField, validate, EMAIL } = require("validator");
 */
module.exports = require("./interfaces/validationService");
