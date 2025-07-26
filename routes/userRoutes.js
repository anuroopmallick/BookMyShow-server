const userRouter = require("express").Router();
const {
  registerUser,
  loginUser,
  currentUser,
  forgetPassword,
  resetPassword,
} = require("../controller/user");
const authMiddleware = require("../middleware/authMiddleware");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-current-user", authMiddleware, currentUser);
userRouter.patch("/forgetpassword", forgetPassword);
userRouter.patch("/resetpassword", resetPassword);
module.exports = userRouter;
