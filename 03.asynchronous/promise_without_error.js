import {
  runPromise,
  getPromise,
  closePromise,
} from "./promisified_functions.js";

runPromise("CREATE TABLE books (id INTEGER PRIMARY KEY ASC, title TEXT)")
  .then(() =>
    runPromise("INSERT INTO books (title) VALUES (?)", "Rubyのしくみ"),
  )
  .then((data) => {
    console.log(`id: ${data.lastID}`);
    return getPromise("SELECT id, title FROM books");
  })
  .then((data) => {
    console.log(`id: ${data.id}、title: ${data.title}`);
    return runPromise("DROP TABLE books");
  })
  .then(() => closePromise());
