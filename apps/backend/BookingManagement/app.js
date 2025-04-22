const express = require("express");
const mongoose = require("mongoose");
const bookingRoutes = require("./src/presentation/routes");

const app = express();
const MONGO_URI = "mongodb+srv://Cluster76516:WGtse3VmfVZx@cluster76516.zzq9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster76516"; // or Atlas URI

app.use(express.json());
app.use("", bookingRoutes);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");
        app.listen(3000, () => console.log("🚀 Booking Service running at http://localhost:3000"));
    })
    .catch(err => console.error("❌ MongoDB connection error:", err));