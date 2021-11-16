//홈 화면
export const home = (req, res) => res.render("home");

//로그인 화면
export const getLogin = (req, res) => res.render("login");
/*추가해야함 */
//export const postLogin = (req, res) => res.redirect("/");

//회원가입
export const getJoinAsCustomer = (req, res) => res.render("customer/join");
//구현해야함
//export const postJoinAsCustomer = 
export const getJoinAsManager = (req, res) => res.render("manager/join");
//구현해야함
//export const postJoinAsManager = 

//검색된 화면
export const search = (req, res) => res.render("search");

//특정 가게 화면
export const restaurant = (req, res) => res.render("restaurant");