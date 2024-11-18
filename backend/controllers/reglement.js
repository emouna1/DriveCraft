const express = require('express');
const Payment = require('../models/reglement');
const PaymentDetails = require('../models/paymentDetails');
const PaymentMethod = require('../models/paymentMethod');


// Fetch all settlements
exports.getAllPaymentS = async (req, res, next) => {
  try {
    const settlements = await Payment.findAll({
      include: [
        {
          model: PaymentDetails,
          include: [PaymentMethod]
        }
      ]
    });
    res.status(200).json(settlements);
  } catch (error) {
    console.error('Error fetching settlements:', error);
    res.status(500).json({ message: 'An error occurred while fetching settlements.' });
  }
};
exports.getAllPaymentIn = async (req, res, next) => {
  try {
    const settlements = await Payment.findAll({
      include: [
        {
          model: PaymentDetails,
          include: [PaymentMethod]
        },
        {
          model: User // Include the User model here
        }
      ]
    });
    res.status(200).json(settlements);
  } catch (error) {
    console.error('Error fetching settlements:', error);
    res.status(500).json({ message: 'An error occurred while fetching settlements.' });
  }
};





/*exports.addPaymentS = async (req, res, next) => {
  const { date, montant, PaymentMethodId } = req.body;
  let paymentDetails;

  try {
    paymentDetails = JSON.parse(req.body.paymentDetails); // Parse the JSON string
  } catch (error) {
    return res.status(400).json({ message: 'Invalid paymentDetails format' });
  }

  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  try {
    const payment = await Payment.create({
      date,
      montant
    });
    console.log('Payment created:', payment);

    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const verificationUrl = req.file.path; // Use `path` for the uploaded file's path
    console.log('File path:', verificationUrl);

    // Check if paymentDetails is an array or object
    if (Array.isArray(paymentDetails)) {
      // If it's an array, loop over each detail
      await Promise.all(paymentDetails.map(async (detail) => {
        await PaymentDetails.create({
          montant: detail.montant,
          dateEcheance: detail.dateEcheance,
          paymentId: payment.id,
          verificationUrl: verificationUrl,
          PaymentMethodId: PaymentMethodId
        });
        console.log('Payment detail added:', detail);
      }));
    } else {
      // If it's an object, create a single payment detail entry
      await PaymentDetails.create({
        montant: paymentDetails.montant,
        dateEcheance: paymentDetails.dateEcheance,
        paymentId: payment.id,
        verificationUrl: verificationUrl,
        PaymentMethodId: PaymentMethodId
      });
      console.log('Payment detail added:', paymentDetails);
    }

    res.status(201).json({ message: 'Settlement created successfully' });
  } catch (error) {
    console.error('Error adding settlement:', error);
    res.status(500).json({ message: 'An error occurred while adding the settlement.' });
  }
};*/
exports.addPaymentS = async (req, res, next) => {
  const {  date, montant, candidatCIN } = req.body;
  let paymentDetails;
  console.log('Raw paymentDetails:', req.body.paymentDetails);
  try {
    // Parse paymentDetails from JSON string
    paymentDetails = JSON.parse(req.body.paymentDetails);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid paymentDetails format' });
  }
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);
  try {
    // Create the main payment entry
    const payment = await Payment.create({ date, montant, candidatCIN });
    console.log('Payment created:', payment);

    //if (!req.file) {
    //  throw new Error('No file uploaded');
    //}

    //const verificationUrl = req.file.path; // Use `path` for the uploaded file's path
    //console.log('File path:', verificationUrl);

    // Check if paymentDetails is an array or object
    if (Array.isArray(paymentDetails)) {
      // If it's an array, loop over each detail
      await Promise.all(paymentDetails.map(async (detail) => {
        const existingdetail = await PaymentMethod.findOne({ where: { designation: detail.paymentMethodId } });
        if (!existingdetail) {
          throw new Error(`Payment method ${paymentDetails.paymentMethodId} not found`);
        }
        await PaymentDetails.create({
          montant: detail.montant,
          dateEcheance: detail.dateEcheance,
          paymentId: payment.id,
         // verificationUrl: verificationUrl,
          PaymentMethodId: existingdetail.id // Use the correct property from detail
        });
        console.log('Payment detail added:', detail);
      }));
    } else {
      const existingdetail = await PaymentMethod.findOne({ where: { designation: paymentDetails.paymentMethodId } });
      if (!existingdetail) {
        throw new Error(`Payment method ${paymentDetails.paymentMethodId} not found`);
      }
      // If it's an object, create a single payment detail entry
      await PaymentDetails.create({
        montant: paymentDetails.montant,
        dateEcheance: paymentDetails.dateEcheance,
        paymentId: payment.id,
       // verificationUrl: verificationUrl,
        PaymentMethodId: existingdetail.id // Use the correct property from detail

      });
      console.log('Payment detail added:', paymentDetails);
    }

    res.status(201).json({ message: 'Settlement created successfully' });
  } catch (error) {
    console.error('Error adding settlement:', error);
    res.status(500).json({ message: 'An error occurred while adding the settlement.' });
  }
};






exports.editPaymentS = async (req, res, next) => {
  const settlementId = req.params.id;
  const { date, montant, paymentDetails, PaymentMethodId } = req.body;

  try {
    // Fetch the settlement to check if it's successful
    const settlement = await Payment.findByPk(settlementId);

    if (!settlement) {
      return res.status(404).json({ message: 'Settlement not found' });
    }

    if (settlement.isSuccessful) {
      return res.status(400).json({ message: 'Settlement is already successful and cannot be edited' });
    }

    // If settlement is not successful, proceed with the update
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
        PaymentMethodId: PaymentMethodId,
        verificationUrl: detail.verificationUrl // Save the file URL to the verificationUrl field
      });
    }));

    res.status(200).json({ message: 'Settlement updated successfully' });
  } catch (error) {
    console.error('Error updating settlement:', error);
    res.status(500).json({ message: 'An error occurred while updating the settlement.' });
  }
};


/*Delete a settlement
exports.deletePaymentS = async (req, res, next) => {
  const settlementId = req.params.id;

  try {
    await Payment.destroy({
      where: { id: settlementId }
    });

    res.status(200).json({ message: 'Settlement deleted successfully' });
  } catch (error) {
    console.error('Error deleting settlement:', error);
    res.status(500).json({ message: 'An error occurred while deleting the settlement.' });
  }
};
*/
exports.markPaymentS =  async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.isSuccessful = true;
    await payment.save();

    res.status(200).json({ message: 'Payment updated successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update payment status', error });
  }
};