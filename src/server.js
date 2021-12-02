import express from "express";
import morgan from "morgan";
import rootRoute from "./server/pages/rootRoute";
import apiRoute from "./server/pages/apiRoute";
import customerRoute from "./server/pages/customerRoute";
import managerRoute from "./server/pages/managerRoute";
import session from "express-session";
import compression from "compression";
const FileStore = require("session-file-store")(session);
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;

const logger = morgan("dev");
app.use(express.urlencoded({extended:true}));
app.use(compression());
app.use(cookieParser())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // session 추가되면 session 폴더 안에 파일로 저장
    store:new FileStore(),
    cookie: {
      maxAge:3600000
    }
}));
app.set("views", process.cwd()+"/src/views");
app.set("view engine", "pug");
app.set("x-powered-by", "false");
app.use(logger);

app.use("/", rootRoute);
app.use("/api", apiRoute);
app.use("/customer", customerRoute);
app.use("/manager", managerRoute);

const handleListening = () => {
    console.log("Server Listening on http://localhost:5000/");
}
app.listen(PORT, handleListening);
