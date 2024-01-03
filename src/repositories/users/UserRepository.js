const knex = require("../../database/knex");

class UserRepository {
  async create({ name, email, password }) {
    return await knex("users").insert({
      name,
      email,
      password,
    });
  }

  async validate(id) {
    return await knex("users").where({ user_id: id }).first();
  }

  async update() {}

  async delete() {}

  async userEmailIsOnDB(email) {
    return await knex("users").where({ email }).first();
  }
}

module.exports = UserRepository;
