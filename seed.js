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

const products = [
  {
    name: "Jazean coffee",
    details: "shot-desc text-center mb-0 overflow-hidden",
    price: 34,
    productImage: "uploads/coffe_1.png",
    for_slide: false,
  },
  {
    name: "Jazean coffee",
    details: "shot-desc text-center mb-0 overflow-hidden",
    price: 50,
    productImage: "uploads/coffe_2.png",
    for_slide: false,
  },
  {
    name: "Jazean coffee",
    details: "shot-desc text-center mb-0 overflow-hidden",
    price: 100,
    productImage: "uploads/coffe_3.png",
    for_slide: false,
  },
  {
    name: "Jazean coffee",
    details: "shot-desc text-center mb-0 overflow-hidden",
    price: 120,
    productImage: "uploads/coffe_4.png",
    for_slide: false,
  },
];

const seedDatabase = async () => {
  try {
    // await User.deleteMany();
    await Product.deleteMany();

    // await User.insertMany(users);
    await Product.insertMany(products);

    console.log("✅ Məlumatlar MongoDB - yə əlavə olundu !");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Xəta baş verdi:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
