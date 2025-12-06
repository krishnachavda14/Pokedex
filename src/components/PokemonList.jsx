import React from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

const PokemonList = ({ pokemonList, onPokemonClick, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading Pokémon: {error}</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!pokemonList || pokemonList.length === 0) {
    return (
      <div className="empty-container">
        <p>No Pokémon found. Try adjusting your search or filter.</p>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onCardClick={onPokemonClick}
        />
      ))}
    </div>
  );
};

export default PokemonList;

