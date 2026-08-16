import express from "express";
import cookieParser from "cookie-parser";   
import authRoutes from "./routes/auth.routes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export default app;