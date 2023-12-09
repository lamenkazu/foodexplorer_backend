const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/Users", usersRoutes);
routes.use("/Sessions", sessionsRoutes);

module.exports = routes;
