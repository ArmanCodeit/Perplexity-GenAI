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

    const emailVerificationToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

    await sendVerificationEmail({
        to: email,
        subject: "Welcome to Perplexity - Verify your email",
        text: `Hi ${username} Thank you for registering with Perplexity.`,
        html: `
            <h1>Verify your email</h1>
            <p>Thank you for registering with <strong>Perplexity</strong>.</p>
            <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify your email</a>
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


export async function verifyEmail(req, res) {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Verification token is missing"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    if (user.verified) {
        return res.status(400).json({
            success: false,
            message: "User is already verified"
        });
    }

    user.verified = true;

    await user.save();

    const html = `<h1>Email Verified Successfully</h1>
    <p>Thank you for verifying your email. You can now log in to your account.</p>`

    res.send(html);
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    if(!user.verified) {
        return res.status(400).json({
            success: false,
            message: "Please verify your email before logging in"
        });
    }


    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid password"
        });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token);

    res.json({
        success: true,
        message: "User logged in successfully",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            verified: user.verified,
        },
        token
    });
}

export async function getMe(req, res) {
    const user = await userModel.findById(req.user.id);

    if(!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            verified: user.verified
        }
    }); 
}