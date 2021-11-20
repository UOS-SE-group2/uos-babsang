import mysql from "mysql2";
const { pool } = require("./db");
let connection = mysql.createConnection(pool); // DB 커넥션 생성
connection.connect();   // DB 접속
let testQuery = "";
connection.query(testQuery, function (err, results, fields) { // testQuery 실행
    if (err) {
        console.log(err);
    }
    console.log(results);
});
connection.end(); // DB 접속 종료