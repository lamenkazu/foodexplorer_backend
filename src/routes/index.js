const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const dishesRoutes = require("./dish.routes");

const routes = Router();

routes.use("/Users", usersRoutes);
routes.use("/Sessions", sessionsRoutes);
routes.use("/Dishes", dishesRoutes);

module.exports = routes;
