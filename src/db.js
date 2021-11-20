import mysql from "mysql2";
const pool = mysql.createPool({ 
    host:'54.180.16.45', 
    user:'steve', 
    password:'password', 
    port:'3306', 
    database:'stevedb' 
});
module.exports = {
    pool: pool
};
/*let connection = mysql.createConnection(pool); // DB 커넥션 생성
connection.connect();   // DB 접속
let testQuery = "INSERT INTO `category` (`category_name`,`category_image`) VALUES ('양식','http://www.kdf.co.kr');";
connection.query(testQuery, function (err, results, fields) { // testQuery 실행
    if (err) {
        console.log(err);
    }
    console.log(results);
});
connection.end(); // DB 접속 종료



/*app.get('/db-connection', (req, res)=>{
    var sql = 'SELECT * FROM GROUPLIST WHERE GROUP_NAME = ?'
    mysqlDB.query(sql, '졸프', function (err, results) {
        if (err) console.log(err);
        else res.send(results);
      });
})*/