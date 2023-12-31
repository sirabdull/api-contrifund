const Joi = require('joi');

const create = Joi.object({
  surname: Joi.string().required(),
  othernames: Joi.string().required(),
  email: Joi.string().eamil().required(),
  dob: Joi.date().required(),
  phone_number: Joi.string().min(11).required().label("Phone number").messages({
    "string.empty": `"Phone Number" cannot be an empty`,
    "string.min": `"Phone Number should have length of 11 digits`,
    "any.required": `"phone Number" is a required field`,
  }),
  password: Joi.string()
    .min(8)
    .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
    .required()
    .label("Password")
    .messages({
      "string.empty": `"Password" cannot be an empty`,
      "string.min": `"Password" should have a minimum length of {#limit}`,
      "any.required": `"Password" is a required field`,
      "object.regex": `Must have at least 8 characters`,
      "string.pattern.base": `Password must contain at least a number, letter and special characters`,
    }),
  gender: Joi.string().required(),
});

const completeForgotPassword = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string()
    .min(8)
    .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
    .required()
    .label("Password")
    .messages({
      "string.empty": `"Password" cannot be an empty`,
      "string.min": `"Password" should have a minimum length of {#limit}`,
      "any.required": `"Password" is a required field`,
      "object.regex": `Must have at least 8 characters`,
      "string.pattern.base": `Password must contain at least a number, letter and special characters`,
    }),
  confirmNewPassword: Joi.string()
    .required()
    .valid(Joi.ref("newPassword"))
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match password" }),
});

const validateLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/)
    .required()
    .label("Password")
    .messages({
      "string.empty": `"Password" cannot be an empty`,
      "string.min": `"Password" should have a minimum length of {#limit}`,
      "any.required": `"Password" is a required field`,
      "object.regex": `Must have at least 8 characters`,
      "string.pattern.base": `Password must contain at least a number, letter and special characters`,
    }),
});

const changePassword = Joi.object({
  newPassword: Joi.string().required(),
  confirmNewPassword: Joi.string().required(),
});


  const updateUserProfile = joi.object({
    surname: joi.string(),
    othernames: joi.string(),
    dob: joi.date().string(),
    gender: joi.string(),
    address_number: joi.string(),
    address_street: joi.string(),
    address_city: joi.string(),
    address_state: joi.string(),
    localgovt: joi.string(),
    state_of_origin: joi.string(),
    marital_status: joi.string(),
    nextofkin_fullname: joi.string(),
    nextofkin_relationship: joi.string(),
    nextofkin_address: joi.string(),
    nextofkin_phone: joi.string(),
  });
  




module.exports = {
  create,
  completeForgotPassword,
  changePassword,
  updateUserProfile,
  validateLogin,
};

