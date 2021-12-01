import db from "../../db";

//회원가입
export const getJoinAsManager = (req, res) => res.render("manager/join");
//구현해야함
//export const postJoinAsManager = 

//매니저 홈화면
export const managerHome = (req, res) => res.render("manager/home");

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
    res.send('<script type="text/javascript">alert("승인처리 되었습니다");</script>');
    return res.redirect(`/manager/orderlist/${orderId}`);
}
export const orderDenied = (req, res) => {
    const orderId = req.params.id;
    db.query(`DELETE FROM order WHRER orderId = ${orderId}`);
    res.send('<script type="text/javascript">alert("주문이 취소되었습니다");</script>');
    return res.redirect(`/manager/orderlist/${orderId}`);
}