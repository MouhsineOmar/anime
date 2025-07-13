import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import './RecommendationCard.css';

const RecommendationCard = ({ title, description, imageUrl, score, onClick }) => {
  return (
    <Card className="recommendation-card">
      <CardMedia
        component="img"
        height="200"
        image={imageUrl || '/images/default-anime.jpg'}
        alt={title}
        className="card-image"
      />
      <CardContent className="card-details">
        <Typography variant="h6" className="anime-title">
          {title}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <StarIcon sx={{ color: '#FFD700' }} />
          <Typography variant="body2" color="text.secondary">
            {score || 'N/A'}
          </Typography>
        </Box>
        <Typography variant="body2" className="anime-description">
          {description?.substring(0, 100) || 'Description indisponible...'}...
        </Typography>
        <Button variant="contained" color="primary" onClick={onClick} fullWidth>
          Voir plus
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
