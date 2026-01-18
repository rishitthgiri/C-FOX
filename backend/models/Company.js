const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  stage: {
    type: String,
    required: true,
    enum: ['pre-seed', 'seed', 'series-a', 'series-b']
  },
  teamSize: {
    type: Number,
    required: true,
    min: 1
  },
  currentCash: {
    type: Number,
    required: true,
    min: 0
  },
  growthTarget: {
    type: Number,
    required: true,
    min: 0
  },
  industry: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

companySchema.index({ userId: 1 });

module.exports = mongoose.model('Company', companySchema);