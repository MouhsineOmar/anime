import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import ici
import axios from 'axios';
import {
    AppBar, Toolbar, Typography, IconButton, Box, Card,
    CardMedia, CardContent, Button, Menu, MenuItem
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchBar from '../components/SearchBar'; // 🆕 Autocomplete


const RecommendationPage = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [animes, setAnimes] = useState([]);
    const [selectedAnime, setSelectedAnime] = useState(null);
    const navigate = useNavigate(); // ✅ Hook pour navigation

    useEffect(() => {
        axios.get("http://localhost:5000/animes")
            .then(res => {
                if (res.data.status === "success") {
                    setAnimes(res.data.data.slice(0, 20));
                } else {
                    console.error("Erreur :", res.data.message);
                }
            })
            .catch(err => console.error("Erreur de connexion à l'API :", err));
    }, []);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating / 2);
        const hasHalfStar = rating % 2 >= 1;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<StarIcon key={i} sx={{ color: 'gold' }} />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<StarHalfIcon key={i} sx={{ color: 'gold' }} />);
            } else {
                stars.push(<StarBorderIcon key={i} sx={{ color: 'gray' }} />);
            }
        }
        return stars;
    };

    const handleSelectAnime = (anime) => {
        setSelectedAnime(anime);
    };

    return (
        <Box sx={{ backgroundColor: '#111', minHeight: '100vh', color: '#fff' }}>
            {/* BARRE DE NAVIGATION */}
            <AppBar position="static" sx={{ backgroundColor: '#000' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <img
                            src="/images/reco.png"
                            alt="Logo Anime"
                            style={{
                                height: '50px',
                                width: '50px',
                                borderRadius: '50%',
                                border: '2px solid red',
                                marginRight: '10px',
                                objectFit: 'cover',
                                backgroundColor: '#fff'
                            }}
                        />
                        anime<span style={{ color: 'red' }}>_planet</span>
                    </Typography>

                    {['Anime', 'Manga', 'Personnages', 'Communauté'].map((link) => (
                        <Button key={link} sx={{ color: '#fff', mx: 1 }}>{link}</Button>
                    ))}

                    <Box sx={{ mx: 2 }}>
                        <SearchBar onSelectAnime={handleSelectAnime} />
                    </Box>

                    <IconButton color="inherit"><NotificationsIcon /></IconButton>
                    <IconButton color="inherit" onClick={handleMenu}><AccountCircle /></IconButton>

                    {/* MENU DE COMPTE */}
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => { handleClose(); navigate("/profile"); }}>
                            Profil
                        </MenuItem>
                        <MenuItem onClick={handleClose}>Paramètres</MenuItem>
                        <MenuItem onClick={handleClose}>Déconnexion</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* TITRE SECTION */}
            <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid #444' }}>
                <Typography variant="h4" fontWeight="bold">
                    Animes populaires cette semaine
                </Typography>
            </Box>

            {/* TRAILER SI SÉLECTION */}
            {selectedAnime && (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                        {selectedAnime.name}
                    </Typography>
                    {selectedAnime.trailer_url ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <iframe
                                width="560"
                                height="315"
                                src={selectedAnime.trailer_url.replace("watch?v=", "embed/")}
                                title={selectedAnime.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </Box>
                    ) : (
                        <Typography variant="body2" sx={{ color: 'gray' }}>
                            Aucun trailer disponible
                        </Typography>
                    )}
                </Box>
            )}

            {/* GRILLE D’ANIMES */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: 3,
                    p: 3
                }}
            >
                {animes.map((anime, index) => (
                    <Card key={index} sx={{ backgroundColor: '#222', color: '#fff' }}>
                        <CardMedia
                            component="img"
                            height="220"
                            image={anime.image_url}
                            alt={anime.name}
                            sx={{ objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Typography variant="body1" fontWeight="bold" noWrap>
                                {anime.name}
                            </Typography>

                            <Box sx={{ display: 'flex', mt: 1 }}>
                                {renderStars(anime.rating)}
                            </Box>

                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ mt: 1, backgroundColor: '#e53935' }}
                            >
                                + Ajouter à la liste
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default RecommendationPage;
