import e from "express";
import express from "express";
import PassportController from "../controller/controller.js";
import User from "../model/userModel.js";
const router = express.Router();


router.post("/register", PassportController.register);
router.post("/login", PassportController.login);


// Protected Route
router.get("/profile", PassportController.profile);

export default router;