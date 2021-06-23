const allConfig = require("./../../config");
const config = allConfig.database;
const mysql = require("mysql");

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USERNAME,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE,
});
let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log(err);
        resolve(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            console.log(err);
            resolve(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};
let createTable = function(sql) {
  return query(sql, []);
};
let findDataById = function(table, id) {
  let _sql = "select * from ?? where id = ?";
  return query(_sql, [table, id]);
};
let findDataByPage = function(table, keys, start, end) {
  let _sql = "select ?? from ?? limit ?, ?";
  return query(_sql, [keys, table, start, end]);
};
let insertData = function(table, values) {
  let _sql = "insert into ?? set ?";
  return query(_sql, [table, values]);
};
let updateDate = function(table, values, id) {
  let _sql = "update ?? set ? where id = ?";
  return query(_sql, [table, values, id]);
};
let deleteDataById = function(table, id) {
  let _sql = "delete from ?? where id =?";
  return query(_sql, [table, id]);
};
let select = function(table, keys) {
  let _sql = "select ?? from ??";
  return query(_sql, [keys, table]);
};
let count = function(table) {
  let _sql = "select count(*) as tatal_count from ??";
  return query(_sql, [table]);
};
module.exports = {
  query,
  createTable,
  findDataById,
  deleteDataById,
  insertData,
  updateDate,
  select,
  count,
};
