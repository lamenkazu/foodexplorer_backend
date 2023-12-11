const { Router } = require("express");
const {
  ensureAuthentication,
  ensureAuthorization,
} = require("../middlewares/ensureAuth");

const DishesController = require("../controllers/DishesController");
const dishesController = new DishesController();

const dishesRoutes = Router();

dishesRoutes.use(ensureAuthentication);
//Everyone
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:dish_id", dishesController.show);

dishesRoutes.post("/", ensureAuthorization(["admin"]), dishesController.create);
dishesRoutes.put(
  "/:dish_id",
  ensureAuthorization(["admin"]),
  dishesController.update
);
dishesRoutes.delete(
  "/:dish_id",
  ensureAuthorization(["admin"]),
  dishesController.delete
);

module.exports = dishesRoutes;
