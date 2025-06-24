const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { summarizeText } = require('../controllers/summarizeController');

// create router
const router = express.Router();

// Configure multer (store file in memory)
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), async (req, res) => {
    const file = req.file;
    const style = req.body.style || 'default';

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    let text = ''

    try {
        // PDF
        if(file.mimetype === 'application/pdf') {
            const data = await pdfParse(file.buffer);
            text = data.text;
        } else if( // DOCX
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            const result = await mammoth.extractRawText({ buffer: file.buffer });
            text = result.value;
        } else { // TXT
            text = file.buffer.toString('utf-8');
        }

        const result = await summarizeText({ body: { text, style } }, {}, { returnOnly: true });
        const wordCount = text.trim().split(/\s+/).length;

        //const result = await summarizeText({ body: { text, style } }, { json: (data) => res.json(data), status: (code) => res.status(code) });
        //const result = await summarizeText({ body: { text, style } }, {}, { returnOnly: true });
        res.json({ 
            summary: result.summary, 
            text,
            filename: file.originalname,
            filetype: file.mimetype,
            wordCount
        });
    } catch(err) {
        res.status(500).json({ error: 'Failed to summarize file' })
    }
});

module.exports = router;