class SessionService {
  constructor(sessionRepo) {
    this.userRepo = sessionRepo;
  }

  async execute() {}
}

module.exports = SessionService;
