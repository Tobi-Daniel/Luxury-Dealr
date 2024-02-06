import express from 'express';
import dotenv from 'dotenv';
import {
  categories,
  vrHeadsets,
  homeElectronics,
} from "./database/categories.js";
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import connectDB from './config/db.js';



dotenv.config()

connectDB();

const PORT = process.env.PORT 


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());

// Serve static files from the "images" directory
app.use("/images", express.static(path.join(__dirname, "database", "images")));


app.get("/", (req, res) => {
    res.send("Api is ✔️ ")
})

// Endpoint to fetch all categories
app.get("/api/categories", (req, res) => { 
    res.json(categories)
})

// Endpoint to fetch all VR headsets
app.get("/api/vr-headsets", (req, res) => {
    res.json(vrHeadsets)
})

// Endpoint to fetch a specific VR headset
app.get("/api/vr-headsets/:name", (req, res) => {
    const name = req.params.name
    const vrHeadset = vrHeadsets.find(headset => headset.name === name)
    if (vrHeadset) {
        res.json(vrHeadset)
    } else {
        res.status(404).send({ message: 'Product not found' })
    }
})

// Endpoint to fetch all Home Electronics
app.get("/api/home-electronics", (req, res) => { 
    res.json(homeElectronics)
})

// Endpoint to fetch homeElectronics data
app.get("/api/categories/home-electronics", (req, res) => {
  const category = categories.find((c) => c.name === 'home-electronics');
  if (category) {
    res.json(category);
  } else {
    res.status(404).send({ message: "Category not found" });
  }
});



app.listen(PORT, () => {
    console.log(`server is 🏃‍♂️ on port ${PORT}`);
})