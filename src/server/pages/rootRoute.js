import express from "express";
import {home, getLogin, search, restaurant, getCategory, logout} from "../controllers/homeController";
import { getJoinAsCustomer, postJoinAsCustomer } from "../controllers/customerController";
import { getJoinAsManager, postJoinAsManager } from "../controllers/managerController";

const rootRoute = express.Router();

rootRoute.get("/", home);
rootRoute.get("/category/:id([1-5])", getCategory);
rootRoute.route("/login").get(getLogin);
rootRoute.route("/join_as_customer").get(getJoinAsCustomer).post(postJoinAsCustomer);
//rootRoute.route("/join_as_manager").get(getJoinAsManager).post(postJoinAsManager);
rootRoute.get("/search", search);
rootRoute.get("/restaurant/:id", restaurant);
rootRoute.get("/logout", logout);

export default rootRoute;