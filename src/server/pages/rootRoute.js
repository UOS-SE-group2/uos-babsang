import express from "express";
import {home, getLogin, postLogin, search, restaurant} from "../controllers/homeController";
import { getJoinAsCustomer, postJoinAsCustomer } from "../controllers/customerController";
import { getJoinAsManager, postJoinAsManager } from "../controllers/managerController";

const rootRoute = express.Router();

rootRoute.get("/", home);
rootRoute.route("/login").get(getLogin).post(postLogin);
rootRoute.route("/join_as_customer").get(getJoinAsCustomer).post(postJoinAsCustomer);
rootRoute.route("/join_as_manager").get(getJoinAsManager).post(postJoinAsManager);
rootRoute.get("/search", search);
rootRoute.get("/restaurant/:id", restaurant);

export default rootRoute;
/*
const express = require('express');
const router = express.Router();
const path=require('path');
const db=require("../db");

// 메인 페이지
router.get('/', (request, response) =>{
    response.sendFile(path.join(__dirname, "../view", "main.html"));

});

//로그인 페이지로 이동
router.get('/login', (request, response) =>{
    response.sendFile(path.join(__dirname, "../view", "login.html"));

});
//로그인 진행
router.post('/login', (request, response) =>{
    var id = request.body.id;
    var pw = request.body.pw;
    console.log(id);
    console.log(pw);
    
    if (id && pw) {

        db.query('SELECT * FROM user WHERE id=? AND pw = ?', [id, pw], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                request.session.is_logined = true;
                request.session.id = id;
                response.redirect('/');
                response.end();
            } else {              
                response.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>');    
            }            
        });
    } else {        
        response.send('<script type="text/javascript">alert("id와 password를 입력하세요!"); document.location.href="/login";</script>');    
        response.end();
    }
    
});

//회원가입 페이지로 이동
router.get('/join', (request, response) =>{
    response.sendFile(path.join(__dirname, "../view", "join.html"));

});

//회원가입 진행
router.post('/join', function(request, response) {
    var name = request.body.name;
    var id= request.body.id;
    var pw = request.body.pw;
    var pwcheck = request.body.pwcheck;
    var email = request.body.email;
    var phone = request.body.phone;
    
    console.log(name, id, pw, pwcheck, email, phone);
    if (name && pw && email) {
        db.query('SELECT * FROM user WHERE name = ? AND id = ? AND pw = ? AND email = ? AND phone = ?', [name, id, pw, email, phone], function(error, results, fields) {
            if (error) throw error;
            if (results.length <= 0 && pw==pwcheck) {
                db.query('INSERT INTO user (name, id, pw, email, phone) VALUES(?,?,?,?,?)', [name, id, pw, email, phone],
                function (error, data) {
                    if (error)
                    console.log(error);
                    else
                    console.log(data);
                });
                  response.send('<script type="text/javascript">alert("회원가입을 환영합니다!"); document.location.href="/";</script>');    
            } else if(pw!=pwcheck){                
                response.send('<script type="text/javascript">alert("입력된 비밀번호가 서로 다릅니다."); document.location.href="/join";</script>');    
            }
            else {
                response.send('<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); document.location.href="/join";</script>');    
            }            
            response.end();
        });
    } else {
        response.send('<script type="text/javascript">alert("모든 정보를 입력하세요"); document.location.href="/join";</script>');    
        response.end();
    }
    
});  
       
module.exports = router; */   
  

 
 
///////////// 로그아웃
/*app.get('/logout', function(request, response) {
    request.session.loggedin = false;
    response.send('<script type="text/javascript">alert("성공적으로 로그아웃 되었습니다."); document.location.href="/";</script>');    
    response.end();
});*/
