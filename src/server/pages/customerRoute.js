import express from "express";
import {customerPage, getEditCustomer, postEditCustomer, orderHistory, ordered, reviewList, basket,getLoginAsCustomer, postLoginAsCustomer, getJoinAsCustomer, postJoinAsCustomer, getAddReview, postAddReview} from "../controllers/customerController";

const customerRoute = express.Router();

customerRoute.route("/login").get(getLoginAsCustomer).post(postLoginAsCustomer);
customerRoute.route("/join").get(getJoinAsCustomer).post(postJoinAsCustomer);
customerRoute.get("/mypage", customerPage);
customerRoute.route("/edit").get(getEditCustomer).post(postEditCustomer);
customerRoute.get("/orderhistory", orderHistory);
customerRoute.get("/myreviews", reviewList);
customerRoute.route("/orderhistory/:id/addreview").get(getAddReview).post(postAddReview);





customerRoute.get("/orderhistory/:id", ordered);
customerRoute.get("/basket", basket);
//customerRoute.route("/:id/basket/:id/payment").get(getPayment).post(postPayment);
//리뷰 상세보기 및 수정기능도 추가할거면
//customerRoute.get("/myreviews/:id");
//customerRoute.get("/myreviews/:id/deleteReview");


export default customerRoute;
