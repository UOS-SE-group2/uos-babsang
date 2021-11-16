
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