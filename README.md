# Pokédex Lite

A simple, responsive web application for exploring Pokémon using the PokéAPI.

## Features

- 📋 **List Pokémon** - Browse through Pokémon with pagination
- 🔍 **Search** - Search Pokémon by name across the entire database
- 🎯 **Filter by Type** - Filter Pokémon by their types
- ❤️ **Favorites** - Mark your favorite Pokémon (persisted in localStorage)
- 🔐 **OAuth Authentication** - Sign in with Google to personalize your experience
- 👤 **User Profile** - View your profile and manage your session
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- 🎨 **Modern UI** - Clean and intuitive user interface
- 📊 **Detailed View** - View comprehensive Pokémon details in a modal

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Google OAuth (optional but recommended):
   - See [AUTH_SETUP.md](./AUTH_SETUP.md) for detailed instructions
   - Create a `.env` file in the root directory
   - Add your Google OAuth Client ID:
     ```
     VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
     ```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

**Note:** The app works without authentication, but signing in allows you to save favorites and personalize your experience.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # React components
│   ├── PokemonCard.jsx      # Individual Pokémon card
│   ├── PokemonList.jsx      # Grid of Pokémon cards
│   ├── SearchAndFilter.jsx  # Search and filter controls
│   ├── Pagination.jsx       # Pagination controls
│   ├── PokemonDetailModal.jsx # Pokémon detail modal
│   ├── Login.jsx            # OAuth login component
│   └── UserProfile.jsx     # User profile display
├── contexts/            # React contexts
│   └── AuthContext.jsx     # Authentication context
├── services/            # API services
│   └── pokeApi.js           # PokéAPI integration
├── utils/               # Utility functions
│   └── favorites.js         # Favorites management
├── App.jsx              # Main app component
├── App.css              # App styles
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **PokéAPI** - Pokémon data API
- **@react-oauth/google** - Google OAuth integration
- **CSS3** - Styling with responsive design

## API Reference

This application uses the [PokéAPI](https://pokeapi.co/) to fetch Pokémon data.

## Features in Detail

### Search
Type in the search box to filter Pokémon by name in real-time.

### Filter by Type
Select a type from the dropdown to see all Pokémon of that type.

### Favorites
Click the heart icon on any Pokémon card to add it to your favorites. Favorites are saved in your browser's localStorage.

### Pagination
Navigate through pages of Pokémon using the pagination controls at the bottom.

### Detailed View
Click on any Pokémon card to view detailed information including:
- Official artwork
- Types
- Abilities
- Base stats with visual bars
- Height and weight

### OAuth Authentication
- Sign in with your Google account using OAuth 2.0
- Your session is persisted across browser refreshes
- View your profile information in the header
- Log out at any time
- See [AUTH_SETUP.md](./AUTH_SETUP.md) for setup instructions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for educational purposes.

