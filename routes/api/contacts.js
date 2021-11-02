const express = require("express");
const router = express.Router();

const {
  authenticate,
  controllerWrapper,
  validation,
} = require("../../middlewares");

const {
  joiContactSchema,
  updateContactStatusSchema,
} = require("../../models/contact");

const ctrl = require("../../controllers/contacts");

router.get("/", controllerWrapper(ctrl.listContacts));

router.get("/:contactId", controllerWrapper(ctrl.getContactById));

router.post(
  "/",
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(ctrl.addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  controllerWrapper(ctrl.removeContact)
);

router.put(
  "/:contactId",
  authenticate,
  validation(joiContactSchema),
  controllerWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validation(updateContactStatusSchema),
  controllerWrapper(ctrl.updateContactStatus)
);

module.exports = router;
