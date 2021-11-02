const { User } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "_id email password verify");

  if (!user || !user.verify) {
    throw new NotFound(`User with email ${email} does not exist or not verified`);
  }

  if (!user.comparePassword(password)) {
    throw new BadRequest("Invalid password");
  }

  const { _id } = user;
  const token = user.createToken();
  const updateUser = await User.findByIdAndUpdate(_id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      user: updateUser,
    },
    message: "Success signin",
  });
};

module.exports = signIn;
