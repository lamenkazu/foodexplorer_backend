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
    return await this.userRepo.show(user_id);
  }
}

module.exports = UserAdminServices;
