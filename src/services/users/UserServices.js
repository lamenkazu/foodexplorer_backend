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

  async executeValidate() {}
}

module.exports = UserServices;
