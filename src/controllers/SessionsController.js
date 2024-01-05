const SessionRepository = require("../repositories/SessionRepository");
const SessionService = require("../services/SessionService");

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const sessionRepo = new SessionRepository();
    const sessionService = new SessionService(sessionRepo);

    const { token, user } = await sessionService.execute({ email, password });

    res.cookie("token", token, {
      httpOnly: true, //Não pode ser acessado por scripts, aumentando a segurança
      maxAge: 24 * 60 * 60 * 1000, //Tempo de validade do cookie
    });

    res.status(201).json({ user });
  }
}

module.exports = SessionsController;
