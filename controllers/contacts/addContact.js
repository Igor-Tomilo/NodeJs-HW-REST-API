const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const result = await Contact.create({ ...req.body, owner: req.user._id });

  res.json({
    status: "success",
    code: 201,
    data: { result },
    message: "Contact added",
  });
};

module.exports = addContact;
