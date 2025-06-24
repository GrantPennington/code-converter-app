const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { convertCode } = require('../controllers/convertCodeController');

// create router
const router = express.Router();

// Configure multer (store file in memory)
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), async (req, res) => {
    const file = req.file;
    const {
        sessionId,
        sourceLanguage = 'unspecified',
        targetLanguage,
    } = req.body;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!sessionId || !targetLanguage) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    let text = '';

    try {
        // Extract raw text from file
        if (file.mimetype === 'application/pdf') {
            const data = await pdfParse(file.buffer);
            text = data.text;
        } else if (
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            const result = await mammoth.extractRawText({ buffer: file.buffer });
            text = result.value;
        } else {
        // Assume plain text or code file
            text = file.buffer.toString('utf-8');
        }

        const wordCount = text.trim().split(/\s+/).length;

        // Create mock req/res to use convertCode with { returnOnly }
        const conversion = await convertCode(
        { body: {
            sessionId,
            originalCode: text,
            sourceLanguage,
            targetLanguage,
            textSource: 'file',
            filename: file.originalname,
            filetype: file.mimetype,
            wordCount,
            } },
        {},
        { returnOnly: true }
        );

        res.json({
            convertedCode: conversion.convertedCode,
            originalCode: text,
            filename: file.originalname,
            filetype: file.mimetype,
            wordCount,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to convert code from file.' });
    }
});

module.exports = router;