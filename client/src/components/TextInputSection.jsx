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
import { convertCode } from '../services/api';
import ConversionResult from './ConversionResult';
import { LANGUAGE_MAP as languageMap } from '../data/languageMap';

const TextInputSection = () => {
  const [originalCode, setOriginalCode] = useState('console.log("Hello, World!");');
  const [convertedCode, setConvertedCode] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('JavaScript');
  const [targetLanguage, setTargetLanguage] = useState('Python');
  const [loading, setLoading] = useState(false);

  const charLimit = 3000;

  const languageOptions = Object.keys(languageMap);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const sessionId = localStorage.getItem('sessionId');
      const wordCount = originalCode.trim().split(/\s+/).length;

      const result = await convertCode(
        originalCode,
        languageMap[sourceLanguage],
        languageMap[targetLanguage],
        sessionId
      );

      setConvertedCode(result);

    } catch (err) {
      console.error('Code conversion failed:', err);
      setConvertedCode('Error converting code.');
    }
    setLoading(false);
  };

  return (
    <Box>
        <TextField
            fullWidth
            multiline
            minRows={6}
            label="Paste your code here..."
            value={originalCode}
            onChange={(e) => setOriginalCode(e.target.value)}
            slotProps={{ 
                input: {
                    maxLength: charLimit,
                    sx: { fontFamily: 'Fira Code, monospace', fontSize: '0.9rem' }
                }
            }}
        />
        <Typography
            variant="caption"
            color={originalCode.length > charLimit ? 'error' : 'text.secondary'}
            sx={{ display: 'block', mt: 1, textAlign: 'right' }}
        >
            Character count: {originalCode.length} / {charLimit}
        </Typography>

        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Source Language (optional)</InputLabel>
            <Select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                label="Source Language (optional)"
            >
            {languageOptions.map((lang) => (
                <MenuItem key={lang} value={lang}>{lang}</MenuItem>
            ))}
            </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Target Language</InputLabel>
            <Select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                label="Target Language"
            >
            {languageOptions.map((lang) => (
                <MenuItem key={lang} value={lang}>{lang}</MenuItem>
            ))}
            </Select>
        </FormControl>

        <Button
            variant="contained"
            sx={{ mt: 2, mb: 6 }}
            onClick={handleConvert}
            disabled={loading || !originalCode || originalCode.length > charLimit}
        >
            {loading ? <CircularProgress size={24} /> : 'Convert'}
        </Button>

        <ConversionResult conversion={convertedCode} />
    </Box>
  );
};

export default TextInputSection;