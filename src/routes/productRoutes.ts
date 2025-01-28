import { Router } from "express";
import { createProductController, getAllProductsController } from "../controllers/productControllers";
import { getProductById } from "../models/Product";

const router = Router();

router.post("/", createProductController); // POST /products
router.get("/:id", getProductById); // GET /products/:id
router.get("/", getAllProductsController); // GET /products

export default router;
