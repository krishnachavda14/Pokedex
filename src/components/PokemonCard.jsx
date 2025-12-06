import React from 'react';
import { isFavorite, addFavorite, removeFavorite } from '../utils/favorites';

const PokemonCard = ({ pokemon, onCardClick }) => {
  const [favorited, setFavorited] = React.useState(isFavorite(pokemon.id));
  const [imageError, setImageError] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(null);

  React.useEffect(() => {
    if (pokemon.sprites) {
      const possibleUrls = [
        pokemon.sprites.other?.['official-artwork']?.front_default,
        pokemon.sprites.other?.['dream_world']?.front_default,
        pokemon.sprites.other?.home?.front_default,
        pokemon.sprites.front_default,
        pokemon.sprites.front_shiny,
      ].filter(Boolean);

      if (possibleUrls.length > 0) {
        setImageUrl(possibleUrls[0]);
        setImageError(false);
      } else {
        setImageUrl(null);
      }
    } else {
      setImageUrl(null);
    }
  }, [pokemon]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    
    if (favorited) {
      removeFavorite(pokemon.id);
      setFavorited(false);
    } else {
      addFavorite(pokemon.id);
      setFavorited(true);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const types = pokemon.types?.map(type => type.type.name) || [];

  return (
    <div className="pokemon-card" onClick={() => onCardClick(pokemon)}>
      <div className="pokemon-card-header">
        <button
          className={`favorite-btn ${favorited ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorited ? '❤️' : '🤍'}
        </button>
        <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
      </div>
      
      <div className="pokemon-image-container">
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl} 
            alt={pokemon.name}
            className="pokemon-image"
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <div className="pokemon-image-placeholder">
            <span className="placeholder-icon">⚡</span>
            <span className="placeholder-text">{pokemon.name}</span>
          </div>
        )}
      </div>
      
      <div className="pokemon-card-body">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className="pokemon-types">
          {types.map((type) => (
            <span key={type} className={`type-badge type-${type}`}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

