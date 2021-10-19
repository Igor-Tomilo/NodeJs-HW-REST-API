const { Contact } = require("../../models");

const currentUser = async (req, res) => {
  const { _id, email, subscription } = req.user;
  const contacts = await Contact.find({ owner: _id });

  res.json({
    status: "success",
    code: 200,
    data: {
      user: { _id, email, subscription },
      contacts,
    },
    message: "Success",
  });
};

module.exports = currentUser;
