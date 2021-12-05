import db from "../../db";

export const home = (req, res) => {
    db.query("SELECT imageurl, restaurantName, star FROM restaurant", function(error, results, fields) {
        if(error) {
            return res.status(400).render("error");
        }
        const restaurants = results;
        return res.render("home", {restaurants, catagoryId: 0});
    })
}
export const getCategory = (req, res) => {
    const categoryId = req.params.id;
    db.query('SELECT imageurl, restaurantName, star FROM restaurant WHERE categoryId=?',[categoryId], function (error, results, fields) {
        if(error) {
            return res.status(400).render("error");
        }
        const restaurants = results;
        return res.render("home", {restaurants, categoryId});
    });
}
export const getLogin = (req, res) => res.render("login_select");
export const getJoin = (req, res) => res.render("join_select");




//검색된 화면
export const search = (req, res) => {
    const {restaurantName}=req.body;
    console.log(restaurantName);
    if (restaurantName) {

        db.query('SELECT * FROM restaurant WHERE restaurantName= ?', [restaurantName], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                const restaurantId=results[0].restaurantId;
                console.log(restaurantId);
                res.render("restaurant",{restaurantId});
            } else {         
                res.status(400).send('<script type="text/javascript">alert("검색 정보가 없습니다."); document.location.href="/";</script>');    
            }            
        });
    } else {        
        res.send('<script type="text/javascript">alert("검색어를 입력하세요!"); document.location.href="/";</script>');    
        res.redirect("/");
    }
    
}

//특정 가게 화면
export const restaurant = (req, res) => {
    const id=req.params.id;
    console.log(id);
    db.query('SELECT * FROM restaurant WHERE restaurantId= ?', [id], function(error, results, fields){
        if(error) throw error;
        
        if(results){
            const restaurant=JSON.parse(JSON.stringify(results));
            db.query('SELECT * FROM menu WHERE restaurantId= ?', [id], function(error, results1, fields){
                if(error) throw error;
                if(results1){
                    const menus=JSON.parse(JSON.stringify(results1));
                    db.query('SELECT * FROM review WHERE restaurantId= ?', [id], function(error, results2, fields){
                        if(error) throw error;
                        const reviews=JSON.parse(JSON.stringify(results2));
                        res.render("restaurant",[restaurant,menus,reviews]);

                    });
                }

            });

        }
    });
    
}

export const logout = (req, res) => {
    req.session.destory();
    return res.redirect("/");
}
