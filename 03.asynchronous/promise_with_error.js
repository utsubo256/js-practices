import {
  runPromise,
  getPromise,
  closePromise,
} from "./promisified_functions.js";

runPromise("CREATE TABLE books (id INTEGER PRIMARY KEY ASC, title TEXT)")
  .then(() =>
    runPromise("INSERT___INTO books (title) VALUES (?)", "Rubyのしくみ"),
  )
  .catch((err) => console.error(err.message))
  .then(() => getPromise("SELECT___id, title FROM books"))
  .catch((err) => console.error(err.message))
  .then(() => runPromise("DROP TABLE books"))
  .then(() => closePromise());
