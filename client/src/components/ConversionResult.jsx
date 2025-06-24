import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Card, CardContent, Typography, Box, IconButton, Tooltip, Divider } from '@mui/material';
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
    <Box sx={{ mt: 4, mb: 10, position: 'relative' }}>
      <Card sx={{ backgroundColor: 'background.paper', p:2, mb:2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              🧠 Converted Code
            </Typography>
            <Tooltip title="Copy to clipboard">
              <IconButton onClick={handleCopy}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider />
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{ borderRadius: 8, padding: 12, fontSize: '0.9rem', fontFamily: 'Fira Code, monospace', backgroundColor: '#1e1e1e', }}
            PreTag={"pre"}
            codeTagProps={{
              style: { fontFamily: 'Fira Code, monospace' }
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