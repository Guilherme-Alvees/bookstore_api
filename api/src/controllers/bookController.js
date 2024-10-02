import bookModel from "../models/bookModel.js";

// Controlador para lidar com as operações de livros
class bookController {
  // Método para listar todos os livros
  static async listarLivros(req, res) {
    try {
      const livros = await bookModel.listarLivros();
      res.json(livros);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar livros" });
    }
  }
}

export default bookController;
