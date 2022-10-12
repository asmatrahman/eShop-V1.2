const conn = require('./db-config');

let dbQuery = function(queryStr) {
  return new Promise(function(resolve, reject) {
    conn.query(queryStr, function(err, data) {
      if(err) throw err;
      resolve(data.rows);
    });
  });
}

module.exports = dbQuery;