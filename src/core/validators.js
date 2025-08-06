/**
 * A collection of validator functions implementing Jakarta Bean Validation
 * and Hibernate Validator constraints.
 *
 * Each function takes:
 * - `value`: The value to validate.
 * - `params`: An optional configuration object for that validator.
 *
 * Returns:
 * - `true` if the value passes validation.
 * - `false` otherwise.
 */
const validators = {
    /**
     * Checks that the value has at most the specified number of integer and fraction digits.
     * @param {string|number} value - The value to check.
     * @param {Object} params - { integer: number, fraction: number }
     * @returns {boolean}
     */
    digits: (value, { integer, fraction }) => {
        if (value == null) return false;
        const str = String(value);
        const [intPart, fracPart = ""] = str.split(".");
        return intPart.length <= integer && fracPart.length <= fraction && /^\d+(\.\d+)?$/.test(str);
    },

    /**
     * Checks if the value is a valid email format.
     */
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || ""),

    /**
     * Checks if the numeric value is less than or equal to `max`.
     */
    max: (value, { max }) => Number(value) <= max,

    /**
     * Checks if the numeric value is greater than or equal to `min`.
     */
    min: (value, { min }) => Number(value) >= min,

    /**
     * Checks if the string is not null and trimmed length is greater than zero.
     */
    notBlank: (value) => value != null && String(value).trim() !== "",

    /**
     * Checks if the value (string, array, etc.) is not null and has a length > 0.
     */
    notEmpty: (value) => value != null && value.length > 0,

    /**
     * Checks if the value is not null or undefined.
     */
    notNull: (value) => value !== null && value !== undefined,

    /**
     * Checks if the value matches the given regex pattern.
     */
    pattern: (value, { regex }) => new RegExp(regex).test(value || ""),

    /**
     * Checks if the value's length is between `min` and `max` inclusive.
     */
    size: (value, { min = 0, max = Infinity }) =>
        value != null && value.length >= min && value.length <= max,

    /**
     * Checks if the value is a valid credit card number (Luhn algorithm).
     */
    creditCardNumber: (value) => {
        if (!/^\d+$/.test(value || "")) return false;
        let sum = 0, shouldDouble = false;
        for (let i = value.length - 1; i >= 0; i--) {
            let digit = parseInt(value[i], 10);
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    },

    /**
     * Checks if the string's length is between `min` and `max` inclusive.
     */
    length: (value, { min = 0, max = Infinity }) =>
        value != null && value.length >= min && value.length <= max,

    /**
     * Checks if the value matches a valid currency format.
     */
    currency: (value) => /^\p{Sc}?\s?\d+(,\d{3})*(\.\d{1,2})?$/u.test(value || ""),

    /**
     * Checks if the numeric value is between `min` and `max` inclusive.
     */
    range: (value, { min, max }) => Number(value) >= min && Number(value) <= max,

    /**
     * Checks if the value is a valid URL.
     */
    url: (value) => {
        try { new URL(value); return true; } catch { return false; }
    },

    /**
     * Checks if the array or collection contains only unique elements.
     */
    uniqueElements: (value) => Array.isArray(value) && new Set(value).size === value.length,

    /**
     * Checks if the value is a valid EAN-8 or EAN-13 barcode.
     */
    ean: (value) => /^\d{8}$|^\d{13}$/.test(value || ""),

    /**
     * Checks if the value is a valid ISBN-10 or ISBN-13 code.
     */
    isbn: (value) => /^(97(8|9))?\d{9}(\d|X)$/.test(value || "")
};

module.exports = { validators };
