const knex = require("../database/knex");

class DishesRepository {
  async index() {}

  async show(dish_id) {
    const [dish] = await knex("dishes").where({ dish_id });
    if (!dish) return;

    let ingredients = await knex("ingredients")
      .select(["title"])
      .where({ dish_id })
      .orderBy("title");

    ingredients = ingredients.map((ingredient) => ingredient.title);

    return { ...dish, ingredients };
  }

  async create({ title, description, category, price, image, ingredients }) {
    const [dish_id] = await knex("dishes").insert({
      title,
      description,
      category,
      price,
      image,
    });

    const ingredientsToInsert = ingredients.map((title) => ({
      title,
      dish_id,
    }));

    await knex("ingredients").insert(ingredientsToInsert);

    return dish_id;
  }

  async update() {}

  async delete() {}
}

module.exports = DishesRepository;
