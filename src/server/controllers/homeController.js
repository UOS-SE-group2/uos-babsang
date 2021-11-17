//홈 화면
export const home = (req, res) => res.render("home");

//로그인 화면
export const getLogin = (req, res) => res.render("login");
/*추가해야함 */
//export const postLogin = (req, res) => res.redirect("/");

//검색된 화면
export const search = (req, res) => res.render("search");

//특정 가게 화면
export const restaurant = (req, res) => res.render("restaurant");