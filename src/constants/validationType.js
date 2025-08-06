/**
 * Validation type constants representing different Jakarta Bean Validation
 * and Hibernate Validator constraints.
 *
 * These constants are used as the `type` property when defining validation rules
 * with `defineField()` so that string typos are avoided and IDE autocomplete works.
 *
 * Example:
 * defineField(this, "email", "test@", [
 *   { type: EMAIL, message: "Invalid email format" }
 * ]);
 */

/** Checks that the value is a number with the specified number of integer and fraction digits. */
const DIGITS = "digits";

/** Checks that the value is a valid email address. */
const EMAIL = "email";

/** Checks that the numeric value is less than or equal to the specified maximum. */
const MAX = "max";

/** Checks that the numeric value is greater than or equal to the specified minimum. */
const MIN = "min";

/** Checks that the string is not null and trimmed length is greater than zero. */
const NOT_BLANK = "notBlank";

/** Checks that the string, array, or collection is not null and not empty. */
const NOT_EMPTY = "notEmpty";

/** Checks that the value is not null. */
const NOT_NULL = "notNull";

/** Checks that the string matches the specified regular expression. */
const PATTERN = "pattern";

/** Checks that the string, array, or collection size is between given min and max (inclusive). */
const SIZE = "size";

/** Checks that the value is a valid credit card number using the Luhn algorithm. */
const CREDIT_CARD_NUMBER = "creditCardNumber";

/** Checks that the string length is between given min and max (inclusive). */
const LENGTH = "length";

/** Checks that the value is a valid currency format. */
const CURRENCY = "currency";

/** Checks that the numeric value is within the inclusive range of min and max. */
const RANGE = "range";

/** Checks that the value is a valid URL. */
const URL = "url";

/** Checks that the array or collection contains only unique elements. */
const UNIQUE_ELEMENTS = "uniqueElements";

/** Checks that the value is a valid EAN-8 or EAN-13 barcode. */
const EAN = "ean";

/** Checks that the value is a valid ISBN-10 or ISBN-13 code. */
const ISBN = "isbn";

module.exports = {
    DIGITS,
    EMAIL,
    MAX,
    MIN,
    NOT_BLANK,
    NOT_EMPTY,
    NOT_NULL,
    PATTERN,
    SIZE,
    CREDIT_CARD_NUMBER,
    LENGTH,
    CURRENCY,
    RANGE,
    URL,
    UNIQUE_ELEMENTS,
    EAN,
    ISBN
};
