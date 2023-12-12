const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesServices {
  constructor(dishRepo) {
    this.dishRepo = dishRepo;
  }

  async executeIndex() {}

  async executeShow() {}

  async executeCreate({
    title,
    description,
    category,
    price,
    dishImageFilename,
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
    });
  }

  async executeUpdate() {}

  async executeDelete() {}
}

module.exports = DishesServices;
