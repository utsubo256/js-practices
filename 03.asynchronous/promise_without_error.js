import {
  runPromise,
  getPromise,
  closePromise,
} from "./promisified_functions.js";

runPromise("CREATE TABLE books (title TEXT)")
  .then(() => runPromise("INSERT INTO books VALUES (?)", "Rubyのしくみ"))
  .then((data) => console.log(`rowid: ${data.lastID}`))
  .then(() => getPromise("SELECT rowid, title FROM books"))
  .then((data) => console.log(`rowid: ${data.rowid}、title: ${data.title}`))
  .then(() => runPromise("DROP TABLE books"))
  .then(() => closePromise());
