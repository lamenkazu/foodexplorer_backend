const knex = require("../../database/knex");

class UserAdminRepository {
  async index({ name, email }) {
    return await knex("users")
      .whereLike("name", `%${name}%`)
      .andWhereLike("email", `%${email}%`)
      .orderBy("created_at");
  }

  async show(user_id) {
    return await knex("users").where({ user_id }).first();
  }
}

module.exports = UserAdminRepository;
