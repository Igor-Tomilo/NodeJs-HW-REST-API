const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempPath, originalname } = req.file;
  const uploadPath = path.join(avatarsDir, `${_id}`);
  const avatarPath = path.join(uploadPath, originalname);

  const [extn, name] = originalname.split(".").reverse();
  const avatarURL = path.join("/avatars", `${name}-${_id}.${extn}`);

  try {
    const readFile = await Jimp.read(tempPath);
    await readFile.resize(250, 250).write(tempPath);
    await fs.mkdir(uploadPath);
    await fs.rename(tempPath, avatarPath);
    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
    res.json({
      status: "success",
      code: 200,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempPath);
    throw error;
  }
};

module.exports = updateAvatar;
