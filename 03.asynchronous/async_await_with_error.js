import {
  runPromise,
  getPromise,
  closePromise,
} from "./promisified_functions.js";

async function main() {
  await runPromise(
    "CREATE TABLE books (id INTEGER PRIMARY KEY ASC, title TEXT)",
  );
  try {
    await runPromise("INSERT___INTO books (title) VALUES (?)", "Rubyのしくみ");
  } catch (err) {
    console.error(err);
  }
  try {
    await getPromise("SELECT___id, title FROM books");
  } catch (err) {
    console.error(err);
  }
  await runPromise("DROP TABLE books");
  await closePromise();
}

main();
