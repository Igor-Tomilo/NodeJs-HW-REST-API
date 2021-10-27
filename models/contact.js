const { Schema, SchemaTypes, model } = require("mongoose");
const Joi = require("joi");
const {
  validationMessage,
  emailRegExp,
  phoneRegExp,
} = require("./validationExp");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegExp,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: phoneRegExp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages(validationMessage),
  email: Joi.string()
    .email()
    .pattern(emailRegExp)
    .required()
    .messages(validationMessage),
  phone: Joi.string()
    .min(7)
    .pattern(phoneRegExp)
    .required()
    .messages(validationMessage),
  favorite: Joi.boolean(),
});

const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required().messages(validationMessage),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiContactSchema,
  updateContactStatusSchema,
};
