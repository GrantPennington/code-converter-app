const express = require('express');
const Summary = require('../models/Summary');
const { createHistory, getHistory, deleteHistory } = require('../controllers/historyController');

const router = express.Router();

// Save a new summary
router.post('/', createHistory);

// Get all summaries for session
router.get('/:sessionId', getHistory);

// Delete a history entry
router.delete('/:sessionId/:historyId', deleteHistory);

module.exports = router;