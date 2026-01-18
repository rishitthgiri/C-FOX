const express = require('express');
const { body, param } = require('express-validator');
const financialController = require('../controllers/financialController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validation');

const router = express.Router();

router.use(authMiddleware);

router.post(
  '/companies',
  [
    body('companyName').trim().notEmpty(),
    body('stage').isIn(['pre-seed', 'seed', 'series-a', 'series-b']),
    body('teamSize').isInt({ min: 1 }),
    body('currentCash').isFloat({ min: 0 }),
    body('growthTarget').isFloat({ min: 0 }),
    body('industry').trim().notEmpty(),
    validate
  ],
  financialController.createCompany
);

router.get('/companies', financialController.getCompanies);

router.get('/companies/:id', financialController.getCompany);

router.put(
  '/companies/:id',
  [
    body('companyName').trim().notEmpty(),
    body('stage').isIn(['pre-seed', 'seed', 'series-a', 'series-b']),
    body('teamSize').isInt({ min: 1 }),
    body('currentCash').isFloat({ min: 0 }),
    body('growthTarget').isFloat({ min: 0 }),
    body('industry').trim().notEmpty(),
    validate
  ],
  financialController.updateCompany
);

router.delete('/companies/:id', financialController.deleteCompany);

router.post(
  '/upload',
  [
    body('companyId').notEmpty(),
    body('data').isArray({ min: 1 }),
    validate
  ],
  financialController.uploadFinancialData
);

router.get('/metrics/:id', financialController.getMetrics);

router.get('/forecast/:id', financialController.getForecast);

module.exports = router;