const { Router } = require("express");
const multer = require("multer");

const {
  ensureAuthentication,
  ensureAuthorization,
} = require("../middlewares/ensureAuth");
const dishImgConfig = require("../configs/dishImage");

const DishesController = require("../controllers/DishesController");
const dishesController = new DishesController();

const dishesRoutes = Router();
const upload = multer(dishImgConfig.MULTER);

dishesRoutes.use(ensureAuthentication);
//Everyone
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:dish_id", dishesController.show);

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

module.exports = dishesRoutes;
