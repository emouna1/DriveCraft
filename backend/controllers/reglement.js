const express = require('express');
const router = express.Router();
const Payment = require('../models/reglement');
const PaymentDetails = require('../models/paymentDetails');
const PaymentMethod = require('../models/paymentMethod');


// Fetch all settlements
exports.getAllPaymentS = async (req, res, next) => {
  try {
    const settlements = await Payment.findAll({
      include: PaymentDetails
    });
    res.status(200).json(settlements);
  } catch (error) {
    console.error('Error fetching settlements:', error);
    res.status(500).json({message: 'An error occurred while fetching settlements.'});
  }
};

// Add a new settlement
exports.addPaymentS = async (req, res, next) => {
  const { date, montant, paymentDetails } = req.body;

  try {
    const payment = await Payment.create({
      date,
      montant
    });

    await Promise.all(paymentDetails.map(async (detail) => {
      await PaymentDetails.create({
        montant: detail.montant,
        dateEcheance: detail.dateEcheance,
        paymentId: payment.id
      });
    }));

    res.status(201).json({message: 'Settlement created successfully'});
  } catch (error) {
    console.error('Error adding settlement:', error);
    res.status(500).json({message: 'An error occurred while adding the settlement.'});
  }
};

// Update a settlement
exports.editPaymentS = async (req, res, next) => {
  const settlementId = req.params.id;
  const { date, montant, paymentDetails } = req.body;

  try {
    await Payment.update({
      date,
      montant
    }, {
      where: { id: settlementId }
    });

    await PaymentDetails.destroy({
      where: { paymentId: settlementId }
    });

    await Promise.all(paymentDetails.map(async (detail) => {
      await PaymentDetails.create({
        montant: detail.montant,
        dateEcheance: detail.dateEcheance,
        paymentId: settlementId,
        PaymentMethodId:detail.PaymentMethodId
      });
    }));

    res.status(200).json({message: 'Settlement updated successfully'});
  } catch (error) {
    console.error('Error updating settlement:', error);
    res.status(500).json({message: 'An error occurred while updating the settlement.'});
  }
};

// Delete a settlement
exports.deletePaymentS = async (req, res, next) => {
  const settlementId = req.params.id;

  try {
    await Payment.destroy({
      where: { id: settlementId }
    });

    res.status(200).json({message: 'Settlement deleted successfully'});
  } catch (error) {
    console.error('Error deleting settlement:', error);
    res.status(500).json({message: 'An error occurred while deleting the settlement.'});
  }
};
