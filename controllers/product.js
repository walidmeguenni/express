const Product = require("../models/Product");
const fs = require("fs");
exports.GetProducts = async (req, res) => {
  try {
    const result = await Product.find();

    res.status(200).json({
      message: "list of products",
      Products: result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.AddProduct = async (req, res) => {
  try {
    const { name, price, company, quantity } = req.body;
    const productImage = req.file.path;
    const product = new Product({
      name,
      price,
      company,
      quantity,
      productImage,
    });
    const result = await product.save();
    res.status(202).json({
      message: "product saved",
      product: result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.GetProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findById(id);
    res.status(200).json({
      product: result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.UpdateAllProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.status(400).json({ message: "product doesn't exist" });
    }
    const path = product.productImage;
    fs.unlink(path, async () => {
      const { name, price, company, quantity } = req.body;
      const productImage = req.file.path;
      const result = await Product.findByIdAndUpdate(
        id,
        { name, price, company, quantity, productImage },
        { new: true }
      );
      res.status(200).json({
        message: "product updated",
        product: result,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.UpdateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, company, quantity } = req.body;

    const updatedProduct = {};
    if (name) updatedProduct.name = name;
    if (price) updatedProduct.price = price;
    if (company) updatedProduct.company = company;
    if (quantity) updatedProduct.quantity = quantity;
    const result = await Product.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });

    res.status(200).json({
      message: "product updated",
      product: result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.DeleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      res.satatus(400).json({ message: "product doesn't exist" });
    }
    const path = product.productImage;
    fs.unlink(path, async () => {
      const result = await Product.findByIdAndDelete(id);
      res.status(200).json({
        message: "product deleted",
        product: result,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
