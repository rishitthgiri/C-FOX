const mongoose = require('mongoose');

const financialDataSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  month: {
    type: String,
    required: true
  },
  revenue: {
    type: Number,
    required: true,
    min: 0
  },
  expenses: {
    type: Number,
    required: true,
    min: 0
  },
  goalRevenue: {
    type: Number,
    required: true,
    min: 0
  },
  timeline: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

financialDataSchema.index({ companyId: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('FinancialData', financialDataSchema);