const Summary = require('../models/Summary');

const createHistory = async (req, res) => {
    const { sessionId, originalText, summary, style, filename, filetype, wordCount } = req.body;
    try {
        const saved = await Summary.create({ sessionId, originalText, summary, style, filename, filetype, wordCount });
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save summary' });
    }
}

const getHistory = async (req, res) => {
    const { sessionId } = req.params;
    
    try {
        const summaries = await Summary.find({ sessionId }).sort({ createdAt: -1 });
        res.json(summaries);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
}

const deleteHistory = async (req, res) => {
    const { sessionId, historyId } = req.params;

    if (!sessionId || !historyId) return res.status(400).json({ message: 'Invalid sessionId or historyId' });
    
    try {
        const deleted = await Summary.findOneAndDelete({ _id: historyId, sessionId });

        if (!deleted) {
            return res.status(404).json({ message: "History not found or already deleted." })
        }
        
        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete history' });
    }
}

module.exports = { createHistory, getHistory, deleteHistory }