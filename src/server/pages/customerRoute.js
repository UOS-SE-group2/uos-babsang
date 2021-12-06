import express from "express";
import {customerPage, getEditCustomer, postEditCustomer, orderHistory, ordered, reviewList, basketList,getLoginAsCustomer, postLoginAsCustomer, getJoinAsCustomer, postJoinAsCustomer, getAddReview, postAddReview} from "../controllers/customerController";

const customerRoute = express.Router();

customerRoute.route("/login").get(getLoginAsCustomer).post(postLoginAsCustomer);
customerRoute.route("/join").get(getJoinAsCustomer).post(postJoinAsCustomer);
customerRoute.get("/mypage", customerPage);
customerRoute.route("/edit").get(getEditCustomer).post(postEditCustomer);
customerRoute.get("/orderhistory", orderHistory);
customerRoute.get("/myreviews", reviewList);
customerRoute.route("/orderhistory/:id/addreview").get(getAddReview).post(postAddReview);
customerRoute.get("/orderhistory/:orderId", ordered);




customerRoute.get("/basket", basketList);


export default customerRoute;
