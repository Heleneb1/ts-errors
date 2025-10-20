// import { NotFoundError } from "ts-errors";

// try {
//   throw NotFoundError(undefined, { userId: 42 });
// } catch (err) {
//   if (err instanceof Error) {
//     console.log("Caught:", err.toJSON());
//     (err as any).log();
//   }
// }
// // Output:
// // Caught: {
// //   name: 'NotFoundError',
// //   statusCode: 404,
// //   details: { userId: 42 },
// //   message: '❓ Not Found',
// //   stack: 'NotFoundError: ❓ Not Found\n    at ...'
// // }

// // You can also create a CustomError directly
// import { CustomError } from "ts-errors";
// const myError = new CustomError("Something went wrong", 500, { debug: true });
// myError.log();
// // Output:
// // Something went wrong
// // statusCode:
// // 500
// // Details: {"debug":true}
// // (with colors in the terminal)
// console.log("As JSON:", myError.toJson());
// // Output:
// // As JSON: { name: 'CustomError', statusCode: 500, details: { debug: true }, message: 'Something went wrong', stack: 'CustomError: Something went wrong\n    at ...' }
// // (the stack trace will vary)
// // Note: The toJson() method returns a plain object representation of the error.
// import { createError } from "ts-errors";
// const anotherError = createError("Bad Request", 400, { field: "email" });
// anotherError.log();
// // Output:
// // Bad Request
// // statusCode:
// // 400
// // Details: {"field":"email"}
// // (with colors in the terminal)
// // Note: createError is a simple factory function to create CustomError instances.
// // You can also use the specific error helpers for common HTTP errors: