import express from "express";
import {customerPage, getEditCustomer, postEditCustomer, orderhistory, ordered, getpostingReview, postpostingReview, reviewList, basket, getPayment, postPayment} from "../controllers/customerController";

const customerRoute = express.Router();

customerRoute.get("/:id", customerPage);
//customerRoute.route("/edit").get(getEditCustomer).post(postEditCustomer);
customerRoute.get("/orderhistory", orderhistory);
customerRoute.get("orderhistory/:id", ordered);
//customerRoute.route("orderhistory/:id/posting_review").get(getpostingReview).post(postpostingReview);
customerRoute.get("/myreviews", reviewList);
//장바구니는 좀더 고민
customerRoute.get("/basket", basket);
//customerRoute.route("/:id/basket/:id/payment").get(getPayment).post(postPayment);
//리뷰 상세보기 및 수정기능도 추가할거면
//customerRoute.get("/myreviews/:id");
//customerRoute.route("/myreviews/:id/edit").get(getEditReview).post(postEditReview);
//customerRoute.get("/myreviews/:id/deleteReview");


export default customerRoute;