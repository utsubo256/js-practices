import sqlite3 from "sqlite3";

const db = new (sqlite3.verbose().Database)(":memory:");

db.run("CREATE TABLE books (title TEXT)", () => {
  db.run("INSERT___INTO books VALUES (?)", "Rubyのしくみ", function (err) {
    if (err) console.error(err);
    db.get("SELECT___rowid, title FROM books", (err) => {
      if (err) console.error(err);
      db.run("DROP TABLE books", () => {
        db.close();
      });
    });
  });
});
