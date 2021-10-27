const express = require("express");
const router = express.Router();

const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require("../../middlewares");

const { joiUserSchema } = require("../../models/user");
const ctrl = require("../../controllers/auth");

router.post(
  "/signup",
  validation(joiUserSchema),
  controllerWrapper(ctrl.signUp)
);

router.post(
  "/signin",
  validation(joiUserSchema),
  controllerWrapper(ctrl.signIn)
);

router.get("/signout", authenticate, controllerWrapper(ctrl.signOut));
router.get("/current", authenticate, controllerWrapper(ctrl.currentUser));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(ctrl.updateAvatar)
);

module.exports = router;
