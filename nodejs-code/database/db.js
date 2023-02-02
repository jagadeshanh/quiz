const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { db_url } = require("../config");

mongoose.set("strictQuery", false);
mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
