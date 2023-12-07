const mongoose = require("mongoose");

// Manage the connection with MongoDB Atlas
// Mongo information are stored on the config.env file
const connectDB = async () => {
  try {
    // Connect to MongoDB
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      // useCreateIndex: true
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (err) {
    console.log(err);
    // process.exit(1);
  }
};

module.exports = connectDB;
