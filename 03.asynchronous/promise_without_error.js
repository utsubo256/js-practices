import sqlite3 from "sqlite3";
import {
  runPromise,
  getPromise,
  closePromise,
} from "./promisified_functions.js";

const db = new (sqlite3.verbose().Database)(":memory:");

runPromise(db, "CREATE TABLE books (id INTEGER PRIMARY KEY ASC, title TEXT)")
  .then(() =>
    runPromise(db, "INSERT INTO books (title) VALUES (?)", "Rubyのしくみ"),
  )
  .then((result) => {
    console.log(`id: ${result.lastID}`);
    return getPromise(db, "SELECT id, title FROM books");
  })
  .then((row) => {
    console.log(`id: ${row.id}、title: ${row.title}`);
    return runPromise(db, "DROP TABLE books");
  })
  .then(() => {
    closePromise(db);
  });
