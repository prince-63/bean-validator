const validators = {
    digits: (value, { integer, fraction }) => {
        if (value == null) return false;
        const str = String(value);
        const [intPart, fracPart = ""] = str.split(".");
        return intPart.length <= integer && fracPart.length <= fraction && /^\d+(\.\d+)?$/.test(str);
    },
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || ""),
    max: (value, { max }) => Number(value) <= max,
    min: (value, { min }) => Number(value) >= min,
    notBlank: (value) => value != null && String(value).trim() !== "",
    notEmpty: (value) => value != null && value.length > 0,
    notNull: (value) => value !== null && value !== undefined,
    pattern: (value, { regex }) => new RegExp(regex).test(value || ""),
    size: (value, { min = 0, max = Infinity }) =>
        value != null && value.length >= min && value.length <= max,
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
    length: (value, { min = 0, max = Infinity }) =>
        value != null && value.length >= min && value.length <= max,
    currency: (value) => /^\p{Sc}?\s?\d+(,\d{3})*(\.\d{1,2})?$/u.test(value || ""),
    range: (value, { min, max }) => Number(value) >= min && Number(value) <= max,
    url: (value) => {
        try { new URL(value); return true; } catch { return false; }
    },
    uniqueElements: (value) => Array.isArray(value) && new Set(value).size === value.length,
    ean: (value) => /^\d{8}$|^\d{13}$/.test(value || ""),
    isbn: (value) => /^(97(8|9))?\d{9}(\d|X)$/.test(value || "")
};

module.exports = { validators };
