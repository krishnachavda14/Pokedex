/**
 * Service for interacting with PokéAPI
 * Handles all API calls for fetching Pokémon data
 */

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetch a list of Pokémon with pagination
 * @param {number} offset - Starting index for pagination
 * @param {number} limit - Number of Pokémon to fetch
 * @returns {Promise<Array>} Array of Pokémon data
 */
export const fetchPokemonList = async (offset = 0, limit = 20) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    
    // Fetch detailed data for each Pokémon
    const pokemonPromises = data.results.map(async (pokemon) => {
      const detailResponse = await fetch(pokemon.url);
      return await detailResponse.json();
    });
    
    return {
      results: await Promise.all(pokemonPromises),
      count: data.count,
      next: data.next,
      previous: data.previous
    };
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    throw error;
  }
};

/**
 * Fetch a single Pokémon by ID or name
 * @param {string|number} identifier - Pokémon ID or name
 * @returns {Promise<Object>} Pokémon data
 */
export const fetchPokemonById = async (identifier) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${identifier}`);
    if (!response.ok) {
      throw new Error('Pokémon not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    throw error;
  }
};

/**
 * Fetch all Pokémon types
 * @returns {Promise<Array>} Array of type objects
 */
export const fetchTypes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/type`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching types:', error);
    throw error;
  }
};

/**
 * Fetch Pokémon by type
 * @param {string} type - Type name
 * @returns {Promise<Array>} Array of Pokémon data
 */
export const fetchPokemonByType = async (type) => {
  try {
    const response = await fetch(`${BASE_URL}/type/${type}`);
    const data = await response.json();
    
    const pokemonPromises = data.pokemon.map(async (entry) => {
      const detailResponse = await fetch(entry.pokemon.url);
      return await detailResponse.json();
    });
    
    return await Promise.all(pokemonPromises);
  } catch (error) {
    console.error('Error fetching Pokémon by type:', error);
    throw error;
  }
};

/**
 * Fetch all Pokémon names/URLs (for searching across entire database)
 * @returns {Promise<Array>} Array of Pokémon basic info with name and url
 */
export const fetchAllPokemonNames = async () => {
  try {
    // Fetch with a large limit to get all Pokémon
    const response = await fetch(`${BASE_URL}/pokemon?offset=0&limit=1300`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching all Pokémon names:', error);
    throw error;
  }
};

/**
 * Search Pokémon by name across all Pokémon
 * @param {string} searchTerm - Search term to match against Pokémon names
 * @returns {Promise<Array>} Array of matching Pokémon data
 */
export const searchPokemonByName = async (searchTerm) => {
  try {
    // Get all Pokémon names
    const allPokemon = await fetchAllPokemonNames();
    
    // Filter by search term
    const matchingPokemon = allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Fetch detailed data for matching Pokémon
    const pokemonPromises = matchingPokemon.map(async (pokemon) => {
      const detailResponse = await fetch(pokemon.url);
      return await detailResponse.json();
    });
    
    return await Promise.all(pokemonPromises);
  } catch (error) {
    throw error;
  }
};

