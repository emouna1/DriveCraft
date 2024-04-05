// paymentMethodController.js

const PaymentMethod = require('../models/paymentMethod');

exports.getAllPaymentMethods = async (req, res, next) => {
  try {
    const paymentMethods = await PaymentMethod.findAll();
    res.status(200).json(paymentMethods);
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({message: 'An error occurred while fetching payment methods.'});
  }
};

// Other controller functions for CRUD operations on Payment Methods

exports.addpayMethod = async (req, res, next) => {
  const paymentData = req.body;

  try {
    const newpM = await PaymentMethod.create(paymentData);
    res.status(201).json(newpM);
  } catch (error) {
    console.error('Error adding a new payment method:', error);
    res.status(500).json({message: 'An error occurred while adding !'});
  }
};

exports.updatepayMethod = async (req, res, next) => {
  const {method} = req.params;
  const updatedData = req.body;

  try {
    const [updatedRows] = await PaymentMethod.update(updatedData, {
      where: {method: method}
    });

    if (updatedRows === 0) {
      return res.status(404).json({message: ' not found.'});
    }

    res.status(200).json({message: ' updated successfully.'});
  } catch (error) {
    console.error('Error updating', error);
    res.status(500).json({message: 'An error occurred while updating.'});
  }
};

exports.deletepayMethod = async (req, res, next) => {
  const {method} = req.params;

  try {
    const deletedRows = await PaymentMethod.destroy({
      where: {method: method}
    });

    if (deletedRows === 0) {
      return res.status(404).json({message: 'not found.'});
    }

    res.status(200).json({message: 'deleted successfully.'});
  } catch (error) {
    console.error('Error deleting', error);
    res.status(500).json({message: 'An error occurred while deleting.'});
  }
};


