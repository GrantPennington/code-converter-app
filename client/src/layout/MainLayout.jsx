import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import FloatingButton from '../components/FloatingButton';
import { Link as RouterLink } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/" 
            sx={{ color: 'inherit', textDecoration: 'none' }}
        >
            📝 Smart Note Summarizer
        </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box>{children}</Box>
      </Container>
    </>
  );
};

export default MainLayout;