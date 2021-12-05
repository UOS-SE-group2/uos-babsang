import db from "../../db";

export const getLoginAsCustomer = (req, res) => {
    return res.render("login", {title: "고객 로그인"});
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




//구현 예정(건중님)
export const ordered = (req, res) => res.render("customer/order");


//장바구니
export const basket = (req, res) => res.render("customer/basket");

//결제
