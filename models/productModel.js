const { db } = require("../config/database");

const products = db.collection("products");

const createProduct = async (name, description, price) => {
  const newProduct = {
    _id: new Date().getTime().toString(),
    name,
    description,
    price,
  };
  await products.insertOne(newProduct);
  return newProduct;
};

const getAllProducts = async () => {
  return await products.find({}).toArray();
};

const getProductById = async (id) => {
  return await products.findOne({ _id: id });
};

const updateProduct = async (id, updates) => {
  return await products.updateOne({ _id: id }, { $set: updates });
};

const deleteProduct = async (id) => {
  return await products.deleteOne({ _id: id });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
