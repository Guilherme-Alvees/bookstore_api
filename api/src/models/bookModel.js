import db_app from "../db/db.js";

// Definindo a classe bookModel
class bookModel {
  // Método para obter todos os livros
  static async listarLivros() {
    const result = await db_app.query("SELECT * FROM livros");
    return result.rows;
  }
}

export default bookModel;
