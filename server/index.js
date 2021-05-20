const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const cors = require("cors");
const userRoute = require("./routes/users");

const PORT = 5000;
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
dotenv.config();

app.get("/", (req, res) => {
  res.send("Welcome to Social Media Web Application");
});

app.use("/api/user", userRoute);

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to Database");
  }
);

app.listen(`${PORT}`, () => console.log(`Server is listening to ${PORT}`));
