import mysql from "mysql2";
const { pool } = require("./db");
let connection = mysql.createConnection(pool); // DB 커넥션 생성
connection.connect();   // DB 접속
/*
let testQuery = "SELECT id,name,pw,phone,email FROM user";//사용자정보 확인
testQuery = //리뷰조회
testQuery ="SELECT restaurant.imageUrl,restaurant.restaurantName, menu.menuName FROM menu INNER JOIN restaurant ON menu.restaurantId=restaurant.restaurantId ";
//주문내역 확인 
testQuery="SELECT restaurant.restaurantName,menu.menuName,menu.price,SUM(menu.price)AS '결제금액' FROM  menu INNER JOIN restaurant ON menu.restaurantId=restaurant.restaurantId" 
//장바구니 조회*/
connection.query(testQuery, function (err, results, fields) { // testQuery 실행
    if (err) {
        console.log(err);
    }
    console.log(results);
});
connection.end(); // DB 접속 종료