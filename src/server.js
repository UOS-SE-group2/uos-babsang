import express from "express";
import morgan from "morgan";
import rootRoute from "./server/pages/rootRoute";
import customerRoute from "./server/pages/customerRoute";
import managerRoute from "./server/pages/managerRoute";

const app = express();
const PORT = 5000;

const logger = morgan("dev");

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