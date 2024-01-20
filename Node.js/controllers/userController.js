const { Op } = require("sequelize");
const UserModel = require("../Models/userModel");
const OtpModel = require("../Models/otpModels");
const { v4: uuidv4 } = require("uuid");
const { hashPassword, generateOtp, compareHash } = require("../utils/helper");
const bcrypt = require("bcrypt");
const {
  createValidation,
  completeForgotPasswordValidation,
  validateLogin,
  updateUserProfile,
  changePassword

} = require("../validations/userValidation");
const OtpEnum = require("../constant/enums");
const {
  registerMessage,
  loginMessage,
  invalidOtp,
  userExists,
  notFoundMessage,
} = require("../constant/messages");

const createAccount = async (req, res) => {
  const { error } = createValidation(req.body);
  if (error !== undefined) {
    res.status(400).json({
      status: false,
      message: error.details[0].message || "bad request",
    });
    return;
  }
  try {
    const { surname, othernames, email, phone, password } =
      req.body;
    const checkIfUserExist = await UserModel.findAll({
      attributes: ["email", "phone"],
      where: {
        [Op.and]: [{ email: email }, { phone: phone }],
      },
    });
    if (checkIfUserExist.length > 0) {
      res.status(400).json({
        status: false,
        message: userExists,
      });
      return;
    }
    const { hash, salt } = await hashPassword(password);
    const userID = uuidv4();
    await UserModel.create({
      user_id: userID,
      surname: surname,
      othernames: othernames,
      phone: phone,
      email: email,
      password_hash: hash,
      password_salt: salt,
    });
    const _otp = generateOtp(6);
    console.log(_otp);
    const dataToInsert = {
      otp_id: uuidv4(),
      email_or_phone: email,
      otp: _otp,
    };

    await OtpModel.create(dataToInsert);

    //send as sms
    //send as email
    // sendEmail(email, "OTP", `Hi ${surname}, your otp is ${_otp}`)
    // sendSms(phone, "OTP", `Hi ${surname}, your otp is ${_otp}`)

    res.status(201).json({
      status: true,
      message: registerMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};


const verifyAccount = async (req, res) => {
  const { email, otp } = req.params;
  try {
    if (!email || !otp) throw new Error(invalidOtp);

    await OtpModel.findOne({
      where: {
        email_or_phone: email,
        otp: otp,
        otpType:OtpEnum.EGISTRATION,
      },
    });
    if (!otpData) throw new Error(invalidOtp);

    await UserModel.update(
      {
        isOtpVerified: true,
      },
      {
        where: {
          email: email,
        },
      }
    );
    console.log("isOtpVerified", isOtpVerified);
    await OtpModel.destroy({
      where: {
        email: email,
        otp,
        otpType: OtpEnum.EGISTRATION,
      },
    });

    res.status(200).json({
      status: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "internal service error",
    });
  }
};

// const verifyAccount = (req, res) => {
//   const { email, otp } = req.params;

//   if (!email || !otp) {
//     res.status(400).json({
//       status: false,
//       message: invalidOtp,
//     });
//     return;
//   }
//   try {
//     const otpData = async (req, res) => {
//       await OtpModel.findOne({
//         where: {
//           email_or_phone: email,
//           otp: otp,
//           otpType: OtpEnum.REGISTRATIOn,
//         },
//       });
//       if (!otpData) {
//         res.status(400).json({
//           status: false,
//           message: invalidOtp,
//         });
//         return;
//       }

//       await UserModel.update({
//         isOtpVerified: true,
//       }, {
//         where: {
//           email: email,
//         },
//       });
// console.log('isOtpVerified', isOtpVerified)
//       await OtpModel.destroy({
//         where: {
//           email: email,
//           otp,
//           otpType: OtpEnum.REGISTRATION,
//         },
//       })
//     };
//     res.status(200).json({
//       status: true,
//       message: "Account verified successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: error.message || "internal service error",
//     });
//   }
// };




const getUserDetails = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    res.status(400).json({
      status: false,
      message: "bad request",
    });
    return;
  }
  try {
    const user = await UserModel.findOne({
      attributes: [
        "surname",
        "othernames",
        "email",
        "phone",
        "password",
        "dob",
        "gender",
      ],
      where: {
        user_id: user_id,
      },
    });
    if (!user) {
      res.status(400).json({
        status: false,
        message: "User does not exist",
      });
      return;
    }
    res.status(200).json({
      status: true,
      message: "User's details fetched successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "internal service error",
    });
  }
};

const updateUserDetails = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    res.status(400).json({
      status: false,
      message: "bad request",
    });
    return;
  }
  const { error } = updateUserProfile(req.body);
  if (error !== undefined) {
  return  res.status(400).json({
      status: false,
      message: error.details[0].message || "bad request",
    });
  }
  try {
    await UserModel.update(req.body, {
      where: {
        user_id: user_id,
      },
    });
    res.status(200).json({
      status: true,
      message: "User updated successfully",
  
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "internal service error",
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    // if (!users) {
    //   res.status(400).json({
    //     status: false,
    //     message: "bad request",
    //   });
    //   return;
    // }

    res.status(200).json({
      status: true,
      message: "All users fetched successfully",
      data:users
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "internal service error",
    
    });
  }
};

const deleteUser = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    res.status(400).json({
      status: false,
      message: "bad request",
    });
    return;
  }
  try {
    const user = await UserModel.destroy({
      where: {
        user_id: user_id,
      },
    });
    if (!user) {
      res.status(400).json({
        status: false,
        message: "bad request",
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "internal service error",
    });
  }
};

const userLogin = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error !== undefined) {
    res.status(400).json({
      status: false,
      message: error.details[0].message || "bad request",
    });
  }
  const { email, password } = req.body;
  console.log(password, "password");
  if (!email || !password) throw new Error("All fields are required");

  try {
    const checkIfUserExists = await UserModel.findOne({
      where: { email: email },
    });
    if (checkIfUserExists == null) throw new Error("Invalid email or password");

    const dataPayload = {
      email: email,
      _id: uuidv4(),
    };

    const compareHash = await bcrypt.compare(
      password,
      checkIfUserExists.password_hash
    );
    if (!compareHash) throw new Error("Invalid email or password");
    if (!checkIfUserExists.isOtpVerified)
      throw new Error("Account not verified");
    const token = await jwt.sign(dataPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      status: true,
      message: loginMessage,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  createAccount,
  userLogin,
  deleteUser,
  getAllUsers,
  updateUserDetails,
  verifyAccount,
  getUserDetails,
};
