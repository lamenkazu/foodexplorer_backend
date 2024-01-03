const knex = require("../database/knex");

class FavoriteDishesRepository {
  async index({ user_id }) {
    const favorites = await knex("favorites").where({ user_id });

    if (!favorites) return;
    else {
      return favorites;
    }
  }

  async favorite({ user_id, dish_id }) {
    const favorited = await knex("favorites")
      .where({ user_id, dish_id })
      .first();

    if (!favorited) {
      return await knex("favorites").insert({
        user_id,
        dish_id,
      });
    }
  }

  async unfavorite({ user_id, dish_id }) {
    const favorited = await knex("favorites")
      .where({ user_id, dish_id })
      .first();

    if (favorited)
      return await knex("favorites").where({ user_id, dish_id }).delete();
  }
}

module.exports = FavoriteDishesRepository;
