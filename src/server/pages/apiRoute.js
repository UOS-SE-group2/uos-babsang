import express from "express";
import { orderConfirm, orderDenied } from "../controllers/managerController";
import { deleteReview } from "../controllers/customerController";

const apiRoute = express.Router();

apiRoute.post("/manager/orderlist/:id/confirmed", orderConfirm);
apiRoute.post("/manager/orderlist/:id/denied", orderDenied);
apiRoute.get("/customer/myreviews/:reviewId", deleteReview);

export default apiRoute;
