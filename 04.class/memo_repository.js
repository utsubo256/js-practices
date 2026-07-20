import {
  runPromise,
  allPromise,
  getPromise,
  closePromise,
} from "./sqlite_promises.js";

export class MemoRepository {
  #db;

  constructor(db) {
    this.#db = db;
  }

  async setup() {
    await runPromise(
      this.#db,
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY ASC, body TEXT)",
    );
  }

  async create(input) {
    await runPromise(this.#db, "INSERT INTO memos (body) VALUES (?)", input);
  }

  async all() {
    return allPromise(this.#db, "SELECT id, body FROM memos ORDER BY id DESC");
  }

  async find(id) {
    return getPromise(this.#db, "SELECT body FROM memos WHERE id = ?", id);
  }

  async delete(id) {
    await runPromise(this.#db, "DELETE FROM memos WHERE id = ?", id);
  }

  async close() {
    await closePromise(this.#db);
  }
}
