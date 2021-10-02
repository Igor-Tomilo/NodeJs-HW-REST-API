const fs = require('fs').promises
const path = require('path')
const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const findContact = contacts.find((item) => String(item.id) === contactId)
  return findContact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const filteredContact = contacts.filter(
    (item) => String(item.id) !== contactId
  )
  const str = JSON.stringify(filteredContact)
  await fs.writeFile(contactsPath, str)
}

const addContact = async (newContact) => {
  const contacts = await listContacts()
  const newContacts = [...contacts, newContact]
  const str = JSON.stringify(newContacts)
  await fs.writeFile(contactsPath, str)
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const index = contacts.findIndex((item) => String(item.id) === contactId)
  const updatedContact = { ...contacts[index], ...body }
  contacts[index] = updatedContact
  const str = JSON.stringify(contacts)
  await fs.writeFile(contactsPath, str)
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
