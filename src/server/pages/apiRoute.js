import express from "express";
import { orderConfirm, orderDenied } from "../controllers/managerController";

const apiRoute = express.Router();

apiRoute.post("/manager/orderlist/:id/confirmed", orderConfirm);
apiRoute.post("/manager/orderlist/:id/denied", orderDenied);

export const apiRoute;