// server/models/Summary.js
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const summarySchema = new Schema({
  sessionId: { type: String, required: true },
  originalText: { type: String, required: true },
  summary: { type: String, required: true },
  style: { type: String, default: 'default' },
  filename: { type: String },
  filetype: { type: String },
  wordCount: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('Summary', summarySchema);