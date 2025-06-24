const { getCodeConversion } = require('../services/openaiService');
const CodeConversion = require('../models/CodeConversion');

const convertCode = async (req, res, options = {}) => {
    const {
        sessionId,
        originalCode,
        sourceLanguage = 'unspecified',
        targetLanguage,
        textSource = 'manual', // new field
        filename,
        filetype,
        wordCount,
    } = req.body || {};

    // Validate input
    if (!sessionId || !originalCode || !targetLanguage) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    if (originalCode.length > 3000) {
        return res.status(400).json({ message: 'Code too long for demo version.' });
    }

    try {
        const convertedCode = await getCodeConversion(originalCode, sourceLanguage, targetLanguage);

        // Save to database
        const newConversion = await CodeConversion.create({
            sessionId,
            originalCode,
            convertedCode,
            sourceLanguage,
            targetLanguage,
            textSource,
            filename,
            filetype,
            wordCount,
        });

        if (options.returnOnly) {
            return { convertedCode };
        }

        res.status(200).json(newConversion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Code conversion failed.' });
    }
};

module.exports = { convertCode };