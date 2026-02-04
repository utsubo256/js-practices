function runPromise(db, sql, param = undefined) {
  return new Promise((resolve, reject) => {
    db.run(sql, param, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function getPromise(db, sql, param = undefined) {
  return new Promise((resolve, reject) => {
    db.get(sql, param, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function closePromise(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export { runPromise, getPromise, closePromise };
