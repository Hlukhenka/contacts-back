/** @format */

const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    number: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: false }
);

contactSchema.post("save", handleMongooseError);
const Contact = model("contact", contactSchema);

const getSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .min(4)
    .max(30),
  number: Joi.string().min(6).max(6),
});

const registerSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .min(4)
    .max(30)
    .required(),
  number: Joi.string().min(6).max(6).required(),
});

const schemas = {
  registerSchema,
  getSchema,
};

module.exports = { schemas, Contact };
