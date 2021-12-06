import express from "express";
import {home, getLogin, search, restaurant, getCategory, logout, getJoin} from "../controllers/homeController";

const rootRoute = express.Router();

rootRoute.get("/", home);
rootRoute.get("/category/:id([1-6])", getCategory);
rootRoute.get("/login", getLogin);
rootRoute.get("/join", getJoin);
rootRoute.get("/logout", logout);
rootRoute.post("/search", search);
rootRoute.get("/restaurant/:restaurantId", restaurant);

export default rootRoute;
