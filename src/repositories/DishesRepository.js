const knex = require("../database/knex");

class DishesRepository {
  async index({ title, ingredients }) {
    let dishesFromDB;

    if (ingredients) {
      const filteredIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());
      dishesFromDB = await knex("dishes")
        .whereLike("title", `%${title}%`)
        .whereIn("name", filteredIngredients) //Analisa baseado na tag o nome da tag com o vetor para verificar se a tag existe ali ou não.
        .innerJoin("ingredients", "dishes.dish_id", "ingredients.dish_id")
        .groupBy("dishes.dish_id");
    } else {
      dishesFromDB = await knex("dishes")
        .whereLike("title", `%${title}%`)
        .innerJoin("ingredients", "dishes.dish_id", "ingredients.dish_id")
        .groupBy("dishes.dish_id");
    }

    //Ids de todos os pratos
    const dishesIds = dishesFromDB.map((dish) => dish.dish_id);

    //Recupera os ingredientes associados aos pratos
    const ingredientsFromDb = await knex("ingredients").whereIn(
      "dish_id",
      dishesIds
    );

    const dishes = dishesFromDB.map((dish) => {
      const ingredients = ingredientsFromDb
        .filter((ingredient) => ingredient.dish_id === dish.dish_id)
        .map((ingredient) => ingredient.name);
      return {
        ...dish,
        ingredients,
      };
    });

    return dishes;
  }

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

    const ingredientsToInsert = ingredients.map((name) => ({
      name,
      dish_id,
    }));

    await knex("ingredients").insert(ingredientsToInsert);

    return dish_id;
  }

  async update() {}

  async delete(dish_id) {
    const [removedDish] = await knex("dishes").where({ dish_id });
    if (!removedDish) return;

    await knex("dishes").where({ dish_id }).delete();

    return removedDish;
  }
}

module.exports = DishesRepository;
