import db from "../../db";

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
    const {name, id, pw, pwcheck, phone, categoryId, start_time, address} = req.body;
    if(name && id && pw && phone) {
        db.query("SELECT restaurantName FROM restaurant WHERE id = ?", [id], function(error, results, fields) {
            if (error) throw error;
            if (results.length <= 0 && pw==pwcheck) {
                db.query('INSERT INTO restaurant (restaurantName, id, pw, phone, categoryId, address, openTime) VALUES(?,?,?,?,?, ?,?)', [name, id, pw, phone, categoryId, address, start_time],
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

    db.query('SELECT restaurant.address, restaurant.openTime, category.categoryName, restaurant.phone FROM restaurant, category WHERE restaurant.restaurantId = ? AND category.categoryId=restaurant.categoryId', [restId], function(error, result) {
        if(error) throw error;
        const restaurant = JSON.parse(JSON.stringify(result[0]));
        db.query('select `order`.isConfirmed, `order`.time, `order`.orderId, `order`.quantity, menu.menuName, menu.price FROM `order`, menu where `order`.restaurantId=? AND menu.menuId = `order`.menuId', [restId], function(error, results, fields) {
            if(error) {
                throw error;
            }
            if(results) {
                const orders = (JSON.parse(JSON.stringify(results)));
                for(var i = 0; i < orders.length; i++) {
                    const time = new Date(orders[i].time);
                    const year = time.getFullYear();
                    const month = time.getMonth()+1;
                    const date = time.getDate();
                    var hours = time.getHours();
                    var min = time.getMinutes();
                    var sec = time.getSeconds();
                    hours = hours < 10 ? '0'+hours : hours;
                    min = min < 10 ? '0'+min : min;
                    sec = sec < 10 ? '0'+sec : sec;
                    const timestr = year+"/"+month+"/"+date+" "+hours+":"+min+":"+sec;
                    orders[i].time = timestr;
                }
                db.query('SELECT * FROM menu WHERE restaurantId=?', [restId], function(error, results2, fields) {
                    if(error) {
                        throw error;
                    }
                    const menus = (JSON.parse(JSON.stringify(results2)));
                    return res.render("manager/home", {restaurant, restaurantName, orders, menus});
                })
                
            } else {
                return res.status(404).render("error");
            }
        });
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
            return res.send('<script type="text/javascript">alert("메뉴등록이 완료되었습니다."); document.location.href="/manager";</script>');    
        });
    }else{
        return res.send('<script type="text/javascript">alert("모든 정보를 입력하세요"); history.back();</script>'); 
    }
}

export const deleteMenu = (req, res) => {
    const menuId = req.params.menuId;
    db.query("DELETE FROM menu WHERE menuId=?", [menuId], function(error) {
        if(error) {
            return res.render("error");
        }
    })
    return res.redirect("/manager");
}

export const getEditManager = (req, res) => {
    const restaurantId = req.session.user.restaurantId;
    db.query("SELECT restaurantName, address, phone FROM restaurant WHERE restaurantId = ?",[restaurantId],
        function(error,results,fields){
            if(error) console.log(error);
            const restaurant=JSON.parse(JSON.stringify(results[0]));
            res.render("manager/editStore",{restaurant});    
        });
}

export const postEditManager = (req, res) => {
    const {restaurantName,address,start_time, categoryId, phone}=req.body;
    const restId=req.session.user.restaurantId;
    if(restaurantName && address && start_time && categoryId && phone){
            db.query('UPDATE restaurant SET restaurant.restaurantName = ?, restaurant.address = ?, restaurant.openTime = ?, restaurant.categoryId = ?, restaurant.phone=? WHERE restaurantId = ?',[restaurantName,address,start_time, categoryId, phone, restId],function(error,results,fields){
                if(error) throw error;
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
    db.query('UPDATE `order` SET isConfirmed = 1 WHERE orderId = ?', [orderId]);
    return res.send('<script type="text/javascript">alert("승인처리 되었습니다"); document.location.href="/manager";</script>');
}
export const orderDenied = (req, res) => {
    const orderId = req.params.id;
    db.query('DELETE FROM `order` WHERE orderId =?',[orderId]);
    return res.send('<script type="text/javascript">alert("주문이 취소되었습니다"); document.location.href="/manager";</script>');
}