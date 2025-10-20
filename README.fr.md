# 🧱 ts-errors

[![npm version](https://img.shields.io/npm/v/ts-errors)](https://www.npmjs.com/package/ts-errors)
[![GitHub stars](https://img.shields.io/github/stars/Heleneb1/ts-errors?style=social)](https://github.com/Heleneb1/ts-errors)

📘 Ce README existe aussi en [🇬🇧 English](README.md).

> Gère tes erreurs HTTP sans douleur — avec élégance, typage strict et un soupçon d’emoji ✨

Une **librairie TypeScript minimaliste** pour créer, formater et gérer tes erreurs HTTP avec **style, structure et expressivité**.  
Compatible **JavaScript**, **Express**, et les **loggers externes** (`winston`, `pino`, etc.).

---

## 💡 Pourquoi ts-errors ?

Parce que les erreurs méritent mieux qu’un simple `throw new Error("Oops")`.  
`ts-errors` te permet de :

- Donner du sens à tes erreurs (catégories, détails, typage)
- Les afficher avec clarté (console, logs, API)
- Les intégrer facilement dans ton stack (Express, Winston, etc.)

---

## ✨ Fonctionnalités

- ✅ Classe `CustomError` extensible avec `emoji`, `statusCode`, `category`, `details`
- 🎯 Erreurs prêtes à l’emploi (`NotFoundError`, `UnauthorizedError`, etc.)
- 🎨 Affichage formaté : compact, colorisé ou tabulaire
- ⚙️ Middleware Express intégré
- 🔌 Support des loggers externes (`winston`, `pino`, etc.)
- 📦 Zéro dépendance externe
- 🧠 Typage strict + autocomplétion JS/TS

---

## 🚀 Installation

```bash
npm install ts-errors
```

---

## ⚙️ Utilisation rapide

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

## 🧩 Exemple avec `CustomError`

```ts
import { CustomError } from "ts-errors";

throw new CustomError("Something went wrong", 500, {
  context: "DB connection",
});
```

---

## 🧰 Middleware Express

```ts
import express from "express";
import { errorMiddleware, NotFoundError } from "ts-errors";

const app = express();

app.get("/user/:id", (req, res, next) => {
  next(NotFoundError("User not found", { id: req.params.id }));
});

app.use(errorMiddleware);
```

> Le middleware `errorMiddleware` gère automatiquement la sérialisation et la réponse JSON côté client.

---

## ⚙️ Configuration Globale

```ts
import { CustomError } from "ts-errors";

CustomError.settings = {
  showEmoji: false,
  defaultCompact: true,
  colorize: false,
};
```

---

## 🔌 Intégration avec un Logger Externe

```ts
import { CustomError } from "ts-errors";
import winston from "winston";

const logger = winston.createLogger({
  /* config */
});

CustomError.setLogger(logger, "error");
```

---

## 🖼️ Affichage Formaté

```ts
try {
  throw NotFoundError("Page not found", { url: "/404" });
} catch (err) {
  if (err instanceof CustomError) {
    err.log(); // Affiche l’erreur formatée dans la console
  }
}
```

### Exemple de sortie console

```
+----+----------------+------------+----------------+--------------+
|    | Message        | StatusCode | Details        | Category     |
+----+----------------+------------+----------------+--------------+
| ⁉️ | Page not found | 404        | {"url":"/404"} | Client Error |
+----+----------------+------------+----------------+--------------+
```

_Dans ton terminal._

![image ts-errors](https://raw.githubusercontent.com/Heleneb1/ts-errors/main/assets/image1.png)

_Avec des details ajoutés en dessous si présents._

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

_Dans ton terminal._

![image ts-errors](https://raw.githubusercontent.com/Heleneb1/ts-errors/main/assets/image2.png)

---

## ⚡ Erreurs disponibles

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

## 📚 API `CustomError`

| Propriété    | Type                      | Description                          |
| ------------ | ------------------------- | ------------------------------------ |
| `message`    | `string`                  | Message d’erreur                     |
| `statusCode` | `number`                  | Code HTTP                            |
| `emoji`      | `string`                  | Emoji associé                        |
| `category`   | `string`                  | `"Client Error"` ou `"Server Error"` |
| `details`    | `Record<string, unknown>` | Données supplémentaires              |

### Méthodes

- `log()` — affiche l’erreur formatée
- `formatedMessage(compact, showEmoji, colorize)` — retourne une version stylée du message
- `toJSON()` — sérialise l’erreur pour une réponse API

---

## 🧱 Structure du package

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

## 🛡️ Licence

MIT — voir [LICENSE](LICENSE) pour plus de détails.

- libre à toi de l’utiliser, l’adapter et l’améliorer.

---

## ✨ Auteur

Made with ❤️ & TypeScript by **HeleneB1** — creative technologist & digital art director.
