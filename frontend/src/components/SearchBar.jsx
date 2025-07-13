import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputBase, List, ListItem, ListItemButton, Paper } from '@mui/material';

const SearchBar = ({ onSelectAnime }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // 🔍 Recherche automatique dès que l'utilisateur tape
  useEffect(() => {
    if (query.length > 1) {
      axios.get(`http://localhost:5000/search-animes?q=${query}`)
        .then(res => {
          if (res.data.status === 'success') {
            setSuggestions(res.data.data);
          }
        })
        .catch(err => console.error('Erreur recherche :', err));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // ✅ Récupération des détails de l’anime sélectionné
  const handleSelect = async (anime) => {
    try {
      const res = await axios.get('http://localhost:5000/animes');
      const animeList = res.data.data;
      const fullAnime = animeList.find(a => a.anime_id === anime.anime_id);

      if (fullAnime) {
        onSelectAnime(fullAnime);
      } else {
        onSelectAnime(anime); // fallback minimal
      }
    } catch (error) {
      console.error("Erreur lors du chargement des détails :", error);
      onSelectAnime(anime); // fallback
    }

    // Nettoyage du champ de recherche
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div style={{ position: 'relative', width: '200px' }}>
      <InputBase
        placeholder="Rechercher un anime..."
        sx={{
          backgroundColor: '#333',
          color: '#fff',
          borderRadius: 1,
          padding: '4px 8px',
          width: '100%'
        }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <Paper
          elevation={3}
          style={{
            position: 'absolute',
            zIndex: 10,
            width: '100%',
            backgroundColor: '#fff'
          }}
        >
          <List>
            {suggestions.map((anime) => (
              <ListItem key={anime.anime_id} disablePadding>
                <ListItemButton onClick={() => handleSelect(anime)}>
                  {anime.name}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default SearchBar;
