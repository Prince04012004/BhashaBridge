import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import translateroutes from "./routes/translateroutes.js";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/translate', translateroutes);

// Middleware



// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Bhasha Bridge backend is running ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});