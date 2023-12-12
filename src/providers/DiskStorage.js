const fs = require("fs");
const path = require("path");
const dishImgConfig = require("../configs/dishImage");

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(dishImgConfig.TMP_FOLDER, file),
      path.resolve(dishImgConfig.UPLOADS_MENU_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(dishImgConfig.UPLOADS_MENU_FOLDER, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;
