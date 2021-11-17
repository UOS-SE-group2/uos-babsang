//회원가입
export const getJoinAsManager = (req, res) => res.render("manager/join");
//구현해야함
//export const postJoinAsManager = 

//매니저 홈화면
export const managerHome = (req, res) => res.render("manager/home");

//매장정보 수정
export const getEditManager = (req, res) => res.render("manager/editStore");
//export const postEditManager =

//매출화면
export const sales = (req, res) => res.render("manager/sales");

//주문들어온 내역확인
export const orderlist = (req, res) => res.render("manager/orderlist");
//주문상세
export const getorderDetail = (req, res) => res.render("manager/orderDetail");
//구현해야함
//export const postorderDetail = (req, res) =>