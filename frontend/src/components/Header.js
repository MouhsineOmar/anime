import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Dialog, DialogTitle,
  DialogContent, TextField, DialogActions, Menu, MenuItem
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SchoolIcon from '@mui/icons-material/School';
import { Link, useNavigate } from 'react-router-dom';

import emailjs from 'emailjs-com';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [anchorElProducts, setAnchorElProducts] = useState(null);
  const [openContactForm, setOpenContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleProductsOpen = (e) => setAnchorElProducts(e.currentTarget);
  const handleProductsClose = () => setAnchorElProducts(null);

  const handleOpenContactForm = () => setOpenContactForm(true);
  const handleCloseContactForm = () => setOpenContactForm(false);

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm({ ...contactForm, [name]: value });
  };

  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    emailjs.send('service_jgawclq', 'template_gedzw5f', contactForm, 'gTIz9zM9FyaFhrvU3')
      .then(() => {
        alert("📨 Message envoyé avec succès !");
        handleCloseContactForm();
      })
      .catch(() => alert("❌ Une erreur s'est produite lors de l'envoi du message."));
  };

  return (
    <>
      <AppBar position="fixed" className="header-appbar">
        <Toolbar className="header-toolbar">

          {/* ✅ Logo */}
          <Typography variant="h6" className="header-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/images/reco.png" alt="Logo" className="logo-img" />
            <span style={{ marginLeft: 10, fontWeight: 'bold', fontSize: '1.2rem' }}></span>
          </Typography>

          {/* ✅ Navigation */}
          <Box className="nav-buttons">
            <Button className="nav-btn" onClick={() => navigate('/')}>
              <HomeIcon className="nav-icon" /> Accueil
            </Button>

            <Button className="nav-btn" onClick={() => navigate('/blog')}>
              <MenuBookIcon className="nav-icon" /> À propos
            </Button>

            <Button className="nav-btn" onClick={handleProductsOpen}>
              <SchoolIcon className="nav-icon" /> Contenu
            </Button>

            {/* ✅ Menu déroulant : contenu */}
            <Menu anchorEl={anchorElProducts} open={Boolean(anchorElProducts)} onClose={handleProductsClose}>
              <MenuItem onClick={() => { navigate('/cours-maths'); handleProductsClose(); }}>
                📘 Cours en ligne
              </MenuItem>
              <MenuItem onClick={() => { navigate('/pdf-cours'); handleProductsClose(); }}>
                📄 Fichiers PDF
              </MenuItem>
              <MenuItem onClick={() => { navigate('/exercices-corriges'); handleProductsClose(); }}>
                ✏️ Exercices corrigés
              </MenuItem>
              <MenuItem onClick={() => { navigate('/competitions'); handleProductsClose(); }}>
                🏆 Concours de maths
              </MenuItem>
            </Menu>

            <Button className="nav-btn" onClick={handleOpenContactForm}>
              <MailOutlineIcon className="nav-icon" /> Contact
            </Button>
          </Box>

          {/* ✅ Bouton Connexion */}
          <Link to="/Login" className="login-link">
            <Button className="login-btn">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>

      {/* ✅ Boîte de dialogue Contact */}
      <Dialog open={openContactForm} onClose={handleCloseContactForm} dir="ltr">
        <DialogTitle>Contactez-nous</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Nom" name="name" fullWidth value={contactForm.name} onChange={handleContactFormChange} />
          <TextField margin="dense" label="Adresse email" name="email" type="email" fullWidth value={contactForm.email} onChange={handleContactFormChange} />
          <TextField margin="dense" label="Message" name="message" multiline rows={4} fullWidth value={contactForm.message} onChange={handleContactFormChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseContactForm}>Annuler</Button>
          <Button onClick={handleContactFormSubmit}>Envoyer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
