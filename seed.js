const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("./models/user");
const Product = require("./models/product");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB - yə bağlanmağa çalışır...");
  })
  .catch((err) => {
    console.error("❌ MongoDB - yə bağlanma zamanı xəta:", err);
  });

// const users = [
//   {
//     name: "Admin",
//     surname: "User",
//     email: "admin@example.com",
//     password: bcrypt.hashSync("admin123", 10),
//     role: "admin",
//   },
// ];

// const products = [
//   {
//     name: "Jazean Clone",
//     details: "Jazean Clone",
//     price: 0,
//     productImage: "uploads/jazean.png",
//     for_slide: false,
//   },
//   {
//     name: "Avo Clone",
//     details: "Avo Clone",
//     price: 0,
//     productImage: "uploads/avo.png",
//     for_slide: false,
//   },
//   {
//     name: "Caviar Clone",
//     details: "Caviar Clone",
//     price: 0,
//     productImage: "uploads/caviar.png",
//     for_slide: false,
//   },
//   {
//     name: "Clark Clone",
//     details: "Clark Clone",
//     price: 0,
//     productImage: "uploads/clark.png",
//     for_slide: false,
//   },
//   {
//     name: "Oneder Clone",
//     details: "OneDer Clone",
//     price: 0,
//     productImage: "uploads/oneder.png",
//     for_slide: false,
//   },
//   {
//     name: "Passport Clone",
//     details: "Passport Clone",
//     price: 0,
//     productImage: "uploads/passport.png",
//     for_slide: false,
//   },
//   {
//     name: "World telecom Clone",
//     details: "World telecom Clone",
//     price: 0,
//     productImage: "uploads/world-telecom.png",
//     for_slide: false,
//   },
// ];

const seedDatabase = async () => {
  try {
    // await User.deleteMany();
    // await Product.deleteMany();

    // await User.insertMany(users);
    // await Product.insertMany(products);

    console.log("✅ Məlumatlar MongoDB - yə əlavə olundu !");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Xəta baş verdi:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
