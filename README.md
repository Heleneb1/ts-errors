# 🧱 ts-errors

[![npm version](https://img.shields.io/npm/v/ts-errors)](https://www.npmjs.com/package/ts-errors)
[![GitHub stars](https://img.shields.io/github/stars/Heleneb1/ts-errors?style=social)](https://github.com/Heleneb1/ts-errors)

📘 This README is also available in [🇫🇷 French](README.fr.md) and [🇬🇧 English](README.en.md).

> Handle HTTP errors painlessly — with elegance, strict typing, and a touch of emoji ✨

A **minimalist TypeScript library** to create, format, and manage HTTP errors with **style, structure, and expressiveness**. Compatible with **JavaScript**, **Express**, and **external loggers** like winston, pino, etc.

---

## 💡 Why ts-errors ?

Because errors deserve better than `throw new Error("Oops")`.  
`ts-errors` helps you to:

- Give meaning to your errors (categories, details, typing)
- Display them clearly (console, logs, API)
- Integrate them easily into your stack (Express, Winston, etc.)

---

## ✨ Features

- ✅ Extensible CustomError class with emoji, statusCode, category, details

- 🎯 Ready-to-use errors (NotFoundError, UnauthorizedError, etc.)

- 🎨 Formatted output: compact, colorized, or tabular

- ⚙️ Built-in Express middleware

- 🔌 External logger support (winston, pino, etc.)

- 📦 Zero external dependencies

- 🧠 Strict typing + JS/TS autocompletion

---

## 🚀 Installation

```bash
npm install ts-errors
```

---

## ⚙️ Quick Start

### TypeScript

```ts
import { NotFoundError } from "ts-errors";

throw NotFoundError("User not found", { userId: 42 });
```

### JavaScript

```js
const { NotFoundError } = require("ts-errors");

throw NotFoundError("User not found", { userId: 42 });
```

---

## 🧩Using `CustomError`

```ts
import { CustomError } from "ts-errors";

throw new CustomError("Something went wrong", 500, {
  context: "DB connection",
});
```

---

## 🧰 Express Middleware

```ts
import express from "express";
import { errorMiddleware, NotFoundError } from "ts-errors";

const app = express();

app.get("/user/:id", (req, res, next) => {
  next(NotFoundError("User not found", { id: req.params.id }));
});

app.use(errorMiddleware);
```

> The errorMiddleware automatically serializes and sends JSON responses to the client.

---

## ⚙️ Global Configuration

```ts
import { CustomError } from "ts-errors";

CustomError.settings = {
  showEmoji: false,
  defaultCompact: true,
  colorize: false,
};
```

---

## 🔌 External Logger Integration

```ts
import { CustomError } from "ts-errors";
import winston from "winston";

const logger = winston.createLogger({
  /* config */
});

CustomError.setLogger(logger, "error");
```

---

## 🖼️ Formatted Output

```ts
try {
  throw NotFoundError("Page not found", { url: "/404" });
} catch (err) {
  if (err instanceof CustomError) {
    err.log(); // Affiche l’erreur formatée dans la console
  }
}
```

### 🗃️ Access as Table or JSON

Each CustomError can be displayed as a table in the console using log() or retrieved as JSON using toJSON().

```ts
import { NotFoundError, CustomError } from "ts-errors";

try {
  throw NotFoundError(undefined, { userId: 42 });
} catch (err) {
  if (err instanceof CustomError) {
    // Display as a table in the console
    err.log();

    // Get the JSON object for API or other usage

    console.log(err.toJSON());
  }
}
```

![image ts-errors](https://raw.githubusercontent.com/Heleneb1/ts-errors/main/assets/image.png)

### Console Output example

```
+----+----------------+------------+----------------+--------------+
|    | Message        | StatusCode | Details        | Category     |
+----+----------------+------------+----------------+--------------+
| ⁉️ | Page not found | 404        | {"url":"/404"} | Client Error |
+----+----------------+------------+----------------+--------------+
```

_In your terminal_

![image ts-errors](https://raw.githubusercontent.com/Heleneb1/ts-errors/main/assets/image1.png)

_If details are too long, they're truncates in the table and printed bellow._

```
+----+----------------+------------+-----------------------------------+--------------+
|    | Message        | StatusCode | Details                           | Category     |
+----+----------------+------------+-----------------------------------+--------------+
| ⁉️ | Page not found | 404        | {"url":"/404","detail":"You ca... | Client Error |
+----+----------------+------------+-----------------------------------+--------------+

Details (full):
{
  "url": "/404",
  "detail": "You can add any detail here"
}
```

_In your terminal._

![image ts-errors](https://raw.githubusercontent.com/Heleneb1/ts-errors/main/assets/image2.png)

---

## ⚡ Available Errors

- BadRequestError
- UnauthorizedError
- ForbiddenError
- NotFoundError
- ConflictError
- UnprocessableEntityError
- TooManyRequestsError
- InternalServerError
- ServiceUnavailableError
- GatewayTimeoutError

---

## 📚 `CustomError` API

| Propriété    | Type                      | Description                          |
| ------------ | ------------------------- | ------------------------------------ |
| `message`    | `string`                  | Error message                        |
| `statusCode` | `number`                  | HTTP status code                     |
| `emoji`      | `string`                  | Associated Emoji                     |
| `category`   | `string`                  | `"Client Error"` ou `"Server Error"` |
| `details`    | `Record<string, unknown>` | Additional data                      |

### Methods

- `log()` — prints the formatted error
- `formatedMessage(compact, showEmoji, colorize)` — returns a styled message
- `toJSON()` — serializes the error for API responses

---

## 🧱 Package Structure

```ts
export * from "./CustomError";
export * from "./createError";
export * from "./errorHelpers";
export * from "./middlewares/errorMiddleware";
```

---

## 🧪 Tests

```bash
npm test
```

---

## 🛡️ License

MIT — see [LICENSE](LICENSE) for details.
You're free to use and modify this library as you see fit.

---

## ✨ Auteur

Made with ❤️ & TypeScript by **HeleneB1** — creative technologist & digital art director.
