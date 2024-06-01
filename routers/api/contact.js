/** @format */

const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contact");
const { schemas } = require("../../models/contact");
const { validateBody } = require("../../middlewares");

router.get("/contact", validateBody(schemas.getSchema), ctrl.getContact);
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.registerContact
);

module.exports = router;
