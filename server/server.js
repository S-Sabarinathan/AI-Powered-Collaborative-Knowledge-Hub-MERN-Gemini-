// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import gdocRoutes from "./routes/docs.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/geminidocs", gdocRoutes);

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // ✅ Auto-create admin if not exists
    const adminEmail = "admin@example.com";
    const adminPassword = "Admin@123";

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        name: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Default admin created:", adminEmail, adminPassword);
    }

    app.listen(5000, () =>
      console.log("Server running on http://localhost:5000")
    );
  })
  .catch((err) => console.log(err));
