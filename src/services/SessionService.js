class SessionService {
  constructor(sessionRepo) {
    this.userRepo = sessionRepo;
  }

  async execute({ email, password }) {
    const { token, user } = await this.userRepo.create({
      email,
      password,
    });

    delete user.password;

    return { token, user };
  }
}

module.exports = SessionService;
