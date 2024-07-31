import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().required().min(3).trim().messages({
    "any.required": "Username la truong bat buoc",
    "string.empty": "Username khong duoc de trong",
    "string.min": "Username phai co it nhat 3 ky tu",
  }),
  email: Joi.string().required().email().trim().messages({
    "any.required": "Email la truong bat buoc",
    "string.empty": "Email khong duoc de trong",
    "string.email": "Email khong dung dinh dang",
    "string.trim": "Email khong duoc chua khoang trang",
  }),
  password: Joi.string().required().min(6).trim().messages({
    "any.required": "Password la truong bat buoc",
    "string.empty": "Password khong duoc de trong",
    "string.min": "Password phai co it nhat 6 ky tu",
    "string.trim": "Password khong duoc chua khoang trang",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": "Confirm Password la truong bat buoc",
    "string.empty": "Confirm Password khong duoc de trong",
    "any.only": "Confirm Password khong khop voi Password",
  }),
});

export const signinSchema = Joi.object({
  email: Joi.string().required().email().trim().messages({
    "any.required": "Email la truong bat buoc",
    "string.empty": "Email khong duoc de trong",
    "string.email": "Email khong dung dinh dang",
    "string.trim": "Email khong duoc chua khoang trang",
  }),
  password: Joi.string().required().trim().messages({
    "any.required": "Password la truong bat buoc",
    "string.empty": "Password khong duoc de trong",
    "string.trim": "Password khong duoc chua khoang trang",
  }),
});
