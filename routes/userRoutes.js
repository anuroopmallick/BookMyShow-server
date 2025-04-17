const userRouter = require("express").Router();

const { registerUser, loginUser } = require("../controller/user");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
