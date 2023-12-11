const UserRepository = require("../repositories/users/UserRepository");
const UserServices = require("../services/users/UserServices");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const userRepo = new UserRepository();
    const userServices = new UserServices(userRepo);

    const newUserId = await userServices.executeCreate({
      name,
      email,
      password,
    });

    return res.status(201).json(newUserId);
  }

  async update(req, res) {}

  async delete(req, res) {}

  async validate(req, res) {
    const { user } = req;

    const userRepo = new UserRepository();
    const userServices = new UserServices(userRepo);

    const existentUserId = await userServices.executeValidate(user.id);

    return res.json(existentUserId);
  }
}

module.exports = UsersController;
