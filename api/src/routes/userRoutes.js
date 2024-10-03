import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// Rota para listar todos os usuários
router.get("/users", userController.getAllUsers);

// Rota para criar um novo usuário
router.post("/users", userController.createUser);

// Rota para atualizar parcialmente (PATCH) um usuário
router.patch("/users/:id_user", userController.updateUserPath);

// Rota para substituir completamente (PUT) um usuário
router.put("/users/:id_user", userController.updateUserPut);

// Rota para deletar um usuário
router.delete("/users/:id_user", userController.deleteUser);

export default router;
