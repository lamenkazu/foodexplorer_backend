const { Router } = require("express");
const multer = require("multer");

const DishesController = require("../controllers/DishesController");
const FavDishesController = require("../controllers/FavoriteDishesController");

const {
  ensureAuthentication,
  ensureAuthorization,
} = require("../middlewares/ensureAuth");
const dishImgConfig = require("../configs/dishImage");

const dishesController = new DishesController();
const favDishesController = new FavDishesController();

const dishesRoutes = Router();
const upload = multer(dishImgConfig.MULTER);

dishesRoutes.use(ensureAuthentication);
//Everyone
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:dish_id", dishesController.show);

//Admin
dishesRoutes.post(
  "/",
  ensureAuthorization(["admin"]),
  upload.single("image"),
  dishesController.create
);
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

//Customer
dishesRoutes.get(
  "/favorite/index",
  ensureAuthorization(["customer"]),
  favDishesController.index
);

dishesRoutes.get(
  "/favorite/:dish_id",
  ensureAuthorization(["customer"]),
  favDishesController.isFavorite
);

dishesRoutes.post(
  "/favorite/:dish_id",
  ensureAuthorization(["customer"]),
  favDishesController.favorite
);

dishesRoutes.delete(
  "/favorite/:dish_id",
  ensureAuthorization(["customer"]),
  favDishesController.unfavorite
);

module.exports = dishesRoutes;
