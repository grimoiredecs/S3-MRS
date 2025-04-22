const express = require("express");
const mongoose = require("mongoose");
const bookingRoutes = require("./src/presentation/routes");
MONGO_URI="mongodb+srv://Cluster76516:WGtse3VmfVZx@cluster76516.zzq9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster76516"

const app = express();
app.use(express.json());
app.use("/api", bookingRoutes);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(3000, () => console.log("Booking Service running on port 3000"));
    })
    .catch(err => console.error(err));
const { startStudentConsumer } = require('src/events/studentConsumer');
startStudentConsumer();