import { response } from "express";
import db from "../../db";
//회원가입
export const getJoinAsCustomer = (req, res) => res.render("customer/join");
export const postJoinAsCustomer = (req, res) => {
    const {name, id, pw, pwcheck, email, phone} = req.body;
    
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
}

//마이페이지
export const customerPage = (req, res) => res.render("customer/profile");

//내정보 수정
export const getEditCustomer = (req, res) => res.render("customer/editProfile");

export const postEditCustomer = (req,res)=>{
    const {id,name,pw,pwcheck,number,email}=req.body;
    customerId=req.session.user[0].id;

    if(id && name && pw && number && email){
        if(pw!=pwcheck){
            response.send('<script type="text/javascript">alert("입력된 비밀번호가 서로 다릅니다."); document.location.href="/customer/edit";</script>');
        }else{
            db.query('UPDATE user SET id = ? , name = ?, pw = ? , phone = ? , email = ? WHERE id= ? ',[id,name,pw,number,email,customerId],function(error,data){
                if(error){
                    console.log(error);
                    throw(error)
                }else
                    console.log(data);
            });
            response.send('<script type="text/javascript">alert("정보가 수정되었습니다"); document.location.href="/customer/mypage";</script>');
        }
    }else{
        response.send('<script type="text/javascript">alert("모든 정보를 입력하세요"); document.location.href="/customer/edit";</script>');    
    }
}

//주문내역 및 상세
export const orderhistory = (req, res) => res.render("customer/orderhistory");
export const ordered = (req, res) => res.render("customer/order");

//리뷰 작성
export const getpostingReview = (req, res) => res.render("customer/reviewing");
//구현해야함
//export const postpostingReview =

//리뷰 작성내역
export const reviewList = (req, res) => res.render("customer/reviewList");

//장바구니
export const basket = (req, res) => res.render("customer/basket");

//결제
export const getPayment = (req, res) => res.render("customer/payment");
//구현해야함
//export const postPayment = 