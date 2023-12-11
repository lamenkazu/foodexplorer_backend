const UserAdminRepository = require("../repositories/users/UserAdminRepository");
const UserAdminServices = require("../services/users/UserAdminServices");
class UsersAdminController {
  async index(req, res) {
    const { name, email } = req.query;

    const userAdminRepo = new UserAdminRepository();
    const userAdminServices = new UserAdminServices(userAdminRepo);

    const users = await userAdminServices.executeIndex({
      name,
      email,
    });

    res.json(users);
  }

  async show(req, res) {
    const { user_id } = req.params;

    const userAdminRepo = new UserAdminRepository();
    const userAdminServices = new UserAdminServices(userAdminRepo);

    const user = await userAdminServices.executeShow(user_id);

    res.json(user);
  }
}

module.exports = UsersAdminController;
