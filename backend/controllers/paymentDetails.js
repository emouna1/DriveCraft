const PaymentDetails = require('../models/paymentDetails');

exports.getAllPaymentDetails = async (req, res, next) => {
  try {
    const paymentDetails = await PaymentDetails.findAll();
    res.status(200).json(paymentDetails);
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({message: 'An error occurred while fetching payment details.'});
  }
};

exports.addPaymentDetail = async (req, res, next) => {
  const paymentDetailData = req.body;

  try {
    const newPaymentDetail = await PaymentDetails.create(paymentDetailData);
    res.status(201).json(newPaymentDetail);
  } catch (error) {
    console.error('Error adding a new payment detail:', error);
    res.status(500).json({message: 'An error occurred while adding a new payment detail.'});
  }
};

exports.updatePaymentDetail = async (req, res, next) => {
  const {id} = req.params;
  const updatedData = req.body;

  try {
    const [updatedRows] = await PaymentDetails.update(updatedData, {
      where: {id: id}
    });

    if (updatedRows === 0) {
      return res.status(404).json({message: 'Payment detail not found.'});
    }

    res.status(200).json({message: 'Payment detail updated successfully.'});
  } catch (error) {
    console.error('Error updating payment detail:', error);
    res.status(500).json({message: 'An error occurred while updating payment detail.'});
  }
};

exports.deletePaymentDetail = async (req, res, next) => {
  const {id} = req.params;

  try {
    const deletedRows = await PaymentDetails.destroy({
      where: {id: id}
    });

    if (deletedRows === 0) {
      return res.status(404).json({message: 'Payment detail not found.'});
    }

    res.status(200).json({message: 'Payment detail deleted successfully.'});
  } catch (error) {
    console.error('Error deleting payment detail:', error);
    res.status(500).json({message: 'An error occurred while deleting payment detail.'});
  }
};
