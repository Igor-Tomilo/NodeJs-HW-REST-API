const currentUser = require("./currentUser");
const signIn = require("./signIn");
const signOut = require("./signOut");
const signUp = require("./signUp");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const reVerifyEmail = require("./reVerifyEmail");

module.exports = {
  currentUser,
  signIn,
  signOut,
  signUp,
  updateAvatar,
  verifyEmail,
  reVerifyEmail,
};
