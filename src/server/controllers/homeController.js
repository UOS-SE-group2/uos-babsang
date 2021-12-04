import db from "../../db";

//홈 화면 for customer
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
    db.query(`SELECT restaurant.imageurl, restaurant.restaurantName, restaurant.star FROM category INNER JOIN restaurant ON category.categoryId=restaurant.categoryId WHERE category.categoryName=${categoryId}`, function (error, results, fields) {
        if(error) {
            return res.status(400).render("error");
        }
        const restaurants = results;
        return res.render("home", {restaurants, categoryId});
    });
}

//로그인 화면
export const getLogin = (req, res) => res.render("login_select");

//검색된 화면
export const search = (req, res) => res.render("search");

//특정 가게 화면
export const restaurant = (req, res) => res.render("restaurant");

export const logout = (req, res) => {
    req.session.destory();
    return res.redirect("/");
}
