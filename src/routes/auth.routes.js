import { Router } from "express";
import { registerValidator, validate,loginValidator } from "../validators/auth.validators.js";
import { registerUser, verifyEmail, loginUser,getMe } from "../controllers/auth.controller.js";
import  { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();


/**
 * @route POST /api/auth/register
 * @desc register a new user
 * @access Public
 * @body { username, email, password }
 */
authRouter.post("/register", registerValidator, validate, registerUser);

/**
 * @route GET /api/auth/login
 * @desc login a user
 * @access Public
 * @body { email, password }
 */
authRouter.post("/login", loginValidator, validate, loginUser);


/**
 * @route GET /api/auth/get-me
 * @desc get the logged in user details
 * @access Private
 */
authRouter.get("/get-me", authUser, getMe);


/**
 * @route GET /api/auth/verify-email
 * @desc verify email of a user
 * @access Public
 * @query { token }
 */
authRouter.get("/verify-email", verifyEmail);

export default authRouter;