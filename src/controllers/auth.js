import { registerSchema } from "../schemas/auth";
import User from "../models/auth";
import bcryptjs from "bcryptjs";

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

export const signin = (request, response) => {
  // console.log("Dang nhap");
  // lay thong tin user gui len
  // kiem tra tinh hop le cua thong tin
  // kiem tra user co ton tai hay khong
  // neu khong ton tai thi tra ve thong bao loi khong tim thay user
  // neu ton tai thi kiem tra mat khau
  // neu mat khau khong khop thi tra ve thong bao sai mat khau
  // neu mat khau khop thi tra ve thong tin user
};
