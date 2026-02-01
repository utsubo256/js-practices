import {
  runPromise,
  getPromise,
  closePromise,
} from "./promisified_functions.js";

async function main() {
  await runPromise("CREATE TABLE books (title TEXT)");
  try {
    await runPromise("INSERT___INTO books VALUES (?)", "Rubyのしくみ");
  } catch (err) {
    console.error(err);
  }
  try {
    await getPromise("SELECT___rowid, title FROM books");
  } catch (err) {
    console.error(err);
  }
  await runPromise("DROP TABLE books");
  await closePromise();
}

main();
