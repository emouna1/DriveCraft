// routes.js

const express = require('express');
const foldersRouter = express.Router();
const carMaintenance = require('../controllers/carMaintenance');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

//router.post('/add-payment', upload.single('file'), paymentsController.addPaymentS);

// Define routes for car maintenance
foldersRouter.get('/getAllM', [], carMaintenance.getAllCarMaintenance);
foldersRouter.post('/addM', [], carMaintenance.addM);
foldersRouter.put('/updateM/:code', [], carMaintenance.updateM);
foldersRouter.delete('/deleteM/:code', [], carMaintenance.deleteM);

const paymentM = require('../controllers/paymentC');

// Define routes for payment methods
foldersRouter.get('/getAllpaymentMethods', [], paymentM.getAllPaymentMethods);
foldersRouter.post('/addpayMethod', [], paymentM.addpayMethod);
foldersRouter.put('/updatepayMethod/:id', [], paymentM.updatepayMethod);
foldersRouter.delete('/deletepayMethod/:id', [], paymentM.deletepayMethod);




const LicenseCategory = require('../controllers/licenseCategory');

// Define routes for License category methods
foldersRouter.get('/getAllLc', [], LicenseCategory.getAllLicenseCategories);
foldersRouter.post('/addLc', [], LicenseCategory.addLicenseCategory);
foldersRouter.put('/updateLc/:code', [], LicenseCategory.updateLicenseCategory);
foldersRouter.delete('/deleteLc/:code', [], LicenseCategory.deleteLicenseCategory);
foldersRouter.get('/registration-fees/:registrationType/:categoryCode', LicenseCategory.getRegistrationFees);

const paymentS = require('../controllers/reglement');

foldersRouter.get('/getAllPaymentS', [], paymentS.getAllPaymentS);
foldersRouter.get('/getAllPaymentsForAdmin', [], paymentS.getAllPaymentIn);

//[] in the middle is unnecessary unless you intend to add some middleware in the future.
foldersRouter.post('/addPaymentS', upload.single('file'), paymentS.addPaymentS);
foldersRouter.put('/editPaymentS/:id', [], paymentS.editPaymentS);
//foldersRouter.delete('/deletePaymentS/:id', [], paymentS.deletePaymentS);

foldersRouter.put('/:id/success', [], paymentS.markPaymentS);

const enrollmentPayment = require('../controllers/enrollmentPayments')
foldersRouter.post('/paymentSettlement', [], enrollmentPayment.createPaymentSettlement);


module.exports = foldersRouter;
