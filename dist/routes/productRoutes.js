"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productControllers_1 = require("../controllers/productControllers");
const Product_1 = require("../models/Product");
const router = (0, express_1.Router)();
router.post("/", productControllers_1.createProductController); // POST /products
router.get("/:id", Product_1.getProductById); // GET /products/:id
router.get("/", productControllers_1.getAllProductsController); // GET /products
exports.default = router;
