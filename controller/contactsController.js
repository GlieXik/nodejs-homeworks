const service = require("../services/contactsServices");
const get = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const results = await service.listContacts(_id);
    res.status(200).json(results);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  try {
    const result = await service.getContactById(contactId, _id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { _id } = req.user;
  const body = req.body;
  try {
    const result = await service.addContact(body, _id);

    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const body = req.body;
  try {
    const result = await service.updateContact(contactId, body);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;

  try {
    const result = await service.removeContact(contactId,_id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const updateStatusContact = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const { favorite = false } = req.body;

  try {
    const result = await service.updateContact(contactId, { favorite });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        message: `Not found`,
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};
module.exports = {
  get,
  getById,
  create,
  update,
  updateStatusContact,
  remove,
};