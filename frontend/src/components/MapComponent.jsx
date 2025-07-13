import React from 'react';
import { Box, Typography } from '@mui/material';

const MapComponent = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#000',
        padding: '30px 15px',
        borderTop: '3px solid #ff0000',
        borderBottom: '3px solid #ff0000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#ff0000',
          textAlign: 'center',
          mb: 2,
          fontWeight: 'bold',
        }}
      >
      </Typography>

      <Box
        sx={{
          width: '100%',
          maxWidth: '400px', // 🔽 taille réduite
          height: '220px',   // 🔽 hauteur plus petite
          border: '2px solid #ff0000',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <iframe
          title="Ma carte Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.760020657854!2d-1.9021194235743425!3d34.65225427292225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd787cbcbec59e59%3A0x83957ae60b188453!2sFacult%C3%A9%20des%20Sciences%20d'Oujda!5e0!3m2!1sfr!2sma!4v1711371212923"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </Box>
  );
};

export default MapComponent;
