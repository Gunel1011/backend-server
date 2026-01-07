const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const mongoose = require("mongoose");
const path = require("path"); // 1. BU SƏTİRİ ƏLAVƏ ETDİK
require("dotenv").config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error("❌ MONGODB_URI təyin edilməyib!");
      process.exit(1);
    }
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB - yə bağlandı");
  } catch (err) {
    console.error("❌ MongoDB bağlantı xətası:", err.message);
    process.exit(1);
  }
};
connectDB();

const app = express();

app.use(
  cors({
    origin: "*", // Bütün domainlərə icazə verir (production-da dəqiq domain yazın)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200
  })
);

// Preflight sorğularını idarə et
app.options("*", cors());
app.use(bodyParser.json());

// 2. BU HİSSƏNİ DƏYİŞDİRDİK (Yolu mütləq olaraq təyin etdik)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Backend server ${PORT} portunda işləyir.`);
});

module.exports = app;