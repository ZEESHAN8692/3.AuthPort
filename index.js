import express from "express";
import dotenv from "dotenv";
import Database from "./app/config/Database.js";
import router from "./app/routes/routes.js";
dotenv.config();
const app = express();


app.use(express.json());

// Connect to the database
Database();

app.get("/", (req, res) => {
    res.send("Home Page !");
})
app.use("/api",router);


const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

