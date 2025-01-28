"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
router.post("/", userControllers_1.createUserController); // POST /users
router.get("/:id", userControllers_1.getUserByIdController); // GET /users/:id
router.get("/", userControllers_1.getAllUsersController); // GET /users
exports.default = router;
