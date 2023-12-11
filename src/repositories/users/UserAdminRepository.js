const AppError = require("../../utils/AppError");
const knex = require("../../database/knex");

class UserAdminRepository {
  async index({ name, email }) {
    return await knex("users")
      .whereLike("name", `%${name}%`)
      .andWhereLike("email", `%${email}%`)
      .orderBy("created_at");
  }

  async show(user_id) {
    const user = await knex("users").where({ user_id }).first();

    if (!user) throw new AppError("Usuário não consta no banco de dados");

    return user;
  }
}

module.exports = UserAdminRepository;
