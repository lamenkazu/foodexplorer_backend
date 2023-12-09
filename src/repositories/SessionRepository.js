const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/auth");

const errorFromUser = new AppError("E-mail e/ou senha incorreta.", 401);

class SessionRepository {
  async create({ email, password }) {
    const user = await knex("users").where({ email }).first();
    if (!user) throw errorFromUser;

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) throw errorFromUser;

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return { token, user };
  }
}

module.exports = SessionRepository;
