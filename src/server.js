import express from "express";
import morgan from "morgan";
import rootRoute from "./server/pages/rootRoute";
import apiRoute from "./server/pages/apiRoute";
import customerRoute from "./server/pages/customerRoute";
import managerRoute from "./server/pages/managerRoute";
import session from "express-session";
import compression from "compression";
import { localsMiddleware } from "./middlewares";
const cookieParser = require('cookie-parser');
const path = require("path");

const app = express();

const logger = morgan("dev");
app.use(express.urlencoded({extended:true}));
app.use(compression());
app.use(cookieParser())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // session 추가되면 session 폴더 안에 파일로 저장
    cookie: {
      maxAge:3600000
    }
}));
app.set("views", process.cwd()+"/src/views");
app.set("view engine", "pug");
app.set("x-powered-by", "false");
app.use(logger);


app.use(localsMiddleware);
app.use("/dist", express.static("dist"));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", rootRoute);
app.use("/api", apiRoute);
app.use("/customer", customerRoute);
app.use("/manager", managerRoute);

export default app;
