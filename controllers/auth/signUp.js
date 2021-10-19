const { User } = require("../../models");
const { Conflict } = require("http-errors");

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} already register`);
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  await newUser.save();

  res.json({
    status: "success",
    code: 201,
    data: {
      user: newUser
    },
    message: "Success signup",
  });
};

module.exports = signUp;
