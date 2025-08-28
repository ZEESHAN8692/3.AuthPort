import e from "express";
import express from "express";
import PassportController from "../controller/controller.js";
const router = express.Router();


router.post("/register", PassportController.register);
router.post("/login", PassportController.login);

export default router;