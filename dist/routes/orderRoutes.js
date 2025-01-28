"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderControllers_1 = require("../controllers/orderControllers");
const router = (0, express_1.Router)();
router.post("/", orderControllers_1.createOrderController); // POST /orders
router.get("/:id", orderControllers_1.getOrderByIdController); // GET /orders/:id
router.get("/user/:id", orderControllers_1.getUserOrdersController); // GET /orders/user/:id
router.delete("/:id", orderControllers_1.deleteOrderController); // DELETE /orders/:id
exports.default = router;
