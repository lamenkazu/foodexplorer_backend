const { Router } = require("express");

const DishesController = require("../controllers/DishesController");
const dishesController = new DishesController();

const dishesRoutes = Router();
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:dish_id", dishesController.show);

dishesRoutes.post("/", dishesController.create);
dishesRoutes.put("/:dish_id", dishesController.update);
dishesRoutes.delete("/:dish_id", dishesController.delete);

module.exports = dishesRoutes;
