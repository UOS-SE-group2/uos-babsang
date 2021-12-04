import db from "../../db";
import { restaurant } from "./homeController";

export const getLoginAsManager = (req, res) => {
    return res.render("login", {title: "매니저 로그인"});
}
export const postLoginAsManager = (req, res) => {
    const {id, pw} = req.body;
    
    if (id && pw) {

        db.query('SELECT * FROM restaurant WHERE id=? AND pw = ?', [id, pw], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                req.session.loggedIn = true;
                req.session.who = "manager";
                req.session.user = results;
                return res.redirect("/");
            } else {         
                return res.status(400).send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/manager/login";</script>');    
            }            
        });
    } else {        
        return res.send('<script type="text/javascript">alert("id와 password를 입력하세요!"); document.location.href="/manager/login";</script>');
    }
}


//회원가입
export const getJoinAsManager = (req, res) => res.render("manager/join");
//구현해야함
export const postJoinAsManager = (req, res) => {

}
//매니저 홈화면
export const managerHome = (req, res) => {
    const restId = req.session.id;
    db.query(`SELECT * FROM restaurant WHERE restaurantId=${restId}`, function(error, results, fields) {
        if(error) {
            return res.status(400).render("error");
        }
        if(results) {
            const restaurant = results[0];
        }
        else {
            return res.status(404).render("error");
        }
    })
    return res.render("manager/home", restaurant);
}
    

//매장정보 수정
export const getEditManager = (req, res) => res.render("manager/editStore");
//export const postEditManager =

//매출화면
export const sales = (req, res) => res.render("manager/sales");

//주문들어온 내역확인
export const getOrderList = (req, res) => res.render("manager/orderList");
//export const postOrderList = g
//주문상세
export const getorderDetail = (req, res) => {
    const orderId = req.params.id;
    try {
        db.query(`SELECT Order.orderId, User.name, User.phone, Order.time, Order.menus, Order.isConfirmed FROM order Order, user User WHERE orderId = ${orderId} AND Order.userId = User.userId`, function(err, result, fields) {
            if(result.length == 1) {
                const takenOrder = result[0];
                return res.render("manager/takenOrder", takenOrder);
            }
        });
    } catch(error) {
        return res.status(404).render("error");
    }
 //여기부터 구현   const orders = SELECT 
    res.render("manager/takenOrder");
}
export const orderConfirm = (req, res) => {
    const orderId = req.params.id;
    db.query(`UPDATE order SET isConfirmed = true WHRER orderId = ${orderId}`);
    return res.send('<script type="text/javascript">alert("승인처리 되었습니다");</script>');
}
export const orderDenied = (req, res) => {
    const orderId = req.params.id;
    db.query(`DELETE FROM order WHRER orderId = ${orderId}`);
    res.send('<script type="text/javascript">alert("주문이 취소되었습니다");</script>');
    return res.status(200).redirect(`/manager/orderlist/${orderId}`);
}