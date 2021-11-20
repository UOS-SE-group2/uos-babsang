import mysql from "mysql2";
const { pool } = require("./db");
let connection = mysql.createConnection(pool); // DB 커넥션 생성
connection.connect();   // DB 접속
/*
let testQuery = "SELECT categoryName FROM category"; //카테고리 테이블에서 카테고리 이름 조회
testquery="SELECT content FROM search";// 검색테이블에서 검색내용 조회
testQuery="SELECT category.categoryName,restaurant.imageurl,restaurant.restaurantName,restaurnant.star FROM category INNER JOIN restaurant ON category.categoryId=restaurant.restaurantId WHERE category.categoryName='한식' ORDER BY restaurnant.star DESC";
//별점순으로 카테고리종류별로 매장이미지, 매장이름, 별점 조회*/   
          
connection.query(testQuery, function (err, results, fields) { // testQuery 실행
    if (err) {
        console.log(err);
    }
    console.log(results);
});
connection.end(); // DB 접속 종료
