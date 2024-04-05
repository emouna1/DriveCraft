// routes.js

const express = require('express');
const foldersRouter = express.Router();
const carMaintenance = require('../controllers/carMaintenance');


// Define routes for car maintenance
foldersRouter.get('/getAllM', [], carMaintenance.getAllCarMaintenance);
foldersRouter.post('/addM', [], carMaintenance.addM);
foldersRouter.put('/updateM/:code', [], carMaintenance.updateM);
foldersRouter.delete('/deleteM/:code', [], carMaintenance.deleteM);

const paymentM = require('../controllers/paymentC');

// Define routes for payment methods
foldersRouter.get('/getAllPaymentMethods', [], paymentM.getAllPaymentMethods);
foldersRouter.post('/addpayMethod', [], paymentM.addpayMethod);
foldersRouter.put('/updatepayMethod/:method', [], paymentM.updatepayMethod);
foldersRouter.delete('/deletepayMethod/:method', [], paymentM.deletepayMethod);

const LicenseCategory = require('../controllers/licenseCategory');

// Define routes for License category methods
foldersRouter.get('/getAllLc', [], LicenseCategory.getAllLicenseCategories);
foldersRouter.post('/addLc', [], LicenseCategory.addLicenseCategory);
foldersRouter.put('/updateLc/:code', [], LicenseCategory.updateLicenseCategory);
foldersRouter.delete('/deleteLc/:code', [], LicenseCategory.deleteLicenseCategory);


module.exports = foldersRouter;
