import { Router } from "express";
import { registerValidator, validate } from "../validators/auth.validators.js";
import { registerUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, validate, registerUser);

export default authRouter;