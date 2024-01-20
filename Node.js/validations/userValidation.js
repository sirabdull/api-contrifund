const Joi = require("joi");

const createValidation = (data) => {
 const createSchema = Joi.object({
  surname: Joi.string().required(),
  othernames: Joi.string().required(),
  email: Joi.string().email().required(),
  
  phone: Joi.string().min(11).required().label("Phone number").messages({
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
  
});
return createSchema.validate(data)
}
const completeForgotPasswordValidation = (data)=> {

  const schema = Joi.object({
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
  confirmNewPassword: Joi.string().required().valid(Joi.ref('newPassword'))
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match password' }) 
});
return schema.validate(data)
}
const validateLogin = (data) => {
  const loginSchema = Joi.object({
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
return loginSchema.validate(data)
};
const changePassword = (data)=>{
 const changePasswordSchema = Joi.object({
  newPassword: Joi.string().required(),
  confirmNewPassword: Joi.string().required(),
});
return changePasswordSchema.validate(data)
}
const updateUserProfile = (data)=> {
  const updateShema = Joi.object({
     
  gender: Joi.string(),
  address_number: Joi.string(),
  address_street: Joi.string(),
  address_city: Joi.string(),
  address_state: Joi.string(),
  localgovt: Joi.string(),
  state_of_origin: Joi.string(),
  marital_status: Joi.string(),
  nextofkin_fullname: Joi.string(),
  nextofkin_relationship: Joi.string(),
  nextofkin_address: Joi.string(),
  nextofkin_phone: Joi.string()
})
return updateShema.validate(data)
};
module.exports = {
  createValidation,
  completeForgotPasswordValidation,
  changePassword,
  updateUserProfile,
  validateLogin,
};