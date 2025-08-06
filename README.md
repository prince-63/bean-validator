> Request Validation for JavaScript — inspired by Jakarta Bean Validation (JSR 380) and Hibernate Validator constraints.

This package allows you to define validation rules at runtime directly in your DTO classes without decorators, without TypeScript, and without boilerplate.

#### Installation
```bash
npm install bean-validator
````

#### Features

* No decorators, works in pure JavaScript
* Clean Architecture, separates rules from validation logic
* Supports Jakarta + Hibernate constraints
* Runtime definition like Lombok’s annotations in Java
* Custom validators supported

#### Basic Usage

```js
const { defineField, validate, NOT_EMPTY, EMAIL } = require("bean-validator");

class UserDTO {
  constructor(name, email) {
    defineField(this, "name", name, [
      { type: NOT_EMPTY, message: "Name is required" }
    ]);
    defineField(this, "email", email, [
      { type: NOT_EMPTY, message: "Email is required" },
      { type: EMAIL, message: "Invalid email format" }
    ]);
  }
}

const user = new UserDTO("", "bad-email");
console.log(validate(user));
```

**Output:**

```json
{
  "name": ["Name is required"],
  "email": ["Invalid email format"]
}
```

#### Supported Validators

| Constant    | Description                                          |
| ----------- | ---------------------------------------------------- |
| `DIGITS`    | Value has at most given integer and fraction digits. |
| `EMAIL`     | Valid email address.                                 |
| `MAX`       | Numeric value ≤ given max.                           |
| `MIN`       | Numeric value ≥ given min.                           |
| `NOT_BLANK` | String is not null and trimmed length > 0.           |
| `NOT_EMPTY` | Value (string/array) is not null and length > 0.     |
| `NOT_NULL`  | Value is not null or undefined.                      |
| `PATTERN`   | String matches given regex.                          |
| `SIZE`      | Array/string length between given min and max.       |
| `CREDIT_CARD_NUMBER` | Valid credit card number (Luhn algorithm). |
| `LENGTH`             | String length between given min and max.   |
| `CURRENCY`           | Valid currency format.                     |
| `RANGE`              | Numeric value between given min and max.   |
| `URL`                | Valid URL.                                 |
| `UNIQUE_ELEMENTS`    | Array contains only unique elements.       |
| `EAN`                | Valid EAN-8 or EAN-13 barcode.             |
| `ISBN`               | Valid ISBN-10 or ISBN-13 code.             |

#### Passing Parameters to Validators

Some validators require parameters. You pass them via `params` in the rule:

```js
const { defineField, validate, DIGITS, RANGE } = require("bean-validator");

class ProductDTO {
  constructor(price, rating) {
    defineField(this, "price", price, [
      { type: DIGITS, message: "Max 5 integer and 2 fraction digits", params: { integer: 5, fraction: 2 } }
    ]);
    defineField(this, "rating", rating, [
      { type: RANGE, message: "Rating must be between 1 and 5", params: { min: 1, max: 5 } }
    ]);
  }
}

const product = new ProductDTO("123456.78", 6);
console.log(validate(product));
```

#### Creating Custom Validators

```js
const { defineField, validate } = require("bean-validator");
const { registerValidator } = require("bean-validator");

// 1. Register custom validator
registerValidator("startsWithA", (value) => value?.startsWith("A"));

// 2. Use in DTO
class CategoryDTO {
  constructor(name) {
    defineField(this, "name", name, [
      { type: "startsWithA", message: "Name must start with 'A'" }
    ]);
  }
}

const category = new CategoryDTO("Banana");
console.log(validate(category));
```

#### License

MIT