class UserAdminServices {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  async executeIndex({ name, email }) {
    const users = await this.userRepo.index({
      name,
      email,
    });

    users.map((user) => delete user.password);

    return users;
  }

  async executeShow() {}
}

module.exports = UserAdminServices;
