import bookModel from "../models/bookModel.js";

class bookController {
  // Método para listar todos os livros
  static async getAllBooks(req, res) {
    try {
      const books = await bookModel.getAllBooks();

      // Verifica se existem livros retornados
      if (!books || books.length === 0) {
        return res.status(404).json({ error: "No books found." });
      }

      // Se houver livros, retorna a lista
      res.json(books);
    } catch (error) {
      console.error("Error listing books: ", error); // Log do erro para depuração

      // Tratamento de erro de conexão com o banco de dados
      if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
        return res.status(503).json({
          error: "Database service unavailable. Please try again later.",
        });
      }

      // Tratamento de erro relacionado ao banco de dados (consulta malformada, etc.)
      if (error.code === "42P01") {
        // Exemplo: erro de tabela inexistente
        return res.status(400).json({
          error: "Error in the database structure. Check if the table exists.",
        });
      }

      // Para outros erros inesperados
      res.status(500).json({
        error: "Internal server error. Please try again.",
      });
    }
  }
}

export default bookController;
