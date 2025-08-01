import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { saveHistory } from '../services/api';
import ConversionResult from './ConversionResult';
import { LANGUAGE_MAP as languageMap } from '../data/languageMap';

const FileUploadSection = () => {
    const [file, setFile] = useState(null);
    const [convertedCode, setConvertedCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [sourceLanguage, setSourceLanguage] = useState('JavaScript');
    const [targetLanguage, setTargetLanguage] = useState('Python');

    const languageOptions = Object.keys(languageMap);

    const handleFileUpload = async () => {
        if (!file) return;

        const sessionId = localStorage.getItem('sessionId');
        const formData = new FormData();

        formData.append('file', file);
        formData.append('sessionId', sessionId);
        formData.append('sourceLanguage', languageMap[sourceLanguage]);
        formData.append('targetLanguage', languageMap[targetLanguage]);

        setLoading(true);

        try {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/upload`, formData);

        const {
            convertedCode,
            originalCode,
            filename,
            filetype,
            wordCount,
        } = res.data;

        setConvertedCode(convertedCode);
        
        } catch (err) {
            console.error('Upload failed:', err);
            setConvertedCode('Error converting uploaded code.');
        }

        setLoading(false);
    };

    return (
        <Box>
        <input
            type="file"
            accept=".txt,.pdf,.docx,.js,.py,.java,.cpp,.ts,.go,.rb,.cs,.rs"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginTop: '1rem' }}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Source Language (optional)</InputLabel>
            <Select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                label="Source Language"
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
                <MenuItem key={lang} value={lang}>
                {lang}
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
            {loading ? <CircularProgress size={24} /> : 'Upload & Convert'}
        </Button>

        <ConversionResult conversion={convertedCode} />
    </Box>
  );
};

export default FileUploadSection;