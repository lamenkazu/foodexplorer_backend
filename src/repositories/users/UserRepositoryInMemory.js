const AppError = require("../../utils/AppError");

class UserRepositoryInMemory {
  users = [];

  create({ name, email, password }) {
    if (this.userEmailIsOnDB(email)) throw new AppError(emailExistsMassage);

    const user = {
      user_id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      password,
    };

    this.users.push(user);

    return user;
  }

  userEmailIsOnDB(email) {
    const findedUser = this.users.find((user) => user.email == email);
    return findedUser;
  }
}

const emailExistsMassage =
  "Esse email já está em uso por outro usuário e não pode ser utilizado.";

module.exports = UserRepositoryInMemory;
