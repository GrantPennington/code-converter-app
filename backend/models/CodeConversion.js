const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const codeConversionSchema = new Schema({
  sessionId: { type: String, required: true },
  originalCode: { type: String, required: true },
  convertedCode: { type: String },
  sourceLanguage: { type: String, required: true },
  targetLanguage: { type: String, required: true },
  filename: { type: String },
  filetype: { type: String },
  wordCount: { type: Number },
  textSource: { type: String, enum: ['manual', 'file'], default: 'manual' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('CodeConversion', codeConversionSchema);