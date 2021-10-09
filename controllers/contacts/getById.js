const service = require('../../service/index')

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const allContacts = await service.listContacts()
    if (allContacts.map((item) => String(item.id)).includes(contactId)) {
      const selectContact = await service.getContactById(contactId)
      return res.json({
        status: 'success',
        code: 200,
        data: {
          result: selectContact,
        },
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

module.exports = getContactById
