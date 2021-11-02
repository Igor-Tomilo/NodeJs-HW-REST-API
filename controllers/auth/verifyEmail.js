const { User } = require("../../models");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res) => {
  const { verifyToken } = req.params;

  const user = await User.findOne({ verifyToken });

  if (!user) {
    throw new NotFound("User does not exist or is not verified");
  }

  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });

  res.json({
    status: "success",
    code: 200,
    message: "Email verified successfully",
  });
};

module.exports = verifyEmail;
