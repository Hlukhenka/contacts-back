/** @format */
const { ctrlWrapper, HttpError } = require("../helpers");
const { Contact } = require("../models/contact");

let currentTimeout = null;

const getContact = async (req, res) => {
  const { email, number } = req.query;

  if (!email && !number) {
    return res.status(404).json({ message: "Not found" });
  }

  let query = {};

  if (email) {
    query.email = email;
  }
  if (number) {
    query.number = number;
  }

  if (currentTimeout) {
    clearTimeout(currentTimeout);
    currentTimeout = null;
  }

  currentTimeout = setTimeout(async () => {
    try {
      const result = await Contact.find(query);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
    currentTimeout = null;
  }, 5000);

};

const registerContact = async (req, res) => {
  const { email, number } = req.body;

  const contact = await Contact.findOne({ number });

  if (contact && contact.number) {
    throw HttpError(409, "Number alredy in use");
  }

  const newContact = {
    email,
    number,
  };

  const result = await Contact.create(newContact);

  res.status(201).json(result);
};

module.exports = {
  getContact: ctrlWrapper(getContact),
  registerContact: ctrlWrapper(registerContact),
};
