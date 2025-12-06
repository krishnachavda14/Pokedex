/**
 * Utility functions for managing favorite Pokémon
 * Uses localStorage for persistence
 */

const FAVORITES_KEY = 'pokedex_favorites';

/**
 * Get all favorite Pokémon IDs
 * @returns {Array<number>} Array of favorite Pokémon IDs
 */
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

/**
 * Add a Pokémon to favorites
 * @param {number} pokemonId - Pokémon ID to add
 */
export const addFavorite = (pokemonId) => {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(pokemonId)) {
      favorites.push(pokemonId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error adding favorite:', error);
  }
};

/**
 * Remove a Pokémon from favorites
 * @param {number} pokemonId - Pokémon ID to remove
 */
export const removeFavorite = (pokemonId) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(id => id !== pokemonId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};

/**
 * Check if a Pokémon is favorited
 * @param {number} pokemonId - Pokémon ID to check
 * @returns {boolean} True if favorited
 */
export const isFavorite = (pokemonId) => {
  const favorites = getFavorites();
  return favorites.includes(pokemonId);
};

