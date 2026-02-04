import sqlite3 from "sqlite3";

const db = new (sqlite3.verbose().Database)(":memory:");

db.run("CREATE TABLE books (id INTEGER PRIMARY KEY ASC, title TEXT)", () => {
  db.run("INSERT INTO books (title) VALUES (?)", "Rubyのしくみ", function () {
    console.log(`id: ${this.lastID}`);
    db.get("SELECT id, title FROM books", (_, row) => {
      console.log(`id: ${row.id}、title: ${row.title}`);
      db.run("DROP TABLE books", () => {
        db.close();
      });
    });
  });
});
