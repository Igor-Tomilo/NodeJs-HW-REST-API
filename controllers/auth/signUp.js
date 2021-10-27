const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const defaultImage = gravatar.url(email, { s: "250" }, true);

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }

  const newUser = new User({ email, avatarURL: defaultImage });
  newUser.setPassword(password);
  await newUser.save();

  res.json({
    status: "success",
    code: 201,
    data: {
      user: newUser,
    },
    message: "Success signup",
  });
};

module.exports = signUp;
