const Contact = require('./schema/contact.js')

const listContacts = () => {
  return Contact.find()
}

const getContactById = (contactId) => {
  return Contact.findOne({ _id: contactId })
}

const removeContact = (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId })
}

const addContact = (body) => {
  return Contact.create(body)
}

const updateContact = (contactId, fields) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, fields, { new: true })
}

const updateStatusContact = (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true })
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
