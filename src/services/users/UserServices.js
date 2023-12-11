const AppError = require("../../utils/AppError");

class UserServices {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async executeCreate({ name, email, password }) {
    return await this.userRepo.create({
      name,
      email,
      password,
    });
  }

  async executeUpdate() {}

  async executeDelete() {}

  async executeValidate(id) {
    const checkIfUserExsists = await this.userRepo.validate(id);
    if (!checkIfUserExsists) throw new AppError("Usuário não autorizado", 401);
    return checkIfUserExsists.user_id;
  }
}

module.exports = UserServices;
