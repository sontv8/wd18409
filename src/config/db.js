import mongoose from "mongoose";

export const connectDB = async () => {
  //   mongoose
  //     .connect("mongodb://localhost:27017/WD18409")
  //     .then(() => {
  //       console.log("DB Connected!");
  //     })
  //     .catch((error) => console.log(error));

  try {
    await mongoose.connect("mongodb://localhost:27017/WD18409");
    console.log("DB Connected!");
  } catch (error) {
    console.log(error);
  }
};
