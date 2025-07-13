import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MapComponent from './MapComponent';

const Footer = ({ darkMode = true }) => {
  return (
    <Box
      dir="rtl"
      sx={{
        bgcolor: '#000',           // ✅ fond noir
        color: '#fff',             // ✅ texte blanc
        padding: '2rem',
        borderTop: '3px solid #ff0000', // ✅ ligne rouge en haut
        textAlign: 'center',
        marginTop: '2rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >
        {/* ✅ Informations personnelles */}
        <Box sx={{ flex: 1, minWidth: '300px' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#ff0000' }}>
              Mes informations personnelles
            </Typography>
            <Typography variant="body1">📍 Oujda, près de la Faculté des Sciences</Typography>
            <Typography variant="body1">📞 0645688167</Typography>
            <Typography variant="body1">✉️ omarmouhsine2000@gmail.com</Typography>


          {/* ✅ Icônes sociales */}
          <Box sx={{ marginTop: '1rem' }}>
            <IconButton href="https://www.facebook.com/share/1EWjZhsHPt/" target="_blank">
              <FacebookIcon sx={{ color: '#ff0000', fontSize: 30 }} />
            </IconButton>
            <IconButton href="https://www.instagram.com/mouhsine_omar_?igsh=MWNnaGF1cm1hd2VxdQ==" target="_blank">
              <InstagramIcon sx={{ color: '#ff0000', fontSize: 30 }} />
            </IconButton>
            <IconButton href="https://x.com/Mouhsine_14?t=hLCrc1TDJlBEILHpyKaWGw&s=08" target="_blank">
              <TwitterIcon sx={{ color: '#ff0000', fontSize: 30 }} />
            </IconButton>
            <IconButton href="https://www.linkedin.com/in/omar-mouhsine-aaab98277" target="_blank">
              <LinkedInIcon sx={{ color: '#ff0000', fontSize: 30 }} />
            </IconButton>
          </Box>
        </Box>

        {/* ✅ Carte Google Maps */}
        <Box sx={{ flex: 1, minWidth: '300px' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#ff0000' }}>
        📍 Notre localisation
          </Typography>
          <Box sx={{ width: '100%', maxWidth: '500px', height: '300px', margin: '0 auto' }}>
            <MapComponent />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
