const AppError = require("../../utils/AppError");
const knex = require("../../database/knex");
const { hash } = require("bcryptjs");

class UserRepository {
  async create({ name, email, password }) {
    if (!this.userEmailIsOnDB(email)) throw new AppError(emailExistsMassage);

    const encryptedPassword = await hash(password, 8);

    return await knex("users").insert({
      name,
      email,
      password: encryptedPassword,
    });
  }

  async validate() {}

  async update() {}

  async delete() {}

  async userEmailIsOnDB(email) {
    return await knex("users").where({ email }).first();
  }
}

const emailExistsMassage =
  "Esse email já está em uso por outro usuário e não pode ser utilizado.";

module.exports = UserRepository;
