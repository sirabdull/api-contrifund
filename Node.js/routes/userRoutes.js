const express = require("express");
const router = express.Router();
const validationData = require("../validations/userValidation");
const {authorization} = require("../middleware/authorization");
const {
  createAccount,
  userLogin,
  deleteUser,
  getAllUsers,
  updateUserDetails,
  verifyAccount,
  getUserDetails,
} = require("../controllers/userController");

router.get("/user/create", (validationData.create), createAccount);
router.post( "/user/login", (validationData.validateLogin), userLogin);
router.delete("/user/deleteUser/:user_id", authorization, deleteUser)
router.get('/user/getUsers', authorization, getAllUsers)
router.put('/updateUser/:user_id', authorization, (validationData.updateUserProfile), updateUserDetails)
router.patch("/verify/:otp/:email", verifyAccount);



