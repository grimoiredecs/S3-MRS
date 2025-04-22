
const mongoose = require('mongoose');
const uri = "mongodb+srv://Cluster76516:WGtse3VmfVZx@cluster76516.zzq9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster76516";

//const uri = process.env.MONGODB_URI;

async function run() {
    try {
        await mongoose.connect(uri);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("✅ MongoDB connection is stable!");
    } catch (err) {
        console.error("❌ Connection failed:", err.message);
    } finally {
        await mongoose.disconnect();
    }
}
run();