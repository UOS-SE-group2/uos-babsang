import db from "../../db";

//홈 화면 for customer
export const home = (req, res) => {
    //모든 식당 정보 load
    return res.render("home");
}
//로그인 화면
export const getLogin = (req, res) => res.render("login");

export const postLogin = (req, res) => {
    const {id, pw} = req.body;
    
    if (id && pw) {

        db.query('SELECT * FROM user WHERE id=? AND pw = ?', [id, pw], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                req.session.is_logined = true;
                req.session.id = id;
                res.redirect('/');
                res.end();
            } else {              
                res.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>');    
            }            
        });
    } else {        
        res.send('<script type="text/javascript">alert("id와 password를 입력하세요!"); document.location.href="/login";</script>');    
        res.end();
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