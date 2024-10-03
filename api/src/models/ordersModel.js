import db_app from "../db/db.js";

// Definindo a classe ordersModel
class ordersModel {
  // Método para obter todos os pedidos
  static async getAllOrders() {
    const result = await db_app.query("SELECT * FROM orders");
    return result.rows;
  }

  // Método para criar um novo pedido
  static async createNewOrder({ id_user, books }) {
    try {
      const q = `
        INSERT INTO orders (id_user, order_date, books)
        VALUES ($1, NOW(), $2)
        RETURNING id_order;
      `;

      // Passando os livros como JSON
      const result = await db_app.query(q, [id_user, JSON.stringify(books)]);
      return result.rows[0].id_order;
    } catch (error) {
      console.error("Error creating new order:", error);
      throw error;
    }
  }
}

export default ordersModel;
