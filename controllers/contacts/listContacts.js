const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const results = await Contact.find({});

  res.json({
    status: "success",
    code: 200,
    data: { results },
  });
};

module.exports = listContacts;
