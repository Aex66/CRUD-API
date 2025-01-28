import { Router } from "express";
import { createOrderController, deleteOrderController, getOrderByIdController, getUserOrdersController } from "../controllers/orderControllers";
const router = Router();

router.post("/", createOrderController); // POST /orders
router.get("/:id", getOrderByIdController); // GET /orders/:id
router.get("/user/:id", getUserOrdersController); // GET /orders/user/:id
router.delete("/:id", deleteOrderController); // DELETE /orders/:id

export default router;
