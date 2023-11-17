const { handleServerError, handleClientError } = require("../helpers/handleError");
const { Brand, Phone, Transaction } = require("../models");
const joi = require("joi");
const fs = require("fs");
const path = require("path");

exports.getPhone = async (req, res) => {
  try {
    const response = await Phone.findAll();
    res.status(200).json({ data: response, message: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getPhoneID = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Phone.findOne({
      where: { id: id },
    });
    if (!response) {
      return handleClientError(res, 404, `Phone Not Found...`);
    }
    res.status(200).json({ data: response, message: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getPhoneBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Phone.findAll({
      where: { brandID: id },
    });
    if (!response) {
      return handleClientError(res, 404, `Brand Not Found...`);
    }
    res.status(200).json({ data: response, message: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.createPhone = async (req, res) => {
  try {
    const newData = req.body;
    if (req.file) {
      const imagePath = req.file.path.replace(/\\/g, "/");
      newData.image = `http://localhost:3000/${imagePath}`;
    }

    const scheme = joi.object({
      name: joi.string().required(),
      brandID: joi.number().integer().required(),
      spesification: joi.string().required(),
      image: joi.string().required(),
      price: joi.number().integer().min(0).required(),
      quantity: joi.number().integer().min(0).required(),
    });

    const { error } = scheme.validate(newData);
    if (error) {
      return handleClientError(res, 400, error.details[0].message);
    }

    const existingPhone = await Phone.findOne({ where: { name: newData.name } });
    if (existingPhone) {
      return handleClientError(res, 400, `Phone with name ${newData.name} already exist...`);
    }

    const newPhone = await Phone.create(newData);

    res.status(201).json({ data: newPhone, message: "Phone Created..." });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};

exports.editPhone = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const schema = joi.object({
      name: joi.string(),
      brandID: joi.number().integer(),
      spesification: joi.string(),
      image: joi.string(),
      price: joi.number().integer().min(0),
      quantity: joi.number().integer().min(0),
    });

    const { error } = schema.validate(updatedData);
    if (error) {
      return handleClientError(res, 400, error.details[0].message);
    }

    const phone = await Phone.findOne({ where: { id } });

    if (!phone) {
      return handleClientError(res, 404, `Phone with ID ${id} not found.`);
    }

    if (req.file) {
      const imagePath = req.file.path.replace(/\\/g, "/");
      updatedData.image = `http://localhost:3000/${imagePath}`;
      if (phone.image) {
        const oldImagePath = path.join(__dirname, "..", "uploads", phone.image.split("/").pop());
        fs.unlinkSync(oldImagePath);
      }
    }

    await phone.update(updatedData);

    res.status(200).json({ data: phone, message: "Phone updated successfully." });
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};

exports.deletePhone = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedPhone = await Phone.findOne({ where: { id: id } });

    if (!selectedPhone) {
      return res.status(404).json({ message: `Phone Not Found` });
    }
    if (selectedPhone.image) {
      const imagePath = path.join(__dirname, "..", "uploads", selectedPhone.image.split("/").pop());
      fs.unlinkSync(imagePath);
    }
    await Transaction.destroy({ where: { phoneID: id } });
    await Phone.destroy({ where: { id: id } });

    res.status(200).json({ message: "Phone have been deleted" });
  } catch (error) {
    console.error(error);
    return handleServerError(res);
  }
};
