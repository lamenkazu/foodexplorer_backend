const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesServices {
  constructor(dishRepo) {
    this.dishRepo = dishRepo;
  }

  async executeIndex() {}

  async executeShow(dish_id) {
    const dish = await this.dishRepo.show(dish_id);
    if (!dish) throw new AppError("Prato não consta no banco de dados");

    return dish;
  }

  async executeCreate({
    title,
    description,
    category,
    price,
    dishImageFilename,
    ingredients,
  }) {
    const diskStorage = new DiskStorage();
    const filename = await diskStorage.saveFile(dishImageFilename);

    if (!filename) throw new AppError("Sem imagem do prato");

    return await this.dishRepo.create({
      title,
      description,
      category,
      price,
      image: filename,
      ingredients,
    });
  }

  async executeUpdate() {}

  async executeDelete(dish_id) {
    const removedDish = await this.dishRepo.delete(dish_id);
    if (!removedDish)
      throw new AppError("Prato não encontrado, não pode ser removido.");

    const diskStorage = new DiskStorage();
    await diskStorage.deleteFile(removedDish.image);

    return removedDish;
  }
}

module.exports = DishesServices;
