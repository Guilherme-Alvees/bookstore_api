import users_mock from "../db/users_mock.js";

class userModel {
  // Método para obter todos os usuarios
  static async listarUsers() {
    return users_mock;
  }
}

export default userModel;
