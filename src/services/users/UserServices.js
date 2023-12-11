const AppError = require("../../utils/AppError");
const { hash } = require("bcryptjs");

class UserServices {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async executeCreate({ name, email, password }) {
    if (!this.userRepo.userEmailIsOnDB(email))
      throw new AppError(emailExistsMassage);

    const encryptedPassword = await hash(password, 8);

    return await this.userRepo.create({
      name,
      email,
      password: encryptedPassword,
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
