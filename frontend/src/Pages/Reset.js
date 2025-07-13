import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WelcomeSection from '../components/WelcomeSection';
import AnimeInfoSection from '../components/AnimeInfoSection';
import RecommendationCard from '../components/RecommendationCard';
import ChatBot from '../components/ChatBot';

const Reset = () => {
  const [open, setOpen] = useState(false);
  const [visibleImage, setVisibleImage] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const showAnimeVisual = (anime) => {
    setVisibleImage(anime);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#0d1117', // ✅ Fond sombre stylé
        color: '#fff',
        overflowX: 'hidden',
      }}
    >
      {/* ✅ Barre de navigation */}
      <Header showAnimeVisual={showAnimeVisual} />

      {/* ✅ Section principale */}
      <Box sx={{ flexGrow: 1, pt: '80px' }}>
        <WelcomeSection /> {/* 🎥 Animation ou Lottie */}
        <Box sx={{ mt: 6 }} />

        <AnimeInfoSection /> {/* ℹ️ Présentation du système */}
        <Box sx={{ mt: 6 }} />

        <RecommendationCard /> {/* ⭐ Suggestions d’animes */}
        <Box sx={{ mt: 6 }} />

        {/* ✅ Affichage de l’image sélectionnée */}
        {visibleImage && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <img
              src={`/images/${visibleImage}.png`}
              alt={`Anime ${visibleImage}`}
              style={{
                maxWidth: '80%',
                borderRadius: '20px',
                boxShadow: '0 0 15px rgba(255,255,255,0.2)',
              }}
            />
          </Box>
        )}
      </Box>

      {/* ✅ Pied de page */}
      <Footer />

      {/* ✅ Bouton flottant pour le chatbot */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: '#6c63ff',
          borderRadius: '50%',
          p: 1,
          boxShadow: '0 0 10px rgba(108, 99, 255, 0.8)',
        }}
      >
        <IconButton
          onClick={handleOpen}
          sx={{ color: '#fff', '&:hover': { backgroundColor: '#554dd4' } }}
        >
          <ChatIcon sx={{ fontSize: 50 }} />
        </IconButton>
      </Box>

      {/* ✅ Fenêtre modale du ChatBot */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#1c1c1e',
            color: '#fff',
            p: 3,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <ChatBot />
        </Box>
      </Modal>
    </Box>
  );
};

export default Reset;
