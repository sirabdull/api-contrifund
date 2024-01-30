const express = require("express");
const router = express.Router();
const authorization  = require("../middleware/authorisation"); // Correct import path
const {
  createAccount,
  userLogin,
  deleteUser,
  getUsers,
  updateUserDetails,
  verifyAccount,
  // getUserDetails,
} = require("../controllers/userController");

router.post("/create", createAccount);
router.post("/login", userLogin);
 router.delete("/deleteUser/:user_id", deleteUser);

router.get("/getUsers/:user_id?", getUsers);
router.put("/updateUser/:user_id", updateUserDetails);
router.patch("/verify/:email/:otp", verifyAccount);
// router.get("/getUser/:user_id",  getUserDetails);

module.exports = router;
