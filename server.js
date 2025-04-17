const express = require("express");
require("dotenv").config();
const connectToDb = require("./config/db");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api/users", userRouter);

app.listen(8082, () => {
  console.log("Server running on port 8082");
});

connectToDb();
