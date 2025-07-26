const express = require("express");
require("dotenv").config();
const connectToDb = require("./config/db");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");
const theatreRouter = require("./routes/theatreRoutes");
const showRouter = require("./routes/showRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const requestLoggerMiddleWare = require("./middleware/loggerMiddleware");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(requestLoggerMiddleWare);
app.use(
  cors({
    origins: ["https://bookmyshow-server-s56s.onrender.com"],
    credentials: true,
  })
);

app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);

app.listen(8082, () => {
  console.log("Server running on port 8082");
});

connectToDb();
