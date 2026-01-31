import {
  runPromise,
  getPromise,
  closePromise,
} from "./promisified_functions.js";

runPromise("CREATE TABLE books (title TEXT)")
  .then(() => runPromise("INSERT___INTO books VALUES (?)", "Rubyのしくみ"))
  .catch((err) => console.error(err))
  .then(() => getPromise("SELECT___rowid, title FROM books"))
  .catch((err) => console.error(err))
  .then(() => runPromise("DROP TABLE books"))
  .then(() => closePromise());
