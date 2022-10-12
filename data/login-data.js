const dbQuery = require('../db-query');

let loginData = function(userEmail, userPass) {
  return new Promise(async function(resolve, reject) {
    let queryStr = `
    SELECT
    id, user_name
    FROM user_data
    WHERE user_email = '${userEmail}'
    AND user_password = '${userPass}';
    `;
    let data = await dbQuery(queryStr);
    console.log(data[0])
    resolve(data[0]);
  });
}

module.exports = loginData;