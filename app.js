const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      console.error("❌ MONGODB_URI environment variable təyin edilməyib!");
      console.error(
        "📌 Render Dashboard → Environment → Environment Variables bölməsində MONGODB_URI əlavə edin"
      );
      process.exit(1);
    }

    if (
      !mongoURI.startsWith("mongodb://") &&
      !mongoURI.startsWith("mongodb+srv://")
    ) {
      console.error("❌ MONGODB_URI düzgün formatda deyil!");
      console.error(
        "📌 MongoDB connection string 'mongodb://' və ya 'mongodb+srv://' ilə başlamalıdır"
      );
      console.error(`📌 Cari dəyər: ${mongoURI.substring(0, 20)}...`);
      process.exit(1);
    }

    console.log("⏳ MongoDB - yə bağlanmağa çalışır...");
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB - yə bağlandı");
  } catch (err) {
    console.error("❌ MongoDB bağlantı xətası:", err.message);
    console.error("📌 MongoDB URI-nin düzgün olduğunu yoxlayın");
    process.exit(1);
  }
};
connectDB();

const app = express();
app.use(
  cors({
    origin: "*", // Müvəqqəti olaraq hər yerə icazə veririk
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `Backend server http://localhost:${PORT} ünvanında başladıldı.\nDeveloper: Tərlan Əlicanov`
  );
});

module.exports = app;
