import express from "express";
import {customerPage, getEditCustomer, postEditCustomer, orderhistory, ordered, getpostingReview, postpostingReview, reviewList} from "../controllers/customerController";

const customerRoute = express.Router();

customerRoute.get("/:id", customerPage);
customerRoute.route("/:id/edit").get(getEditCustomer).post(postEditCustomer);
customerRoute.get("/orderhistory", orderhistory);
customerRoute.get("orderhistory/:id", ordered);
customerRoute.route("orderhistory/:id/posting_review").get(getpostingReview).post(postpostingReview);
customerRoute.get("/myreviews", reviewList);

//리뷰 상세보기 및 수정기능도 추가할거면
//customerRoute.get("/myreviews/:id");
//customerRoute.route("/myreviews/:id/edit").get(getEditReview).post(postEditReview);
//customerRoute.get("/myreviews/:id/deleteReview");


export default customerRoute;