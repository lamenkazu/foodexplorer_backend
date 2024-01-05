require("dotenv/config");
require("express-async-errors");
const AppError = require("./utils/AppError");

const dishImgConfig = require("./configs/dishImage");

const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://foodexplorer-frontend-3cc695.netlify.app",
    ],
    credentials: true,
  })
);
app.use(routes);
app.use("/files", express.static(dishImgConfig.UPLOADS_MENU_FOLDER));

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  console.log(err);

  return res.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
});

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`api runing on port ${port}!`));
