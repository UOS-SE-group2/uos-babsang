import express from "express";
import {home, getLogin, search, restaurant, getCategory, logout, getJoin} from "../controllers/homeController";

const rootRoute = express.Router();

rootRoute.get("/", home);
rootRoute.route("/login").get(getLogin);
rootRoute.get("/join", getJoin);



rootRoute.get("/category/:id([1-5])", getCategory);
rootRoute.post("/search", search);
rootRoute.get("/restaurant/:id", restaurant);
rootRoute.get("/logout", logout);

export default rootRoute;
