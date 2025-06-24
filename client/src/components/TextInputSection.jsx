import React, { useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography
} from '@mui/material';
import { saveHistory, summarizeText } from '../services/api';
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

const TextInputSection = () => {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [style, setStyle] = useState('default');
    const [loading, setLoading] = useState(false);

    const charLimit = 2000;
  
    const handleSummarize = async () => {
        setLoading(true);
        try {
            const result = await summarizeText(text, style);
            setSummary(result);
              
            const sessionId = localStorage.getItem('sessionId');
            const wordCount = text.trim().split(/\s+/).length;
  
            await saveHistory(sessionId, text, result, style, {
                filename: 'N/A',
                filetype: 'manual-input',
                wordCount,
            });
              
        } catch (err) {
            console.error('Summarization failed:', err);
            setSummary('Error summarizing text.');
        }
        setLoading(false);
    };

    return (
        <Box>
        <TextField
            fullWidth
            multiline
            minRows={6}
            label="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            slotProps={{ 
                input: {
                    maxLength: charLimit,
                }
            }}
        />
        <Typography
            variant="caption"
            color={text.length > charLimit ? 'error' : 'text.secondary'}
            sx={{ display: 'block', mt: 1, textAlign: 'right' }}
        >
            Character count: {text.length} / {charLimit}
        </Typography>

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
            sx={{ mt: 2, mb: 6 }}
            onClick={handleSummarize}
            disabled={loading || !text || text.length > charLimit}
        >
            {loading ? <CircularProgress size={24} /> : 'Summarize'}
        </Button>

        <SummaryResult summary={summary} style={style} />
        </Box>
    );
};

export default TextInputSection;