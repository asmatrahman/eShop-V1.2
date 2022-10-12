const dbQuery = require('../db-query');

let singupData = function(userName,userEmail,userPass) {
  return new Promise(async function(resolve, reject) {
    let queryStr = `
    INSERT INTO user_data(user_name,user_email,user_password) 
    VALUES('${userName}','${userEmail}','${userPass}');
    `;
    let data = await dbQuery(queryStr);
    console.log(data[0])
    resolve(data[0]);
  });
}

module.exports = singupData;