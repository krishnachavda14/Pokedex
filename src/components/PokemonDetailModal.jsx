import React, { useEffect } from 'react';
import { isFavorite, addFavorite, removeFavorite } from '../utils/favorites';
import './PokemonDetailModal.css';

const PokemonDetailModal = ({ pokemon, onClose }) => {
  const [favorited, setFavorited] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(null);

  useEffect(() => {
    if (pokemon) {
      setFavorited(isFavorite(pokemon.id));
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
    }
  }, [pokemon]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!pokemon) return null;

  const handleFavoriteClick = () => {
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

  const stats = pokemon.stats || [];
  const types = pokemon.types?.map(type => type.type.name) || [];
  const abilities = pokemon.abilities?.map(ability => ability.ability.name) || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>

        <div className="modal-header">
          <div className="modal-image-container">
            {imageUrl && !imageError ? (
              <img 
                src={imageUrl} 
                alt={pokemon.name} 
                className="modal-image"
                onError={handleImageError}
              />
            ) : (
              <div className="modal-image-placeholder">
                <span className="placeholder-icon">⚡</span>
                <span className="placeholder-text">{pokemon.name}</span>
              </div>
            )}
          </div>
          <div className="modal-title-section">
            <h2 className="modal-title">{pokemon.name}</h2>
            <span className="modal-id">#{String(pokemon.id).padStart(3, '0')}</span>
            <button
              className={`modal-favorite-btn ${favorited ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              {favorited ? '❤️ Favorited' : '🤍 Add to Favorites'}
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>Types</h3>
            <div className="modal-types">
              {types.map((type) => (
                <span key={type} className={`type-badge type-${type}`}>
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3>Abilities</h3>
            <div className="modal-abilities">
              {abilities.map((ability) => (
                <span key={ability} className="ability-badge">
                  {ability}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3>Base Stats</h3>
            <div className="modal-stats">
              {stats.map((stat) => (
                <div key={stat.stat.name} className="stat-row">
                  <span className="stat-name">
                    {stat.stat.name.replace('-', ' ')}
                  </span>
                  <div className="stat-bar-container">
                    <div
                      className="stat-bar"
                      style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                    >
                      <span className="stat-value">{stat.base_stat}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3>Physical Attributes</h3>
            <div className="modal-attributes">
              <div className="attribute-item">
                <span className="attribute-label">Height:</span>
                <span className="attribute-value">{(pokemon.height / 10).toFixed(1)} m</span>
              </div>
              <div className="attribute-item">
                <span className="attribute-label">Weight:</span>
                <span className="attribute-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailModal;

