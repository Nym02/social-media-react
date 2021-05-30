const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const cors = require("cors");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

const PORT = 5000;
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@cluster0.sn2gl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then((res) => console.log("Database Connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to Social Media Web Application");
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.listen(`${PORT}`, () => console.log(`Server is listening to ${PORT}`));
