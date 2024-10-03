import express from "express";
import ordersController from "../controllers/ordersController.js";

const router = express.Router();

// Rota para listar todos os pedidos
router.get("/orders", ordersController.getAllOrders);

// Rota para criar um novo pedido
router.post("/orders", ordersController.createOrder);

// Rota para deletar um pedido
router.delete("/orders/:id_order", ordersController.deleteOrder);

// Rota para atualizar parcialmente (PATCH) um pedido
router.patch("/orders/:id_order", ordersController.updateOrderPath);

// Rota para substituir completamente (PUT) um pedido
router.put("/orders/:id_order", ordersController.updateOrderPut);

export default router;
