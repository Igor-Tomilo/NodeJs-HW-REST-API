const Joi = require('joi')

const newContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(7).required(),
})

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().optional(),
  phone: Joi.string().min(7).optional(),
})

module.exports = {
  newContactSchema,
  updateContactSchema,
}
