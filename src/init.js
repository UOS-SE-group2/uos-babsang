import "regenerator-runtime";


import app from "./server";

const PORT = 5000;

const handleListening = () => {
    console.log("Server Listening on http://localhost:5000/");
}
app.listen(PORT, handleListening);