const FavoriteDishesRepository = require("../repositories/FavoriteDishesRepository");
const FavoriteDishesServices = require("../services/FavoriteDishesServices");

class FavoriteDishesController {
  async index(req, res) {
    const { user } = req;

    const favDishesRepo = new FavoriteDishesRepository();
    const favDishesServices = new FavoriteDishesServices(favDishesRepo);

    const favorites = await favDishesServices.executeIndex({
      user_id: user.id,
    });

    return res.json(favorites);
  }

  async isFavorite(req, res) {
    const { user } = req;
    const { dish_id } = req.params;

    const favDishesRepo = new FavoriteDishesRepository();
    const favDishesServices = new FavoriteDishesServices(favDishesRepo);

    const isFavorite = await favDishesServices.executeIsFavorite({
      user_id: user.id,
      dish_id,
    });

    return res.json(isFavorite);
  }

  async favorite(req, res) {
    const { user } = req;
    const { dish_id } = req.params;

    const favDishesRepo = new FavoriteDishesRepository();
    const favDishesServices = new FavoriteDishesServices(favDishesRepo);

    const favorited = await favDishesServices.executeFavorite({
      user_id: user.id,
      dish_id,
    });

    return res.status(201).json(favorited);
  }

  async unfavorite(req, res) {
    const { user } = req;
    const { dish_id } = req.params;

    const favDishesRepo = new FavoriteDishesRepository();
    const favDishesServices = new FavoriteDishesServices(favDishesRepo);

    const unfavorited = await favDishesServices.executeUnfavorite({
      user_id: user.id,
      dish_id,
    });

    return res.status(200).json(unfavorited);
  }
}

module.exports = FavoriteDishesController;
