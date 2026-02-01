import {
  runPromise,
  getPromise,
  closePromise,
} from "./promisified_functions.js";

async function main() {
  await runPromise("CREATE TABLE books (title TEXT)");
  const insertedBook = await runPromise(
    "INSERT INTO books VALUES (?)",
    "Rubyのしくみ",
  );
  console.log(`rowid: ${insertedBook.lastID}`);
  const book = await getPromise("SELECT rowid, title FROM books");
  console.log(`rowid: ${book.rowid}、title: ${book.title}`);
  await runPromise("DROP TABLE books");
  await closePromise();
}

main();
