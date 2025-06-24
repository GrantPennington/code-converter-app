import React, { useState } from 'react';
import { Button, CircularProgress, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { saveHistory } from '../services/api';
import SummaryResult from './SummaryResult';

const summaryStyles = [
  { label: 'Balanced', value: 'default' },
  { label: 'Bullet Points', value: 'bullet' },
  { label: 'TL;DR', value: 'tldr' },
  { label: 'Outline', value: 'outline' },
  { label: 'Study Guide', value: 'study-guide' },
  { label: 'Action Items', value: 'action-items' },
  { label: 'Highlighted Quotes', value: 'highlighted-quotes' },
  { label: 'Rewrite for a 10-Year-Old', value: 'rewrite-simplified' },
  { label: 'Quiz Generator', value: 'question-generator' },
];

const FileUploadSection = () => {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [style, setStyle] = useState('default');

    const handleFileUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('style', style);

        setLoading(true);
        try {
            const sessionId = localStorage.getItem('sessionId');
                // upload route
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/upload`, formData);
                // save summary from response
            const { summary, text, filename, filetype, wordCount } = res.data;

            setSummary(summary);

            await saveHistory(sessionId, text, summary, style, {
                filename,
                filetype,
                wordCount
            });

        } catch (err) {
            console.error('Upload failed:', err);
            setSummary('Error summarizing uploaded file.');
        }
        setLoading(false);
    };

    return (
        <Box>
        <input
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginTop: '1rem' }}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Summary Style</InputLabel>
            <Select value={style} onChange={(e) => setStyle(e.target.value)} label="Summary Style">
            {summaryStyles.map((s) => (
                <MenuItem key={s.value} value={s.value}>
                {s.label}
                </MenuItem>
            ))}
            </Select>
        </FormControl>

        <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleFileUpload}
            disabled={loading || !file}
        >
            {loading ? <CircularProgress size={24} /> : 'Upload & Summarize'}
        </Button>
        <SummaryResult summary={summary} style={style} />
        </Box>
    );
};

export default FileUploadSection;