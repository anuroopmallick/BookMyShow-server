const express = require("express");
require("dotenv").config();
const connectToDb = require("./config/db");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoutes");
const requestLoggerMiddleWare = require("./middleware/loggerMiddleware");

const app = express();

app.use(express.json());
app.use(requestLoggerMiddleWare);

app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);

app.listen(8082, () => {
  console.log("Server running on port 8082");
});

connectToDb();
