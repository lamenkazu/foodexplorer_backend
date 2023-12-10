const UserRepositoryInMemory = require("../../repositories/users/UserRepositoryInMemory");
const UserServices = require("./UserServices");
const AppError = require("../../utils/AppError");

describe("UserServices", () => {
  let userRepo = null;
  let userServices = null;

  beforeEach(() => {
    userRepo = new UserRepositoryInMemory();
    userServices = new UserServices(userRepo);
  });

  test("user should be created", async () => {
    const user = {
      name: "Jane Doe",
      email: "jane@mail.com",
      password: "123",
    };

    const createdUser = await userServices.executeCreate(user);

    expect(createdUser).toHaveProperty("user_id");
  });

  test("user should not be created if email alredy exists", async () => {
    const user1 = {
      name: "Jane Doe 1",
      email: "jane@mail.com",
      password: "123",
    };

    const user2 = {
      name: "Jane Doe 2",
      email: "jane@mail.com",
      password: "456",
    };

    await userServices.executeCreate(user1);
    await expect(userServices.executeCreate(user2)).rejects.toEqual(
      new AppError(
        "Esse email já está em uso por outro usuário e não pode ser utilizado."
      )
    );
  });
});
