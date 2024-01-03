const AppError = require("../utils/AppError");

class FavoriteDishesService {
  constructor(favDishesRepo) {
    this.favDishesRepo = favDishesRepo;
  }

  async executeIndex({ user_id }) {
    const favorites = await this.favDishesRepo.index({ user_id });

    if (!favorites)
      throw new AppError("Você não possui nenhuma comida favoritada!", 404);

    return favorites;
  }

  async executeFavorite({ user_id, dish_id }) {
    const favorited = await this.favDishesRepo.favorite({ user_id, dish_id });

    if (!favorited)
      throw new AppError("Prato não encontrado ou já favoritado.", 404);

    return favorited;
  }

  async executeUnfavorite({ user_id, dish_id }) {
    const unfavorited = await this.favDishesRepo.unfavorite({
      user_id,
      dish_id,
    });

    if (!unfavorited)
      throw new AppError("Não foi encontrado o prato para desfavoritar", 404);

    return unfavorited;
  }
}

module.exports = FavoriteDishesService;
