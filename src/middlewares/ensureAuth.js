const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

const ensureAuthentication = (req, res, next) => {
  const authHeader = req.headers;
  if (!authHeader.cookie) throw new AppError("JWToken não informado", 401);

  const [, token] = authHeader.cookie.split("token=");

  try {
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret);

    req.user = {
      id: Number(user_id),
      role,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
};

const ensureAuthorization = (roleToVerify) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!roleToVerify.includes(role))
      throw new AppError("Não autorizado.", 401);

    return next();
  };
};

module.exports = { ensureAuthorization, ensureAuthentication };
