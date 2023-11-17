const { handleServerError, handleClientError } = require("../helpers/handleError");
const { Brand, Phone } = require("../models");
const joi = require("joi");

exports.getBrand = async (req, res) => {
  try {
    const response = await Brand.findAll({
      include: Phone,
    });
    res.status(200).json({ data: response, message: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getBrandID = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Brand.findOne({
      include: Phone,
      where: { id: id },
    });
    if (!response) {
      return handleClientError(res, 404, `Brand Not Found...`);
    }
    res.status(200).json({ data: response, message: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.createBrand = async (req, res) => {
  try {
    const newData = req.body;
    const scheme = joi.object({
      name: joi.string().required(),
    });

    const { error } = scheme.validate(newData);
    if (error) {
      return handleClientError(res, 400, error.details[0].message);
    }

    const existingBrand = await Brand.findOne({ where: { name: newData.name } });
    if (existingBrand) {
      return handleClientError(res, 400, `Brand with name ${newData.name} already exist...`);
    }

    const newBrand = await Brand.create(newData);

    res.status(201).json({ data: newBrand, message: "Brand Created..." });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.editBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const scheme = joi.object({
      name: joi.string().required(),
    });
    const { error } = scheme.validate(newData);
    if (error) {
      return handleClientError(res, 400, error.details[0].message);
    }

    const selectedBrand = await Brand.findOne({ where: { id: id } });
    if (!selectedBrand) {
      return handleClientError(res, 404, `Brand Not Found`);
    }
    const updatedBrand = await Brand.update(newData, { where: { id: id } });

    res.status(200).json({ message: "Brand Updated..." });
  } catch (error) {
    return handleServerError(res);
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedBrand = await Brand.findOne({ where: { id: id } });

    if (!selectedBrand) {
      return handleClientError(res, 404, `Brand Not Found`);
    }

    const phones = await Phone.findAll({ where: { brandID: id } });

    for (const phone of phones) {
      await phone.destroy({ where: { id: phone.id } });
    }

    await Brand.destroy({ where: { id: id } });

    res.status(200).json({ message: "Brand have been deleted" });
  } catch (error) {
    return handleServerError(res);
  }
};
