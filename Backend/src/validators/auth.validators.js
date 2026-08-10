import { body, validationResult } from "express-validator";

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const registerValidator = [
    body("username")
        .isString().withMessage("Username must be a string")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("email")
        .isEmail().withMessage("Email must be a valid email"),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    validate
];

export const loginValidator = [
    body("email")
        .trim()
        .isEmail().withMessage("Email must be a valid email")
        .notEmpty().withMessage("Email is required"),

    body("password")
        .notEmpty().withMessage("Password is required"),

    validate
];