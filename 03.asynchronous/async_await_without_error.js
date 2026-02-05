import sqlite3 from "sqlite3";
import {
  runPromise,
  getPromise,
  closePromise,
} from "./promisified_functions.js";

const db = new (sqlite3.verbose().Database)(":memory:");

await runPromise(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY ASC, title TEXT)",
);
const insertedBook = await runPromise(
  db,
  "INSERT INTO books (title) VALUES (?)",
  "Rubyのしくみ",
);
console.log(`id: ${insertedBook.lastID}`);
const book = await getPromise(db, "SELECT id, title FROM books");
console.log(`id: ${book.id}、title: ${book.title}`);
await runPromise(db, "DROP TABLE books");
await closePromise(db);
