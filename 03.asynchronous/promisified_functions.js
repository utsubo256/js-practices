function runPromise(db, sql, ...params) {
  return new Promise((resolve, reject) => {
    db.run(sql, ...params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function getPromise(db, sql, ...params) {
  return new Promise((resolve, reject) => {
    db.get(sql, ...params, (err, data) => {
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
