const express = require("express");
const {
  GetProducts,
  AddProduct,
  GetProductById,
  UpdateAllProductById,
  UpdateProductById,
  DeleteProduct,
} = require("../controllers/product");

const upload = require("../middleware/upload");
const router = express.Router();
const CheckAuth = require('../middleware/checkAuth')
router.get("/", GetProducts);
router.get("/:id", GetProductById);
router.post("/", CheckAuth,upload.single("productImage"), AddProduct);
router.put("/:id",CheckAuth, upload.single("productImage"), UpdateAllProductById);
router.patch("/:id",CheckAuth, UpdateProductById);
router.delete("/:id", CheckAuth,DeleteProduct);

module.exports = router;
 