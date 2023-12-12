const knex = require("../database/knex");

class DishesRepository {
  async index() {}

  async show() {}

  async create({ title, description, category, price, image }) {
    return await knex("dishes").insert({
      title,
      description,
      category,
      price,
      image,
    });
  }

  async update() {}

  async delete() {}
}

module.exports = DishesRepository;
