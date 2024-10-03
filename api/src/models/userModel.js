import db_app from "../db/db.js";

// Definindo a classe userModel
class userModel {
  // Método para obter todos os usuários
  static async getAllUsers() {
    const result = await db_app.query("SELECT * FROM users");
    return result.rows;
  }

  static async createNewUser({ name, email, age, address }) {
    try {
      const q = `
        INSERT INTO users (name, email, age, address, created_at)
        VALUES ($1, $2, $3, $4, NOW())
        RETURNING id_user;
      `;
      const result = await db_app.query(q, [name, email, age, address]);
      return result.rows[0].id_user;
    } catch (error) {
      console.error("Error creating new user:", error);
      throw error;
    }
  }

  // Método para deletar um usuário
  static async deleteUser({ id_user }) {
    const delUser = `DELETE FROM users WHERE id_user = $1`;

    try {
      const result = await db_app.query(delUser, [id_user]);

      if (result.rowCount === 0) {
        return { message: "No user found with the provided ID." };
      }
      return { message: "User deleted successfully." };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }

  // Método para atualizar parcialmente (PATCH)
  static async updateUserPath({ id_user, name, email, age, address }) {
    try {
      const setParts = [];
      const values = [];

      if (name) {
        setParts.push(`name = $${setParts.length + 1}`);
        values.push(name);
      }
      if (email) {
        setParts.push(`email = $${setParts.length + 1}`);
        values.push(email);
      }
      if (age) {
        setParts.push(`age = $${setParts.length + 1}`);
        values.push(age);
      }
      if (address) {
        setParts.push(`address = $${setParts.length + 1}`);
        values.push(address);
      }

      values.push(id_user); // Adiciona o ID no final para o WHERE

      const q = `
        UPDATE users 
        SET ${setParts.join(", ")} 
        WHERE id_user = $${values.length}
        RETURNING id_user;
      `;

      const result = await db_app.query(q, values);
      if (result.rowCount === 0) {
        return { message: "No user found with the provided ID." };
      }
      return { message: "User updated successfully." };
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  // Método para substituir completamente (PUT)
  static async updateUserPut({ id_user, name, email, age, address }) {
    try {
      const q = `
        UPDATE users 
        SET name = $1, email = $2, age = $3, address = $4
        WHERE id_user = $5
        RETURNING id_user;
      `;

      const result = await db_app.query(q, [
        name,
        email,
        age,
        address,
        id_user,
      ]);

      if (result.rowCount === 0) {
        return { message: "No user found with the provided ID." };
      }
      return { message: "User updated successfully." };
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
}

export default userModel;
