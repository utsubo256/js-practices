import {
  runPromise,
  getPromise,
  closePromise,
} from "./promisified_functions.js";

runPromise("CREATE TABLE books (title TEXT)")
  .then(() => runPromise("INSERT INTO books VALUES (?)", "Rubyのしくみ"))
  .then((data) => {
    console.log(`rowid: ${data.lastID}`);
    return getPromise("SELECT rowid, title FROM books");
  })
  .then((data) => {
    console.log(`rowid: ${data.rowid}、title: ${data.title}`);
    return runPromise("DROP TABLE books");
  })
  .then(() => closePromise());
