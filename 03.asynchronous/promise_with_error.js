import sqlite3 from "sqlite3";
import {
  runPromise,
  getPromise,
  closePromise,
} from "./promisified_functions.js";

const db = new (sqlite3.verbose().Database)(":memory:");

runPromise(db, "CREATE TABLE books (id INTEGER PRIMARY KEY ASC, title TEXT)")
  .then(() =>
    runPromise(db, "INSERT___INTO books (title) VALUES (?)", "Rubyのしくみ"),
  )
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => getPromise(db, "SELECT___id, title FROM books"))
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => runPromise(db, "DROP TABLE books"))
  .then(() => {
    closePromise(db);
  });
