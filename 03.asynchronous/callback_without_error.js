import sqlite3 from "sqlite3";

const db = new (sqlite3.verbose().Database)(":memory:");

db.run("CREATE TABLE books (title TEXT)", () => {
  db.run("INSERT INTO books VALUES (?)", "Rubyのしくみ", function () {
    console.log(`rowid: ${this.lastID}`);
    db.get("SELECT rowid, title FROM books", (_, row) => {
      console.log(`rowid: ${row.rowid}、title: ${row.title}`);
      db.run("DROP TABLE books", () => {
        db.close();
      });
    });
  });
});
