import { runPromise, allPromise, closePromise } from "./sqlite_promises.js";

export class MemoRepository {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async setup() {
    await runPromise(
      this.#db,
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY ASC, title TEXT)",
    );
  }

  async create(input) {
    await runPromise(this.#db, "INSERT INTO memos (title) VALUES (?)", input);
  }

  async all() {
    return allPromise(this.#db, "SELECT id, title FROM memos ORDER BY id DESC");
  }

  async close() {
    await closePromise(this.#db);
  }
}
