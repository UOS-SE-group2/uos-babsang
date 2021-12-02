import db from "../../db";

//홈 화면 for customer
export const home = (req, res) => {
    const restaurants = [{restaurantname: "one"}];
    return res.render("home", {restaurants, catagoryId: 0});
}

export const getCatagory = (req, res) => {
    const restaurants = null;
    const catagoryId = req.params.id;
    return res.render("home", {restaurants, catagoryId});
}

//로그인 화면
export const getLogin = (req, res) => res.render("login");

export const postLogin = (req, res) => {
    const {id, pw} = req.body;
    
    if (id && pw) {

        db.query('SELECT * FROM user WHERE id=? AND pw = ?', [id, pw], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                console.log(results);
                req.session.loggedIn = true;
                req.session.user = results;
                console.log(req.session);
                return res.redirect("/");
            } else {         
                res.status(400).send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>');    
            }            
        });
    } else {        
        res.send('<script type="text/javascript">alert("id와 password를 입력하세요!"); document.location.href="/login";</script>');    
        res.redirect("/login");
    }
}

//검색된 화면
export const search = (req, res) => res.render("search");

//특정 가게 화면
export const restaurant = (req, res) => res.render("restaurant");

export const logout = (req, res) => {
    req.session.destory();
    return res.redirect("/");
}