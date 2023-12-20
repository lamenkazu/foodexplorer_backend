const DishesRepository = require("../repositories/DishesRepository");
const DishesServices = require("../services/DishesServices");

class DishesController {
  async index(req, res) {
    const { title, ingredients, category } = req.query;

    const dishRepo = new DishesRepository();
    const dishServices = new DishesServices(dishRepo);

    const dishes = await dishServices.executeIndex({
      title,
      category,
      ingredients,
    });

    return res.json(dishes);
  }

  async show(req, res) {
    const { dish_id } = req.params;

    const dishRepo = new DishesRepository();
    const dishServices = new DishesServices(dishRepo);

    const dish = await dishServices.executeShow(dish_id);

    return res.json(dish);
  }

  async create(req, res) {
    const { title, description, category, price, ingredients } = JSON.parse(
      req.body.dish
    );
    const dishImageFilename = req.file.filename;

    const dishRepo = new DishesRepository();
    const dishServices = new DishesServices(dishRepo);

    const newDishId = await dishServices.executeCreate({
      title,
      description,
      category,
      price,
      dishImageFilename,
      ingredients,
    });

    return res.status(201).json(newDishId);
  }

  async update(req, res) {
    const { dish_id } = req.params;
    const { title, description, category, price, ingredients } = req.query;

    const dishRepo = new DishesRepository();
    const dishServices = new DishesServices(dishRepo);

    await dishServices.executeUpdate({
      dish_id,
      title,
      description,
      category,
      price,
      ingredients: JSON.parse(ingredients),
    });

    return res.json();
  }

  async delete(req, res) {
    const { dish_id } = req.params;

    const dishRepo = new DishesRepository();
    const dishServices = new DishesServices(dishRepo);

    const deletedDish = await dishServices.executeDelete(dish_id);

    return res.status(200).json(deletedDish);
  }
}

module.exports = DishesController;
