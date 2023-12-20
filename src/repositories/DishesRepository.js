const knex = require("../database/knex");

class DishesRepository {
  async index({ title, category, ingredients }) {
    let dishesFromDB;

    if (ingredients) {
      const filteredIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim());
      dishesFromDB = await knex("dishes")
        .whereLike("title", `%${title}%`)
        .andWhereLike("category", `%${category}%`)
        .whereIn("name", filteredIngredients) //Analisa baseado na tag o nome da tag com o vetor para verificar se a tag existe ali ou não.
        .groupBy("dishes.dish_id");
    } else {
      dishesFromDB = await knex("dishes")
        .whereLike("title", `%${title}%`)
        .andWhereLike("category", `%${category}%`)
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
      .select(["name"])
      .where({ dish_id })
      .orderBy("name");

    ingredients = ingredients.map((ingredient) => ingredient.name);

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

  async update({ dish_id, title, description, category, price, ingredients }) {
    const [dish] = await knex("dishes").where({ dish_id });
    if (!dish) return;

    const existingIngredients = await knex("ingredients")
      .select("name")
      .where({ dish_id });
    const currentIngredients = existingIngredients.map(
      (ingredient) => ingredient.name
    );

    const ingredientsChanged =
      JSON.stringify(currentIngredients) !== JSON.stringify(ingredients);

    if (ingredientsChanged) {
      await knex("ingredients").where({ dish_id }).delete();

      const ingredientsToInsert = ingredients.map((name) => ({
        name,
        dish_id,
      }));

      await knex("ingredients").insert(ingredientsToInsert);
    }

    return await knex("dishes")
      .update({
        dish_id,
        title: title === "" ? dish.title : title,
        description: description === "" ? dish.description : description,
        category: category === "" ? dish.category : category,
        price: price === "" ? dish.price : price,
        updated_at: knex.fn.now(),
      })
      .where({ dish_id });
  }

  async delete(dish_id) {
    const [removedDish] = await knex("dishes").where({ dish_id });
    if (!removedDish) return;

    await knex("dishes").where({ dish_id }).delete();

    return removedDish;
  }
}

module.exports = DishesRepository;
