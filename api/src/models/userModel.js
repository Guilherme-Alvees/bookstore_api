import db_app from "../db/db.js";

// Definindo a classe userModel
class userModel {
  // Método para obter todos os livros
  static async getAllUsers() {
    const result = await db_app.query("SELECT * FROM users");
    return result.rows;
  }
}

export default userModel;
