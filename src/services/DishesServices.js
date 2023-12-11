const AppError = require("../utils/AppError");

class DishesServices {
  constructor(dishRepo) {
    this.userRepo = dishRepo;
  }

  async executeIndex() {}

  async executeShow() {}

  async executeCreate() {}

  async executeUpdate() {}

  async executeDelete() {}
}

module.exports = DishesServices;
