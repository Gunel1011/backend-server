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
//     name: "Saudi National Day Mug",
//     details: "Brewista Glass Server 400ml transparent",
//     price: 80,
//     productImage: "uploads/tea.png",
//     for_slide: false,
//   },
//   {
//     name: "Saudi National Day Mug",
//     details: "Brewista Glass Server 400ml transparent",
//     price: 80,
//     productImage: "uploads/coffe.png",
//     for_slide: false,
//   },
//   {
//     name: "ZeroHero Mini Ratio Scale",
//     details:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam, reprehenderit.",
//     price: 150,
//     productImage: "uploads/tr.png",
//     for_slide: false,
//   },
//   {
//     name: "Brewista Kettle-Matt White",
//     details: "Brewista Kettle-Matt White",
//     price: 480,
//     productImage: "uploads/teaPoat.png",
//     for_slide: false,
//   },
//   {
//     name: "ZeroHero Electric Portable Handheld Grinder",
//     details: "ZeroHero Electric Portable Handheld Grinder",
//     price: 560,
//     productImage: "uploads/glassDripper.png",
//     for_slide: false,
//   },
//   {
//     name: "Brewista Glass Dripper transparent ",
//     details: "Brewista Glass Dripper transparent ",
//     price: 85,
//     productImage: "uploads/dripper.png",
//     for_slide: false,
//   },
//   {
//     name: "Dhamad Valley Capsules",
//     details:
//       "Dhamad Valley offers a dark roast with a heavy body and a unique velvety texture.",
//     price: 85,
//     productImage: "uploads/capsul.png",
//     for_slide: false,
//   },
//   {
//     name: "Shahdan Valley Capsules",
//     details:
//       "Shahdan Valley brings together the richness of Saudi, Colombian, and Ethiopian coffee beans.",
//     price: 33,
//     productImage: "uploads/shandamCapsules.png",
//     for_slide: false,
//   },
//   {
//     name: "Razan Valley Capsules",
//     details:
//       "Jezan Valley combines coffee beans from the high mountains of Jazan with exceptional selections from Colombia and Ethiopia.",
//     price: 40,
//     productImage: "uploads/reaznCapsules.png",
//     for_slide: false,
//   },
//   {
//     name: "Peaks Collection (2)",
//     details: "Box contained mix of 3 Jazean blends :",
//     price: 168,
//     productImage: "uploads/peacks(1).png",
//     for_slide: false,
//   },
//   {
//     name: "Peaks Collection (1)",
//     details: "Box contained mix of 3 Jazean blends",
//     price: 178,
//     productImage: "uploads/peacks(1).png",
//     for_slide: false,
//   },
//   {
//     name: "Shaqra Mountain",
//     details:
//       "Shaqra Mountain blend is a combination of Saudi beans carefully selected from Jazan, and Harari beans from Ethiopia.",
//     price: 68,
//     productImage: "uploads/shaqra.png",
//     for_slide: true,
//   },
//   {
//     name: "Khayalah  Mountain",
//     details:
//       "Saudi coffee, harvested from the heights of the Jazan mountains in the Kingdom of Saudi Arabia.",
//     price: 107,
//     productImage: "uploads/shaqra.png",
//     for_slide: true,
//   },
//   {
//     name: "Jazaen Capsules Collection",
//     details:
//       "A curated selection of 6 packs of coffee capsules combining Saudi beans with premium global origins",
//     price: 194,
//     productImage: "uploads/jazaenCapsulesCollection.png",
//     for_slide: false,
//   },
//   {
//     name: "Watad Mountain",
//     details:
//       "Hand-picked with meticulous care by passionate local farmers, the 100% Khawalni beans embody the spirit of Jazan.",
//     price: 107,
//     productImage: "uploads/watadMountain.png",
//     for_slide: true,
//   },
//   {
//     name: "Faifa Mountain",
//     details:
//       "Faifa Mountain blend is a combination of Saudi coffee beans grown in the highest peaks of Jazan mountains and Costa Rican coffee beans",
//     price: 48,
//     productImage: "uploads/faifaMountain.png",
//     for_slide: true,
//   },
//   {
//     name: "Al Areef Mountain",
//     details:
//       "An exquisite blend of Saudi coffee beans from Jazan, and coffee beans from Papua New Guinea and Guatemala.",
//     price: 48,
//     productImage: "uploads/alAreefMountain.png",
//     for_slide: true,
//   },
//   {
//     name: "Tallan Mountain",
//     details:
//       "This exquisite blend combines the best of Saudi beans with those of the Agustino highlands in southern Colombia",
//     price: 58,
//     productImage: "uploads/tallanMountain.png",
//     for_slide: true,
//   },
//   {
//     name: "Al Majaz Mountain",
//     details:
//       "Picked with care from the highest peaks of Jazan mountains and blended with beans from Guatemala and Ethiopia.",
//     price: 92,
//     productImage: "uploads/alMajazMountain.png",
//     for_slide: true,
//   },
//   {
//     name: "Al Aswad Mountain",
//     details:
//       "A spectacular blend from the Saudi beans of Jazan s mountains and the beans of Chelchele in Ethiopia.",
//     price: 87,
//     productImage: "uploads/alAswadMountain.png",
//     for_slide: true,
//   },
//   {
//     name: "Al Ryith Mountain",
//     details:
//       "This blend is sourced from Jazan’s finest Saudi beans and Ethiopian beans",
//     price: 52,
//     productImage: "uploads/alRyithMountain.png",
//     for_slide: true,
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
