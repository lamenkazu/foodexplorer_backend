const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const UsersAdminController = require("../controllers/UsersAdminController");
const {
  ensureAuthentication,
  ensureAuthorization,
} = require("../middlewares/ensureAuth");

const usersRoutes = Router();
const usersController = new UsersController();
const usersAdminController = new UsersAdminController();

//Admin
usersRoutes.get(
  "/",
  ensureAuthentication,
  ensureAuthorization(["admin"]),
  usersAdminController.index
);
usersRoutes.get(
  "/:user_id",
  ensureAuthentication,
  ensureAuthorization(["admin"]),
  usersAdminController.show
);

//Everyone
usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;
