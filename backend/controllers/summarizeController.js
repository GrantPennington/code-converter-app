const { getChatGPTSummary } = require('../services/openaiService');

const summarizeText = async (req, res, options = {}) => {
    const { text, style = 'default' } = req.body || {};
    
    if (!text) return res.status(400).json({ error: 'No text provided.' })

    if (text.length > 2000) { // limit text input for demo version
        return res.status(400).json({ message: 'Input too long for demo version.' });
    }

    try {
        const summary = await getChatGPTSummary(text, style);

        if(options.returnOnly) {
            return { summary }; // for internal use
        }

        res.json({ summary }); // default API behavior
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { summarizeText };