import mysql from "mysql";

const db = mysql.createConnection({ 
    host:'54.180.16.45', 
    user:'jyj', 
    password:'password', 
    port:'3306', 
    database:'jyjdb' 
});

db.connect();

export default db;
