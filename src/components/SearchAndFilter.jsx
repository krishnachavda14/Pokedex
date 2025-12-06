import React, { useEffect, useState } from 'react';
import { fetchTypes } from '../services/pokeApi';
import './SearchAndFilter.css';

const SearchAndFilter = ({ onSearchChange, onTypeFilterChange, selectedType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [types, setTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const typesData = await fetchTypes();
        setTypes(typesData);
      } catch (error) {
        console.error('Error loading types:', error);
      } finally {
        setLoadingTypes(false);
      }
    };

    loadTypes();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    onTypeFilterChange(value);
  };

  return (
    <div className="search-filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Pokémon by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="filter-box">
        <select
          value={selectedType || ''}
          onChange={handleTypeChange}
          className="filter-select"
          disabled={loadingTypes}
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;

