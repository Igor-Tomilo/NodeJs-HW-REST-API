const { User } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");
const { sendEmail } = require("../../utils");

const reVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound(`User with email ${email} does not exist`);
  }

  if (user.verify && !user.verifyToken) {
    throw new BadRequest("Verification has already been passed");
  }

  const data = {
    to: email,
    subject: "Confirmation of registration",
    html: `<p>Please, confirm your email <a href="http://localhost:3000/api/users/verify/${user.verifyToken}" target="_blank">${email}</a> to start using app</p>`,
  };

  const fromEmail = "igoramf1806@gmail.com";

  await sendEmail(data, fromEmail);

  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = reVerifyEmail;
