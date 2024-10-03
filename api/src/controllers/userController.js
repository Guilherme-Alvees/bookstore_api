import userModel from "../models/userModel.js";

class userController {
  static async getAllUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();

      // Verifica se existem usuarios retornados
      if (!users || users.length === 0) {
        return res.status(404).json({ error: "No usera found." });
      }

      // Se houver usuarios, retorna a lista
      res.json(users);
    } catch (error) {
      console.error("Error listing user: ", error); // Log do erro para depuração

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

export default userController;
