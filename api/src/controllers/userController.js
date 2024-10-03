import userModel from "../models/userModel.js";

class userController {
  // Método para listar todos os usuários
  static async getAllUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();

      if (!users || users.length === 0) {
        return res.status(404).json({ error: "No users found." });
      }
      res.json(users);
    } catch (error) {
      console.error("Error listing users: ", error);

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

  // Método para criar um novo usuário
  static async createUser(req, res) {
    try {
      const { name, email, age, address } = req.body;

      if (!name || !email || !age || !address) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const newUserId = await userModel.createNewUser({
        name,
        email,
        age,
        address,
      });

      res.status(201).json({
        message: "User created successfully",
        id_user: newUserId,
      });
    } catch (error) {
      console.error("Error creating user: ", error);

      if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
        return res.status(503).json({
          error: "Database service unavailable. Please try again later.",
        });
      }

      if (error.code === "23505") {
        return res.status(400).json({
          error: "Duplicate email. A user with this email already exists.",
        });
      }

      res.status(500).json({
        error: "Internal server error. Please try again.",
      });
    }
  }

  // Método para atualizar um usuário (PATCH)
  static async updateUserPath(req, res) {
    try {
      const { id_user } = req.params;
      const { name, email, age, address } = req.body;

      const result = await userModel.updateUserPath({
        id_user,
        name,
        email,
        age,
        address,
      });

      res.status(200).json(result);
    } catch (error) {
      console.error("Error updating user: ", error);
      res.status(500).json({
        error: "Internal server error. Please try again.",
      });
    }
  }

  // Método para substituir um usuário completo (PUT)
  static async updateUserPut(req, res) {
    try {
      const { id_user } = req.params;
      const { name, email, age, address } = req.body;

      if (!name || !email || !age || !address) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const result = await userModel.updateUserPut({
        id_user,
        name,
        email,
        age,
        address,
      });

      res.status(200).json(result);
    } catch (error) {
      console.error("Error replacing user: ", error);
      res.status(500).json({
        error: "Internal server error. Please try again.",
      });
    }
  }

  // Método para deletar um usuário
  static async deleteUser(req, res) {
    try {
      const { id_user } = req.params;
      const result = await userModel.deleteUser({ id_user });

      res.status(200).json(result);
    } catch (error) {
      console.error("Error deleting user: ", error);
      res.status(500).json({
        error: "Internal server error. Please try again.",
      });
    }
  }
}

export default userController;
