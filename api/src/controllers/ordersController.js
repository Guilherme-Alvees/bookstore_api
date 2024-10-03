import ordersModel from "../models/ordersModel.js";

class ordersController {
  // Método para listar todos os pedidos (GET)
  static async getAllOrders(req, res) {
    try {
      const orders = await ordersModel.getAllOrders();

      if (!orders || orders.length === 0) {
        return res.status(404).json({ error: "No orders found." });
      }

      res.json(orders);
    } catch (error) {
      console.error("Error listing orders: ", error);

      if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
        return res.status(503).json({
          error: "Database service unavailable. Please try again later.",
        });
      }

      if (error.code === "42P01") {
        return res.status(400).json({
          error: "Error in the database structure. Check if the table exists.",
        });
      }

      res.status(500).json({
        error: "Internal server error. Please try again.",
      });
    }
  }

  // Método para criar um novo pedido (POST)
  static async createOrder(req, res) {
    try {
      const { id_user, books } = req.body;

      // Validação simples
      if (!id_user || !books || books.length === 0) {
        return res
          .status(400)
          .json({ error: "id_user and books are required." });
      }

      // Cria o novo pedido com a lista de livros e quantidades
      const newOrderId = await ordersModel.createNewOrder({ id_user, books });

      res.status(201).json({
        message: "Order created successfully",
        id_order: newOrderId,
      });
    } catch (error) {
      console.error("Error creating order: ", error);
      res.status(500).json({
        error: "Internal server error. Please try again.",
      });
    }
  }
}

export default ordersController;
