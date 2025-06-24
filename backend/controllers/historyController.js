const CodeConversion = require('../models/CodeConversion');

const getHistory = async (req, res) => {
    const { sessionId } = req.params;

    try {
        const conversions = await CodeConversion.find({ sessionId }).sort({ createdAt: -1 });
        res.json(conversions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch code conversion history' });
    }
};

const deleteHistory = async (req, res) => {
    const { sessionId, historyId } = req.params;

    if (!sessionId || !historyId) {
        return res.status(400).json({ message: 'Invalid sessionId or historyId' });
    }

    try {
        const deleted = await CodeConversion.findOneAndDelete({ _id: historyId, sessionId });

        if (!deleted) {
            return res.status(404).json({ message: 'History not found or already deleted.' });
        }

        res.json(deleted);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete history' });
    }
};

module.exports = { getHistory, deleteHistory };