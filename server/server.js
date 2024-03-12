import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import passport from "./utils/passport.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 7000;

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
);


app.use(cookieParser());
passport(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "images" directory
app.use("/images", express.static(path.join(__dirname, "database", "images")));

app.get("/", (req, res) => {
  res.send("Api is ✔️ ");
});

app.use("/api", productRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is 🏃‍♂️ on port ${PORT}`);
});
