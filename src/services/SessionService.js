class SessionService {
  constructor(sessionRepo) {
    this.userRepo = sessionRepo;
  }

  async execute({ email, password }) {
    return await this.userRepo.create({
      email,
      password,
    });
  }
}

module.exports = SessionService;
