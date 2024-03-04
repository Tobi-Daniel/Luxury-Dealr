import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 7000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());

// Serve static files from the "images" directory
app.use("/images", express.static(path.join(__dirname, "database", "images")));

app.get("/", (req, res) => {
  res.send("Api is ✔️ ");
});

app.use("/api", productRoutes);


app.use(notFound);
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`server is 🏃‍♂️ on port ${PORT}`);
});
