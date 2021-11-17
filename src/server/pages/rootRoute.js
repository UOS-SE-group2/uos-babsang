import express from "express";
import {home, getLogin, postLogin, search, restaurant} from "../controllers/homeController";
import { getJoinAsCustomer, postJoinAsCustomer } from "../controllers/customerController";
import { getJoinAsManager, postJoinAsManager } from "../controllers/managerController";

const rootRoute = express.Router();

rootRoute.get("/", home);
rootRoute.route("/login").get(getLogin).post(postLogin);
rootRoute.route("/join_as_customer").get(getJoinAsCustomer).post(postJoinAsCustomer);
rootRoute.route("/join_as_manager").get(getJoinAsManager).post(postJoinAsManager);
rootRoute.get("/search", search);
rootRoute.get("/restaurant/:id", restaurant);

export default rootRoute;