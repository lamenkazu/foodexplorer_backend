const knex = require("../../database/knex");

class UserRepository {
  async index({ name, email }) {
    return await knex("users")
      .whereLike("name", `%${name}%`)
      .andWhereLike("email", `%${email}%`)
      .orderBy("created_at");
  }

  async show() {}
}

module.exports = UserRepository;
