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

    // users.map((user) => delete user.password);

    return users;
  }

  async executeShow(user_id) {
    const user = await this.userRepo.show(user_id);
    if (!user) throw new AppError("Usuário não consta no banco de dados");
    return user;
  }
}

module.exports = UserAdminServices;
