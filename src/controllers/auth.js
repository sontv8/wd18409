import { registerSchema } from "../schemas/auth";

export const signup = (request, response) => {
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
  // ma hoa mat khau
  // them moi user vao db
  // tra ve thong tin user vua dang ky (khong bao gom mat khau)
};

export const signin = (request, response) => {
  console.log("Dang nhap");
};
