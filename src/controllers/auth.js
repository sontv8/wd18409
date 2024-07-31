import { registerSchema, signinSchema } from "../schemas/auth";
import User from "../models/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (request, response) => {
  // lay du lieu user gui len
  //   console.log(request.body.password);
  const { username, email, password } = request.body;
  // kiem tra tinh hop le cua du lieu
  console.log(registerSchema.validate(request.body, { abortEarly: false }));
  const { error } = registerSchema.validate(request.body, {
    abortEarly: false,
  });
  //   console.log("Detail Error: ", error.details);
  if (error) {
    const message = error.details.map((message) => message.message);
    response.status(400).json({ errorMessage: message });
  }
  // kiem tra user da ton tai hay chua
  const existUser = await User.findOne({ email: email });
  if (existUser) {
    return response.status(400).json({ errorMessage: "Email da ton tai" });
  }
  // ma hoa mat khau bcryptjs
  const hashedPassword = await bcryptjs.hash(password, 10);
  // console.log(hashedPassword);
  // them moi user vao db
  const user = await User({
    username,
    email,
    password: hashedPassword,
  }).save();
  // tra ve thong tin user vua dang ky (khong bao gom mat khau)
  response.status(201).json({ message: "Dang ky thanh cong", user });
};

export const signin = async (request, response) => {
  // console.log("Dang nhap");

  // lay thong tin user gui len
  const { email, password } = request.body;
  // kiem tra tinh hop le cua thong tin
  const { error } = signinSchema.validate(request.body, { abortEarly: false });
  if (error) {
    const message = error.details.map((message) => message.message);
    return response.status(400).json({ message });
  }
  // kiem tra user co ton tai hay khong
  const existUser = await User.findOne({ email });
  // neu khong ton tai thi tra ve thong bao loi khong tim thay user
  if (!existUser) {
    return response.status(400).json({ message: "Email khong ton tai" });
  }
  // neu ton tai thi kiem tra mat khau
  const isValidPassword = await bcryptjs.compare(password, existUser.password);
  // neu mat khau khong khop thi tra ve thong bao sai mat khau
  if (!isValidPassword) {
    return response.status(400).json({ message: "Sai mat khau" });
  }

  const token = jwt.sign({ id: existUser._id }, "123456", { expiresIn: "30s" });
  response.cookie("token", token, { httpOnly: true });

  // neu mat khau khop thi tra ve thong tin user
  existUser.password = undefined;
  response
    .status(200)
    .json({ message: "Dang nhap thanh cong", user: existUser, token });
};
