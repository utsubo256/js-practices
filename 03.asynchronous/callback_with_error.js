import sqlite3 from "sqlite3";

const db = new (sqlite3.verbose().Database)(":memory:");

db.run("CREATE TABLE books (id INTEGER PRIMARY KEY ASC, title TEXT)", () => {
  db.run(
    "INSERT___INTO books (title) VALUES (?)",
    "Rubyのしくみ",
    function (err) {
      if (err) console.error(err);
      db.get("SELECT___id, title FROM books", (err) => {
        if (err) console.error(err);
        db.run("DROP TABLE books", () => {
          db.close();
        });
      });
    },
  );
});
