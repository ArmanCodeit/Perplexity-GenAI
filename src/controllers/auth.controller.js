 import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../services/mail.service.js";

export async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });
    
    if (isUserAlreadyExists) {
        return res.status(400).json({
            success: false,
            message: "User already exists with this email and username"
        });
    }

    const user = await userModel.create({ username, email, password });

    const token = jwt.sign({ email }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });

    await sendVerificationEmail({
        to: email,
        subject: "Welcome to Perplexity - Verify your email",
        text: `Hi ${username} Thank you for registering with Perplexity. Click on the link to verify your email: http://localhost:3000/verify/${token}`,
        html: `
            <h1>Hi ${username} Verify your email</h1>
            <p>Thank you for registering with <strong>Perplexity</strong>. Click on the link to verify your email: http://localhost:3000/verify/${token}</p>
            <p>Regards,</p>
            <p><strong>Perplexity Team</strong></p>`
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            verified: user.verified,
        }
    });
}