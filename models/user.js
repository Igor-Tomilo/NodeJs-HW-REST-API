const { Schema, model } = require("mongoose");
const { validationMessage, emailRegExp } = require("./validationExp");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegExp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiUserSchema = Joi.object({
  password: Joi.string().min(6).required().messages(validationMessage),
  email: Joi.string()
    .email()
    .required()
    .pattern(emailRegExp)
    .messages(validationMessage),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
  avatarURL: Joi.string(),
});

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password);
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.createToken = function () {
  const payload = {
    _id: this._id,
  };
  return jwt.sign(payload, SECRET_KEY);
};

const User = model("user", userSchema);

module.exports = { User, joiUserSchema };
