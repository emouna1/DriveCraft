const Payment = require('../models/reglement');

exports.getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({message: 'An error occurred while fetching payments.'});
  }
};

exports.addPayment = async (req, res, next) => {
  const paymentData = req.body;

  try {
    const newPayment = await Payment.create(paymentData);
    res.status(201).json(newPayment);
  } catch (error) {
    console.error('Error adding a new payment:', error);
    res.status(500).json({message: 'An error occurred while adding a new payment.'});
  }
};

exports.updatePayment = async (req, res, next) => {
  const {id} = req.params;
  const updatedData = req.body;

  try {
    const [updatedRows] = await Payment.update(updatedData, {
      where: {id: id}
    });

    if (updatedRows === 0) {
      return res.status(404).json({message: 'Payment not found.'});
    }

    res.status(200).json({message: 'Payment updated successfully.'});
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({message: 'An error occurred while updating payment.'});
  }
};

exports.deletePayment = async (req, res, next) => {
  const {id} = req.params;

  try {
    const deletedRows = await Payment.destroy({
      where: {id: id}
    });

    if (deletedRows === 0) {
      return res.status(404).json({message: 'Payment not found.'});
    }

    res.status(200).json({message: 'Payment deleted successfully.'});
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({message: 'An error occurred while deleting payment.'});
  }
};
