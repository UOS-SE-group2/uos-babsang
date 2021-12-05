import express from "express";
import { orderConfirm, orderDenied, deleteMenu } from "../controllers/managerController";
import { deleteReview } from "../controllers/customerController";
import { basket,order } from "../controllers/customerController";
const apiRoute = express.Router();

apiRoute.post("/manager/orderlist/:id/confirmed", orderConfirm);
apiRoute.post("/manager/orderlist/:id/denied", orderDenied);
apiRoute.get("/customer/myreviews/:reviewId", deleteReview);
apiRoute.get("/api/manager/addmenus/:menuId/delete", deleteMenu);
apiRoute.get("/restaurant/:id/:menuId",basket);
apiRoute.get("/order/:id",order);
export default apiRoute;
