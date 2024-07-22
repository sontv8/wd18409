// import { Product } from "../models/product";
import Product from "../models/product";

export const getProducts = async (request, response) => {
  try {
    const data = await Product.find().populate("name").exec();
    response.status(200).json({ data, message: "Da lay tat ca san pham" });
  } catch (error) {}
};

export const getProductById = async (request, response) => {
  try {
    const data = await Product.findOne({ _id: request.params.id }).populate(
      "name"
    );
    // const data = await Product.findById(request.params.id);
    response.status(200).json(data);
  } catch (error) {}
};

export const createProduct = async (request, response) => {
  try {
    const data = await Product(request.body).save();
    response.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (request, response) => {
  try {
    const data = await Product.findOneAndUpdate(
      { _id: request.params.id },
      request.body,
      { new: true }
    );
    response.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (request, response) => {
  try {
    const data = await Product.findOneAndDelete({ _id: request.params.id });
    response.status(200).json({ data, message: "Xoa thanh cong" });
  } catch (error) {
    console.log(error);
  }
};
