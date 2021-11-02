const { User } = require("../../models");
const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../utils");
const gravatar = require("gravatar");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const defaultImage = gravatar.url(email, { s: "250" }, true);

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} in use`);
  }

  const verifyToken = nanoid();
  const newUser = new User({ email, avatarURL: defaultImage, verifyToken });
  newUser.setPassword(password);
  await newUser.save();

  const data = {
    to: email,
    subject: "Confirmation of registration",
    html: `<p>Please, confirm your email <a href="http://localhost:3000/api/users/verify/${verifyToken}" target="_blank">${email}</a> to start using app</p>`,
  };

  const fromEmail = "igoramf1806@gmail.com";

  await sendEmail(data, fromEmail);

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
