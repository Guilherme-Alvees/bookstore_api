import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// Rota para listar todos os usuarios
router.get("/users", userController.getAllUsers);

export default router;
