const { handleServerError, handleClientError } = require("../helpers/handleError");
const { tokenData } = require("../helpers/tokenData");
const { Brand, Phone, User, Transaction } = require("../models");
const joi = require("joi");
const jwt = require("jsonwebtoken");

exports.getTransaction = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const response = await User.findOne({
      where: { id: decoded.data.id },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Transaction,
          include: [
            {
              model: Phone,
            },
          ],
        },
      ],
    });
    res.status(200).json({ data: response, message: "Success" });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newData = req.body;
    const scheme = joi.object({
      phoneIDs: joi.array().min(1).required(),
      qtys: joi.array().min(1).required(),
    });

    const { error } = scheme.validate(newData);
    if (error) {
      return handleClientError(res, 400, error.details[0].message);
    }
    const phoneIDs = newData.phoneIDs;
    const qtys = newData.qtys;

    if (phoneIDs.length !== qtys.length) {
      return handleClientError(res, 400, "Phone IDs and quantities must have the same number of elements.");
    }

    for (let i = 0; i < phoneIDs.length; i++) {
      const phoneID = phoneIDs[i];
      const qty = qtys[i];

      const existingPhone = await Phone.findOne({ where: { id: phoneID } });
      if (!existingPhone) {
        return handleClientError(res, 404, `Phone not found...`);
      }

      if (existingPhone.quantity < qty) {
        return handleClientError(res, 404, `${existingPhone.name} sold out...`);
      }
    }

    for (let i = 0; i < phoneIDs.length; i++) {
      const phoneID = phoneIDs[i];
      const qty = qtys[i];

      const phone = await Phone.findOne({ where: { id: phoneID } });

      await Phone.update({ quantity: phone.quantity - qty }, { where: { id: phoneID } });

      const transactionData = {
        phoneID: phoneID,
        userID: decoded.data.id,
        qty: qty,
        total: phone.price * qty,
      };
      await Transaction.create(transactionData);
    }

    res.status(201).json({ message: "Transaction created successfully." });
  } catch (error) {
    return handleServerError(res);
  }
};
