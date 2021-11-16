import express from "express";
import {home, getLogin, postLogin, getJoinAsCustomer, getJoinAsCustomer, getJoinAsManager, postJoinAsManager, search, restaurant} from "../controllers/homeController";

const rootRoute = express.Router();

rootRoute.get("/", home);
rootRoute.route("/login").get(getLogin).post(postLogin);
rootRoute.route("/join_as_customer").get(getJoinAsCustomer).post(postJoinAsCustomer);
rootRoute.route("/join_as_manager").get(getJoinAsManager).post(postJoinAsManager);
rootRoute.get("/search", search);
rootRoute.get("/:id", restaurant);

export default rootRoute;