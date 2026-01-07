const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const mongoose = require("mongoose");
const path = require("path"); // 1. BU SƏTİRİ ƏLAVƏ ETDİK
require("dotenv").config();

const app = express();

// MongoDB Connection Handling for Serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    const db = await mongoose.connect(mongoURI);

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB - yə bağlandı");
  } catch (err) {
    console.error("❌ MongoDB bağlantı xətası:", err.message);
    // process.exit(1); // Serverless mühitdə prosesi öldürmürük, xətanı tuturuq
    throw err;
  }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({
      error: "Verilənlər bazasına qoşulma xətası",
      details: error.message
    });
  }
});

// 1. Request Logging (Vercel Loglarında görmək üçün)
app.use((req, res, next) => {
  console.log(`📨 [${req.method}] ${req.url} | Origin: ${req.headers.origin}`);
  next();
});

// 2. Sadələşdirilmiş CORS (Debug üçün)
const allowedOrigins = [
  "https://jazeancoffee-clone-admin-panel.vercel.app",
  "https://jazeancoffee-clone-admin-panel.vercel.app/",
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// 3. Test route (Serverin işlədiyini yoxlamaq üçün)
app.get("/", (req, res) => {
  res.send("Backend Server İşləyir! 🚀");
});

// 2. BU HİSSƏNİ DƏYİŞDİRDİK (Yolu mütləq olaraq təyin etdik)
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Backend server ${PORT} portunda işləyir.`);
});

module.exports = app;