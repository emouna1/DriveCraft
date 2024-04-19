const Payment = require('../models/reglement');
const PaymentDetails = require('../models/paymentDetails');
const PaymentMethod = require('../models/paymentMethod');

/*exports.createPaymentSettlement = async (req, res) => {
  try {
    // Extract payment information from the request body
    const { candidatCIN, paymentDate, paymentAmount, paymentMethod } = req.body;

    // Create the payment settlement with the provided information
    const payment = await Payment.create({
        userCIN:candidatCIN,
        date : paymentDate,
        montant: paymentAmount
    });

    // Create a payment detail associated with this payment settlement
    await PaymentDetails.create({
      montant: amount,
      dateEcheance: date,
      PaymentId: payment.id, // Link the payment detail with the newly created payment settlement
      PaymentMethod: paymentMethod // Link the payment detail with the selected payment method
    });

    await PaymentMethod.create({
        id:PaymentDetails.PaymentMethodId  
       
    })

    res.status(201).json({ message: 'Payment settlement created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/

exports.createPaymentSettlement = async (req, res) => {
  try {
    // Extract payment information from the request body
    const { candidatCIN, paymentDate, paymentAmount, paymentMethod } = req.body;

    // Retrieve the ID of the payment method based on its designation
    const method = await PaymentMethod.findOne({
      where: {
        designation: paymentMethod
      }
    });

    if (!method) {
      return res.status(404).json({ error: 'Payment method not found' });
    }

    // Create the payment settlement with the provided information
    const payment = await Payment.create({
      userCIN: candidatCIN,
      date: paymentDate,
      montant: paymentAmount
    });

    // Create a payment detail associated with this payment settlement
    await PaymentDetails.create({
      montant: paymentAmount,
      dateEcheance: paymentDate,
      PaymentId: payment.id, // Link the payment detail with the newly created payment settlement
      PaymentMethodId: method.id // Link the payment detail with the selected payment method ID
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

