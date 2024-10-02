import bookModel from "../models/bookModel.js";

class bookController {
  // Método para listar todos os livros
  static async listarLivros(req, res) {
    try {
      const livros = await bookModel.listarLivros();

      // Verifica se existem livros retornados
      if (!livros || livros.length === 0) {
        return res.status(404).json({ error: "Nenhum livro encontrado." });
      }

      // Se houver livros, retorna a lista
      res.json(livros);
    } catch (error) {
      console.error("Erro ao listar livros: ", error); // Log do erro para depuração

      // Tratamento de erro de conexão com o banco de dados
      if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
        return res.status(503).json({
          error:
            "Serviço de banco de dados indisponível. Tente novamente mais tarde.",
        });
      }

      // Tratamento de erro relacionado ao banco de dados (consulta malformada, etc.)
      if (error.code === "42P01") {
        // Exemplo: erro de tabela inexistente
        return res.status(400).json({
          error:
            "Erro na estrutura do banco de dados. Verifique se a tabela existe.",
        });
      }

      // Para outros erros inesperados
      res
        .status(500)
        .json({
          error: "Erro interno do servidor. Por favor, tente novamente.",
        });
    }
  }
}

export default bookController;
