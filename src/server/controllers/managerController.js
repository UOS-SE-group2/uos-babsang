import db from "../../db";
import { restaurant } from "./homeController";

export const getLoginAsManager = (req, res) => {
    return res.render("login", {title: "매니저 로그인", what:"manager"});
}
export const postLoginAsManager = (req, res) => {
    const {id, pw} = req.body;
    
    if (id && pw) {

        db.query('SELECT * FROM restaurant WHERE id=? AND pw = ?', [id, pw], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                req.session.loggedIn = true;
                req.session.who = "manager";
                req.session.user = results[0];
                return res.redirect("/manager");
            } else {         
                return res.status(400).send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/manager/login";</script>');    
            }            
        });
    } else {        
        return res.send('<script type="text/javascript">alert("id와 password를 입력하세요!"); document.location.href="/manager/login";</script>');
    }
}
export const getJoinAsManager = (req, res) => res.render("manager/join");
export const postJoinAsManager = (req, res) => {
    const {name, id, pw, pwcheck, phone} = req.body;
    console.log(name, id, pw, phone);
    if(name && id && pw && phone) {
        db.query("SELECT restaurantName FROM restaurant WHERE id = ?", [id], function(error, results, fields) {
            if (error) throw error;
            if (results.length <= 0 && pw==pwcheck) {
                db.query('INSERT INTO restaurant (restaurantName, id, pw, phone) VALUES(?,?,?,?)', [name, id, pw, phone],
                function (error, data) {
                    if (error)
                    console.log(error);
                });
                  return res.send('<script type="text/javascript">alert("매장등록이 완료되었습니다."); document.location.href="/manager/login";</script>');    
            } else if(pw!=pwcheck){                
                res.send('<script type="text/javascript">alert("입력된 비밀번호가 서로 다릅니다."); history.back();</script>');    
            } else {
                return res.send('<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); history.back();</script>');
            }            
        });
    } else {
        return res.send('<script type="text/javascript">alert("모든 정보를 입력하세요"); history.back();</script>');    
    }
}
export const managerHome = (req, res) => {
    const restId = req.session.user.restaurantId;
    const restaurantName = req.session.user.restaurantName;

    db.query('select restaurant.restaurantName, restaurant.phone, `order`.time, `order`.orderId, menu.menuName, menu.price from restaurant inner join `order` on restaurant.restaurantId=`order`.restaurantId inner join menu on `order`.menuId=menu.menuId where restaurant.restaurantId=?', [restId], function(error, results, fields) {
        if(error) {
            throw error;
        }
        if(results) {
            const orders = (JSON.parse(JSON.stringify(results)));
            db.query('SELECT * FROM menu WHERE restaurantId=?', [restId], function(error, results2, fields) {
                if(error) {
                    throw error;
                }
                const menus = (JSON.parse(JSON.stringify(results2)));
                return res.render("manager/home", {restaurantName, orders, menus});
            })

        } else {
            return res.status(404).render("error");
        }
    });
}














export const getAddMenus = (req, res) => res.render("manager/addMenus");
export const postAddMenus = (req, res) => {
    const {menuName,info,price}=req.body;
    const restId=req.session.user.restaurantId;
    if(menuName&&info&&price){
        db.query("INSERT INTO menu(restaurantId,menuName,info,price) VALUES(?,?,?,?)",[restId,menuName,info,price],
        function(error,results,fields){
            if(error)throw error;
            return res.send('<script type="text/javascript">alert("메뉴등록이 완료되었습니다."); document.location.href="/manager/edit";</script>');    
        });

    }else{
        return res.send('<script type="text/javascript">alert("모든 정보를 입력하세요"); history.back();</script>'); 
    }
}   
export const deleteMenu = (req, res) => {
    
}
//매장정보 수정
export const getEditManager = (req, res) => {
    const restaurant = req.session.user;
    const restId=req.session.user.restaurantId;
    db.query("SELECT menuName , info , price FROM menu WHERE restaurantId = ?",[restId],
        function(error,results,fields){
            if(error) console.log(error);
            const menus=JSON.parse(JSON.stringify(results));
            res.render("manager/editStore",{restaurant,menus});    
        });
}

export const postEditManager = (req, res) => {
    const {restaurantName,address,start_time,end_time}=req.body;
    console.log(address);
    const restId=req.session.user.restaurantId;
    if(start_time && end_time){
            db.query('UPDATE restaurant SET restaurant.restaurantName = ?, restaurant.address = ?, restaurant.openTime = ? WHERE restaurantId = ?',[restaurantName,address,`${start_time}~${end_time}`,restId],function(error,results,fields){
                if(error) throw error;
                console.log(results);
            });
            return res.send('<script type="text/javascript">alert("매장정보 수정이 완료되었습니다."); document.location.href="/manager";</script>');    
    }else{
        return res.send('<script type="text/javascript">alert("모든 정보를 입력하세요"); history.back();</script>'); 
    }
}

//주문들어온 내역확인
export const getOrderList = (req, res) => {
    const restId=req.session.user.restaurantId;
    try{
        db.query('SELECT `order`.time, menu.menuName, `order`.quantity, `order`.price, `order`.price AS totalcost FROM (`order` INNER JOIN user ON `order`.userId = user.userId), restaurant, menu WHERE `order`.restaurantId = ? AND `order`.restaurantId = restaurant.restaurantId AND `order`.menuId = menu.menuId',[restId],function(error,results,fields){
            const orders=JSON.parse(JSON.stringify(results));
            for(var i = 0; i < orders.length; i++) {
                orders[i].totalcost = orders[i].price * orders[i].quantity;
            }
            return res.render("manager/orderList",orders)
        });
    } catch(error){
        return res.status(404).render("error");
    }
}
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