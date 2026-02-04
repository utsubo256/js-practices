import {
  runPromise,
  getPromise,
  closePromise,
} from "./promisified_functions.js";

async function main() {
  await runPromise(
    "CREATE TABLE books (id INTEGER PRIMARY KEY ASC, title TEXT)",
  );
  const insertedBook = await runPromise(
    "INSERT INTO books (title) VALUES (?)",
    "Rubyのしくみ",
  );
  console.log(`id: ${insertedBook.lastID}`);
  const book = await getPromise("SELECT id, title FROM books");
  console.log(`id: ${book.id}、title: ${book.title}`);
  await runPromise("DROP TABLE books");
  await closePromise();
}

main();
