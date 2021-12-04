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
                req.session.user = results;
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






//마이페이지
export const customerPage = (req, res) => res.render("customer/profile");

//내정보 수정
export const getEditCustomer = (req, res) => res.render("customer/editProfile");
//구현해야함
//export const postEditCustomer = 

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