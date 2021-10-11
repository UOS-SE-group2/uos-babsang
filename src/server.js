import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 5000;

const logger = morgan("dev");

app.set("views", process.cwd()+"/src/views");
app.set("view engine", "pug");
app.set("x-powered-by", "false");
app.use(logger);

const handleListening = () => {
    console.log("Server Listening");
}
app.listen(PORT, handleListening);