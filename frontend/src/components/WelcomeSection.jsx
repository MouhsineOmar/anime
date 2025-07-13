import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './AnimatedCircle.module.css';
import Lottie from 'lottie-react';

// ✅ Import des 3 animations
import animationData1 from '../assets/manheraresize.json';
import animationData2 from '../assets/Cha Chan love.json';
import animationData3 from '../assets/eso Animate rio.json';

const WelcomeSection = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* ✅ Conteneur du fond avec les 3 animations en position absolue */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        {/* Animation 1 à gauche */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '33%', height: '100%' }}>
          <Lottie animationData={animationData1} loop autoplay style={{ width: '100%', height: '100%' }} />
        </Box>

        {/* Animation 2 au centre */}
        <Box sx={{ position: 'absolute', top: 0, left: '33%', width: '34%', height: '100%' }}>
          <Lottie animationData={animationData2} loop autoplay style={{ width: '100%', height: '100%' }} />
        </Box>

        {/* Animation 3 à droite */}
        <Box sx={{ position: 'absolute', top: 0, right: 0, width: '33%', height: '100%' }}>
          <Lottie animationData={animationData3} loop autoplay style={{ width: '100%', height: '100%' }} />
        </Box>
      </Box>

      {/* ✅ Contenu de bienvenue au premier plan */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: '100%',
          paddingLeft: '5rem',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // assombrit pour lisibilité du texte
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'white',
            maxWidth: '700px',
            lineHeight: 1.4,
            fontSize: '3.5rem',
          }}
        >
          Bienvenue sur <br />
          <span style={{ color: '#FFD700' }}>AnimeRecommender</span>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: '#f0f0f0',
            maxWidth: '600px',
            marginTop: '1rem',
            fontSize: '1.2rem',
          }}
        >
          Découvrez les meilleurs animes personnalisés selon vos goûts, vos humeurs et vos envies.
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomeSection;
