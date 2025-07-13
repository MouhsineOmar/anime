import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Lottie from 'lottie-react';
import emotionAnimation from '../assets/Pochita.json'; // ✅ Assure-toi du bon chemin

const AnimeInfoSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '60px',
        backgroundColor: '#000', // 🔲 Fond noir
        flexWrap: 'wrap',
        gap: '40px',
      }}
    >
      {/* Texte à droite */}
      <Box sx={{ maxWidth: '500px' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#ff0000' }}>
          Pourquoi vous recommander un anime ?
        </Typography>

        <Typography sx={{ fontSize: '1rem', color: '#f0f0f0' }}>
          Sur notre plateforme <strong style={{ color: '#ff0000' }}>AnimeRecommender</strong>, nous utilisons l’intelligence artificielle pour comprendre vos préférences et vous aider à découvrir les meilleurs animes adaptés à vos goûts.
        </Typography>

        <br />

        <Typography sx={{ fontSize: '1rem', color: '#f0f0f0' }}>
          Que vous aimiez l’action, la romance, la comédie ou la fantasy, nous vous proposons des animes adaptés, avec des descriptions détaillées et des extraits vidéo pour faciliter votre choix.
        </Typography>
      </Box>

      {/* Animation à gauche */}
      <Box sx={{ width: '350px' }}>
        <Lottie animationData={emotionAnimation} loop autoplay />
      </Box>
    </Box>
  );
};

export default AnimeInfoSection;
