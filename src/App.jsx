import React, { useState, useEffect, useMemo } from 'react';
import { fetchPokemonList, fetchPokemonByType, fetchPokemonById, searchPokemonByName } from './services/pokeApi';
import { useAuth } from './contexts/AuthContext';
import PokemonList from './components/PokemonList';
import SearchAndFilter from './components/SearchAndFilter';
import Pagination from './components/Pagination';
import PokemonDetailModal from './components/PokemonDetailModal';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import './App.css';

/**
 * Main App Component
 * Manages state and coordinates all features:
 * - Pokémon listing with pagination
 * - Search functionality
 * - Type filtering
 * - Favorite management
 * - Detail modal
 */
function App() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const POKEMON_PER_PAGE = 20;

  // Fetch Pokémon list based on current page, filters, and search
  useEffect(() => {
    const loadPokemon = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let data;
        
        if (searchTerm.trim() && !selectedType) {
          const searchResults = await searchPokemonByName(searchTerm.trim());
          data = {
            results: searchResults,
            count: searchResults.length
          };
          setPokemonList(data.results);
          setFilteredList(data.results);
          setTotalPages(1); 
        } else if (selectedType) {
          const pokemonByType = await fetchPokemonByType(selectedType);
          data = {
            results: pokemonByType,
            count: pokemonByType.length
          };
          setPokemonList(data.results);
          
          if (searchTerm.trim()) {
            const filtered = data.results.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredList(filtered);
          } else {
            setFilteredList(data.results);
          }
          
          setTotalPages(1); 
        } else {
          const offset = (currentPage - 1) * POKEMON_PER_PAGE;
          data = await fetchPokemonList(offset, POKEMON_PER_PAGE);
          setPokemonList(data.results);
          setFilteredList(data.results);
          
          const pages = Math.ceil(data.count / POKEMON_PER_PAGE);
          setTotalPages(pages > 0 ? pages : 1);
        }
      } catch (err) {
        setError(err.message || 'Failed to load Pokémon');
        setPokemonList([]);
        setFilteredList([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemon();
  }, [currentPage, selectedType, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, searchTerm]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleTypeFilterChange = (type) => {
    setSelectedType(type);
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePokemonClick = async (pokemon) => {
    try {
      const fullDetails = await fetchPokemonById(pokemon.id);
      setSelectedPokemon(fullDetails);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error fetching Pokémon details:', err);
      setSelectedPokemon(pokemon);
      setIsModalOpen(true);
    }
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };


  const displayList = filteredList;


  if (showLogin && !isAuthenticated) {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Pokédex Lite</h1>
          <p className="app-subtitle">Explore the world of Pokémon</p>
        </header>
        <main className="app-main">
          <button
            className="back-to-app-btn"
            onClick={() => setShowLogin(false)}
          >
            ← Back to Pokédex
          </button>
          <Login />
        </main>
        <footer className="app-footer">
          <p>Powered by <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokéAPI</a></p>
        </footer>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1 className="app-title">Pokédex Lite</h1>
            <p className="app-subtitle">Explore the world of Pokémon</p>
          </div>
          <div className="header-actions">
            {isAuthenticated ? (
              <UserProfile />
            ) : (
              <button
                className="login-header-btn"
                onClick={() => setShowLogin(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        <SearchAndFilter
          onSearchChange={handleSearchChange}
          onTypeFilterChange={handleTypeFilterChange}
          selectedType={selectedType}
        />

        <PokemonList
          pokemonList={displayList}
          onPokemonClick={handlePokemonClick}
          isLoading={isLoading}
          error={error}
        />

        {!selectedType && !searchTerm.trim() && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      {isModalOpen && selectedPokemon && (
        <PokemonDetailModal
          pokemon={selectedPokemon}
          onClose={handleCloseModal}
        />
      )}

      <footer className="app-footer">
        <p>Powered by <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokéAPI</a></p>
      </footer>
    </div>
  );
}

export default App;

