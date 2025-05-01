const userRouter = require("express").Router();
const { registerUser, loginUser, currentUser } = require("../controller/user");
const authMiddleware = require("../middleware/authMiddleware");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-current-user", authMiddleware, currentUser);

module.exports = userRouter;
