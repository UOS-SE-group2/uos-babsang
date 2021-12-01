import express from "express";
import { getEditManager, getorderDetail, managerHome, orderConfirm, orderDenied, orderlist, postEditManager, postorderDetail, sales } from "../controllers/managerController";

const managerRoute = express.Router();

managerRoute.get("/", managerHome);
//managerRoute.route("/edit").get(getEditManager).post(postEditManager);
managerRoute.get("/sales", sales);
//managerRoute.get("/orderlist", orderlist);
managerRoute.route("/orderlist/:id").get(getorderDetail);
managerRoute.get("/orderlist/:id/confirmed", orderConfirm);
managerRoute.get("/orderlist/:id/denied", orderDenied);

export default managerRoute;