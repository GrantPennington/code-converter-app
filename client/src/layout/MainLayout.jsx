import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Braces } from 'lucide-react' 

const MainLayout = ({ children }) => {
  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 'bold',
              mt: 2
            }}
          >
            <Braces size={32} style={{ marginRight: 8, marginTop: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Code Converter
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, backgroundColor: 'background.default', p:2 }}>
        <Box>{children}</Box>
      </Container>
    </>
  );
};

export default MainLayout;