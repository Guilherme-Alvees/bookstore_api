import userModel from "../models/userModel.js";

class userController {
  static async listarUsers(req, res) {
    try {
      const users = await userModel.listarUsers();
      res.json(users); // Retorna a lista de usuários mockados
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar usuarios" });
    }
  }
}

export default userController;
