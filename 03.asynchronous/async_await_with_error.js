import sqlite3 from "sqlite3";
import {
  runPromise,
  getPromise,
  closePromise,
} from "./promisified_functions.js";

const db = new (sqlite3.verbose().Database)(":memory:");

async function main() {
  await runPromise(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY ASC, title TEXT)",
  );
  try {
    await runPromise(
      db,
      "INSERT___INTO books (title) VALUES (?)",
      "Rubyのしくみ",
    );
  } catch (err) {
    console.error(err.message);
  }
  try {
    await getPromise(db, "SELECT___id, title FROM books");
  } catch (err) {
    console.error(err.message);
  }
  await runPromise(db, "DROP TABLE books");
  await closePromise(db);
}

main();
