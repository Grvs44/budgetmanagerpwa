import React from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Outlet />
      </Box>
    </Container>
  );
}
