// src/components/SummaryResult.jsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const SummaryResult = ({ summary, style }) => {
  if (!summary) return null;

  return (
    <Box sx={{ mt: 4, mb: 6 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🧠 Summary ({style})
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {summary}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SummaryResult;