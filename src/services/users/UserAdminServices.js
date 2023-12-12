const AppError = require("../../utils/AppError");

class UserAdminServices {
  static instance;

  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async executeIndex({ name, email }) {
    const users = await this.userRepo.index({
      name,
      email,
    });

    if (!users)
      throw new AppError(
        "Nenhum usuário não consta no banco de dados! Como chegou até aqui?",
        404
      );

    return users;
  }

  async executeShow(user_id) {
    const user = await this.userRepo.show(user_id);
    if (!user) throw new AppError("Usuário não consta no banco de dados", 404);
    return user;
  }
}

module.exports = UserAdminServices;
