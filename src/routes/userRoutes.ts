import { Router } from "express";
import { createUserController, getUserByIdController, getAllUsersController } from "../controllers/userControllers"

const router = Router();

router.post("/", createUserController); // POST /users
router.get("/:id", getUserByIdController); // GET /users/:id
router.get("/", getAllUsersController); // GET /users

export default router;
