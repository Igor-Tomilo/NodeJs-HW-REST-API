const service = require('../../service/index')

const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await service.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: allContacts,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAllContacts
