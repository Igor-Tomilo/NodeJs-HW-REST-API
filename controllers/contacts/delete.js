const contacts = require('../../model/index')

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const allContacts = await contacts.listContacts()
    if (allContacts.map((item) => String(item.id)).includes(contactId)) {
      await contacts.removeContact(contactId)
      return res.status(200).json({
        status: 'success',
        code: '200',
        message: 'contact deleted',
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = deleteContact
