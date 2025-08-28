import express from "express";
import dotenv from "dotenv";
import Database from "./app/config/Database.js";
import router from "./app/routes/routes.js";
import session from "express-session";
import passport from "passport";
dotenv.config();
const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to the database
Database();

app.get("/", (req, res) => {
    res.send("Home Page !");
})
app.use(router);


const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

