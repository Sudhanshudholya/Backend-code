const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.MONGO_URI;
const PORT = process.env.PORT;
mongoose
  .connect(db)
  .then(() => {
    console.log(`MongoDB connected successfully on port ${PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
