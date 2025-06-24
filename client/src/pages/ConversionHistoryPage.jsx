import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getHistory, deleteHistory } from '../services/api';
import FloatingButton from '../components/FloatingButton';
import { LANGUAGE_MAP as languageMap } from '../data/languageMap';

const extractCode = (input, fallbackLang = 'text') => {
  const match = input.match(/```(\w+)?\n([\s\S]*?)```/);
  if (match) {
    return { language: match[1] || fallbackLang, code: match[2] };
  }
  return { language: fallbackLang, code: input };
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

const ConversionHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getKeyFromValue = (value) => {
    return Object.keys(languageMap).find(k => languageMap[k] === value);
  }

  const fetchHistory = async () => {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) return;

    try {
      const res = await getHistory(sessionId);
      setHistory(res);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const sessionId = localStorage.getItem('sessionId');
    await deleteHistory(sessionId, id);
    fetchHistory();
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        💻 Code Conversion History ({history.length})
      </Typography>

      {history.length === 0 ? (
        <Typography>No history yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {history.map((entry) => {
            const original = {
                language: (entry.sourceLanguage || 'text').toLowerCase(),
                code: entry.originalCode,
            };
            const converted = extractCode(entry.convertedCode, entry.targetLanguage || 'text');

            return (
              <Grid item xs={12} md={6} key={entry._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Chip label={`${getKeyFromValue(entry.sourceLanguage)} → ${getKeyFromValue(entry.targetLanguage)}`} color="primary" size="small" />
                      <Tooltip title="Delete conversion">
                        <IconButton size="small" onClick={() => handleDelete(entry._id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {entry.filename && (
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        📄 <strong>{entry.filename}</strong> ({entry.wordCount} words)
                      </Typography>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" gutterBottom>
                      <strong>Original Code:</strong>
                      <Tooltip title="Copy original code">
                        <IconButton size="small" onClick={() => copyToClipboard(original.code)}>
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Typography>

                    <SyntaxHighlighter
                      language={original.language}
                      style={coy}
                      customStyle={{ borderRadius: 8, fontSize: '0.9rem', fontFamily: 'Fira Code, monospace' }}
                      PreTag={"pre"}
                      codeTagProps={{
                        style: { fontFamily: 'Fira Code, monospace' }
                      }}
                    >
                      {original.code}
                    </SyntaxHighlighter>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" gutterBottom>
                      <strong>Converted Code:</strong>
                      <Tooltip title="Copy converted code">
                        <IconButton size="small" onClick={() => copyToClipboard(converted.code)}>
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Typography>

                    <SyntaxHighlighter
                      language={converted.language}
                      style={coy}
                      customStyle={{ borderRadius: 8, fontSize: '0.9rem' }}
                      PreTag={"pre"}
                      codeTagProps={{
                        style: { fontFamily: 'Fira Code, monospace' }
                      }}
                    >
                      {converted.code}
                    </SyntaxHighlighter>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      sx={{ mt: 1 }}
                    >
                      {new Date(entry.createdAt).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <FloatingButton title="Home Page" to="/" icon="home" />
    </Box>
  );
};

export default ConversionHistoryPage;