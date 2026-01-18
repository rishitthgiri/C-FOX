const express = require('express');
const { body } = require('express-validator');
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validation');

const router = express.Router();

router.use(authMiddleware);

router.post(
  '/ask',
  [
    body('question').trim().notEmpty(),
    body('financialData').isArray(),
    body('businessContext').isObject(),
    body('metrics').isObject(),
    validate
  ],
  aiController.askQuestion
);

module.exports = router;