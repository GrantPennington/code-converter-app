import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ConversionResult = ({ conversion }) => {
  if (!conversion) return null;

  // Extract code and language from markdown-like format
  const codeBlockMatch = conversion.match(/```(\w+)?\n([\s\S]*?)```/);

  let language = 'text';
  let code = conversion;

  if (codeBlockMatch) {
    language = codeBlockMatch[1] || 'text';
    code = codeBlockMatch[2];
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Box sx={{ mt: 4, mb: 6, position: 'relative' }}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>
              🧠 Converted Code
            </Typography>
            <Tooltip title="Copy to clipboard">
              <IconButton onClick={handleCopy}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <SyntaxHighlighter
            language={language}
            style={coy}
            customStyle={{
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: '#f6f8fa',
              fontSize: '0.9rem',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConversionResult;