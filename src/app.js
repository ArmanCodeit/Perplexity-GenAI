import express from "express";
import cookieParser from "cookie-parser";   

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

import authRoutes from "./routes/auth.routes.js";

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export default app;