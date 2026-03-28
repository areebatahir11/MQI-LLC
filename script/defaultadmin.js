//script/defaultadmin.js
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../src/models/admin.js";

async function createAdmin() {
  try {
    console.log("Mongo URI:", process.env.MONGODB_URI);

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const existing = await Admin.findOne({ email: "admin@mqi.com" });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await Admin.create({
      email: "admin@mqi.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully");

    process.exit();

  } catch (err) {
    console.log("Error:", err);
    process.exit(1);
  }
}

createAdmin();