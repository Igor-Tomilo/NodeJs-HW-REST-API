const service = require('../../service/index')
const { newContactSchema } = require('../../utils/validate/schemas/contact')

const addContact = async (req, res, next) => {
  try {
    const { error } = newContactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'missing required name field',
      })
    }
    const { favorite } = req.body
    const data = favorite ? req.body : { ...req.body, favorite: false }
    const newContact = await service.addContact(data)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result: newContact,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
