import db from "../../db";

export const getLoginAsCustomer = (req, res) => {
    return res.render("login", {title: "고객 로그인", what:"user"});
}
export const postLoginAsCustomer = (req, res) => {
    const {id, pw} = req.body;
    
    if (id && pw) {

        db.query('SELECT * FROM user WHERE id=? AND pw = ?', [id, pw], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                req.session.loggedIn = true;
                req.session.who = "user";
                req.session.user = results[0];
                return res.redirect("/");
            } else {         
                return res.status(400).send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/customer/login";</script>');    
            }            
        });
    } else {        
        return res.send('<script type="text/javascript">alert("id와 password를 입력하세요!"); document.location.href="/customer/login";</script>');    
    }
}
export const getJoinAsCustomer = (req, res) => res.render("customer/join");
export const postJoinAsCustomer = (req, res) => {
    const {name, id, pw, pwcheck, email, phone} = req.body;
    
    if (name && id && pw && phone) {
        db.query("SELECT * FROM user WHERE id = ?", [id], function(error, results, fields) {
            if (error) throw error;
            if (results.length <= 0 && pw==pwcheck) {
                db.query('INSERT INTO user (name, id, pw, email, phone) VALUES(?,?,?,?,?)', [name, id, pw, email, phone],
                function (error, data) {
                    if (error)
                    console.log(error);
                });
                  return res.send('<script type="text/javascript">alert("회원가입이 완료되었습니다!"); document.location.href="/customer/login";</script>');    
            } else if(pw!=pwcheck){                
                res.send('<script type="text/javascript">alert("입력된 비밀번호가 서로 다릅니다."); history.back();</script>');    
            }
            else {
                return res.send('<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); history.back();</script>');
            }            
        });
    } else {
        return res.send('<script type="text/javascript">alert("모든 정보를 입력하세요"); history.back();</script>');    
    }
}
export const customerPage = (req, res) => {
    const user=req.session.user;
    res.render("customer/profile",{user});
}

export const getEditCustomer = (req, res) => {
    const user = req.session.user;
    return res.render("customer/editProfile", {user});
}
export const postEditCustomer = (req, res) => {
    const {name, pw, pwcheck, phone, email}=req.body;
    const customerId = req.session.user.userId;

    if(name && pw && phone){
        if(pw!=pwcheck){
            res.send('<script type="text/javascript">alert("입력된 비밀번호가 서로 다릅니다."); document.location.href="/customer/edit";</script>');
        } else{
            db.query('UPDATE user SET name = ?, pw = ? , phone = ? , email = ? WHERE userId=?',[name,pw,phone,email,customerId], function(error,data) {
                if(error){
                    console.log(error);
                    throw(error)
                }else
                    db.query('SELECT * FROM user WHERE userId=?', [customerId], function(error, result) {
                        if(error) throw error;
                        req.session.user = result[0];
                    })
            });
            res.send('<script type="text/javascript">alert("정보가 수정되었습니다"); document.location.href="/customer/mypage";</script>');
        }
    } else {
        res.send('<script type="text/javascript">alert("모든 정보를 입력하세요"); history.back();</script>');    
    }
}
export const orderHistory = (req, res) => {
    const userId=req.session.user.userId;
    db.query('SELECT order.orderId, restaurant.restaurantName, `order`.time, menu.menuName, `order`.quantity, `order`.isConfirmed FROM (`order` INNER JOIN user ON `order`.userId = user.userId), restaurant, menu WHERE user.userId = ? AND `order`.restaurantId = restaurant.restaurantId AND `order`.menuId = menu.menuId',[userId],function(error,results,fields){
        if(error) throw(error);
        const orders=JSON.parse(JSON.stringify(results));
        console.log(orders);
        res.render("customer/orderhistory",{orders});
    });
}
export const ordered = (req, res) => {
    const orderId = req.params.orderId;
    db.query('SELECT restaurant.restaurantName, menu.menuName, menu.price,`order`.time, restaurant.phone, restaurant.address FROM restaurant inner join `order` on restaurant.restaurantId=`order`.restaurantId inner join menu on `order`.menuId=menu.menuId WHERE order.orderId = ? ', [orderId], function(error, results, fields){
        if(error) throw error;
        const order=JSON.parse(JSON.stringify(results[0]));
        console.log(order);
        res.render("customer/order",{order});
    });
}

export const reviewList = (req, res) => {
    const userId = req.session.user.userId;
    db.query('SELECT review.reviewId, review.stars, review.createdAt, review.comment, user.name FROM review, user WHERE user.userId = review.userId AND user.userId=?',[userId], function (error,result) {
        if(error) throw(error);
        const reviews = JSON.parse(JSON.stringify(result));
        console.log(reviews);
        res.render("customer/reviewList",{reviews});
    });
}
export const getAddReview = (req, res) => res.render("customer/addReview");
export const postAddReview = (req,res) => {
    const {stars, comment} = req.body;
    if(stars && comment){
        db.query('INSERT INTO review (stars,comment) VALUES (?,?)', [stars, comment], function(error, result) {
            if(error) throw error;
            return res.send('<script type="text/javascript">alert("리뷰 등록이 완료되었습니다!"); document.location.href="/customer/myreviews";</script>');
        });
    } else {
        return res.send('<script type="text/javascript">alert("리뷰 내용을 작성해주세요."); history.back();</script>');    
    }
}
export const deleteReview = (req, res) => {
    const reviewId = req.params.reviewId;
    db.query("DELETE FROM review WHERE review.reviewId = ?", [reviewId], function(error) {
        if(error) throw error;
    });
    return res.redirect("/customer/myreviews");
}


//장바구니
export const basket = (req, res) => {
    const restaurantId=req.params.id;
    const menuId=req.params.menuId;
    const userId=req.session.user.userId;
    console.log(restaurantId);
    console.log(menuId);
    console.log(userId);
    if(menuId&&userId){
        db.query('INSERT INTO basket (userId,menuId,restaurantId) VALUES(?,?,?)', [userId,menuId,restaurantId],function(error,results){
            if(error) throw error;
    
        });
        return res.send('<script type="text/javascript">alert("장바구니에 담겼습니다!"); if (confirm("주문 페이지로 이동할까요?") == true){document.location.href="/customer/basket";}else{history.back();}</script>');

        

    }else {
        return res.send('<script type="text/javascript">alert("장바구니에 다시 담아주세요."); history.back();</script>');    
    }
    
            
       
}
//장바구니 불러오기
export const basketList=(req,res)=>{
    const userId=req.session.user.userId;
    
    db.query('select menu.menuName,menu.price, count(basket.menuId) AS quantity,restaurant.restaurantName,restaurant.restaurantId from  basket inner join menu on basket.menuId=menu.menuId inner join restaurant on menu.restaurantId=restaurant.restaurantId where basket.userId=? group by basket.menuId', [userId],function(error,results){
        if(error) throw error;
        const baskets=JSON.parse(JSON.stringify(results));
        console.log(baskets);
        let pay=0;
        
        for(let i=0;i<baskets.length;i++){
            pay+=(baskets[i].price)*(baskets[i].quantity);
            
        }
        console.log(pay);
        res.render("customer/basket",{baskets,pay});
    });

    

}
//주문처리
export const order=(req,res)=>{
    const userId=req.session.user.userId;
    const restaurantId=req.params.id;
    db.query('SELECT menuId, userId, COUNT(menuId) AS quantity FROM basket GROUP BY menuId,userId',function(error,results){
        if(error) throw error;
        const isConfirmed=0;
        const orders=JSON.parse(JSON.stringify(results));
        console.log(orders);
         
        for(let i=0;i<orders.length;i++){
            if(userId==orders[i].userId){
                const menuId=orders[i].menuId;
                const quantity=orders[i].quantity;
                db.query('INSERT INTO `order` (userId,menuId,restaurantId,quantity,isConfirmed) VALUES(?,?,?,?,?)', [userId,menuId,restaurantId,quantity,isConfirmed],function(error,results){
                    if(error) throw error;
    
                });

            }
                   
        }
        return res.send('<script type="text/javascript">alert("주문 처리가 완료되었습니다!"); document.location.href="/";</script>');

    });
    
    
}
