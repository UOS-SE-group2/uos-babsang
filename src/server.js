import express from "express";
import morgan from "morgan";
import rootRoute from "./server/pages/rootRoute";
import customerRoute from "./server/pages/customerRoute";
import managerRoute from "./server/pages/managerRoute";
/*const bodyParser = require('body-parser');
const session = require('express-session')
const compression = require('compression');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser')*/

const app = express();
const PORT = 5000;

const logger = morgan("dev");
/*app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());
app.use(cookieParser())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // session 추가되면 session 폴더 안에 파일로 저장
    store:new FileStore()
  }))
app.use(express.static('views')); //html 파일 렌더링*/
app.set("views", process.cwd()+"/src/views");
app.set("view engine", "pug");
app.set("x-powered-by", "false");
app.use(logger);

app.use("/", rootRoute);
app.use("/customer", customerRoute);
app.use("/manager", managerRoute);

const handleListening = () => {
    console.log("Server Listening");
}
app.listen(PORT, handleListening);
