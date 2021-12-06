import express from "express";
import { getAddMenus, getEditManager, getJoinAsManager, getLoginAsManager, getorderDetail, managerHome, orderConfirm, orderDenied, getOrderList, postAddMenus, postEditManager, postJoinAsManager, postLoginAsManager, postorderDetail, sales } from "../controllers/managerController";

const managerRoute = express.Router();

managerRoute.route("/login").get(getLoginAsManager).post(postLoginAsManager);
managerRoute.get("/", managerHome);
managerRoute.route("/join").get(getJoinAsManager).post(postJoinAsManager);



managerRoute.route("/addmenus").get(getAddMenus).post(postAddMenus);
managerRoute.route("/edit").get(getEditManager).post(postEditManager);
managerRoute.get("/orderlist", getOrderList);
managerRoute.route("/orderlist/:id").get(getorderDetail);
managerRoute.get("/orderlist/:id/confirmed", orderConfirm);
managerRoute.get("/orderlist/:id/denied", orderDenied);

export default managerRoute;