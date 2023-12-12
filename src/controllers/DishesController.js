const DishesRepository = require("../repositories/DishesRepository");
const DishesServices = require("../services/DishesServices");

class DishesController {
  async index(req, res) {}

  async show(req, res) {
    const { dish_id } = req.params;

    const dishRepo = new DishesRepository();
    const dishServices = new DishesServices(dishRepo);

    const dish = await dishServices.executeShow(dish_id);

    res.json(dish);
  }

  async create(req, res) {
    const { title, description, category, price, ingredients } = JSON.parse(
      req.body.body
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

  async update(req, res) {}

  async delete(req, res) {}
}

module.exports = DishesController;
