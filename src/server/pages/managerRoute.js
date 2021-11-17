import express from "express";
import { getEditManager, getorderDetail, managerHome, orderlist, postEditManager, postorderDetail, sales } from "../controllers/managerController";

const managerRoute = express.Router();

managerRoute.get("/", managerHome);
managerRoute.route("/edit").get(getEditManager).post(postEditManager);
managerRoute.get("./sales", sales);
managerRoute.get("./orderlist", orderlist);
managerRoute.route("./orderlist/:id").get(getorderDetail).post(postorderDetail);

export default managerRoute;