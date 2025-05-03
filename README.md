[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

### GeoVault - World Countries Explorer

## Project Overview

GeoVault is a comprehensive React application that allows users to explore countries from around the world. The application fetches data from the REST Countries API and presents it in an intuitive, user-friendly interface.

### Key Features

- **Country Exploration**: Browse through countries with detailed information including population, capital, region, languages, and more
- **Search Functionality**: Search for specific countries by name
- **Filtering Options**: Filter countries by region or language
- **Favorites System**: Save your favorite countries for quick access (requires login)
- **Detailed Country View**: View comprehensive information about each country including borders, currencies, and flags
- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **User Authentication**: Simple login system to manage user preferences


## Setup and Installation Instructions

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn (v1.22.0 or higher)


### Installation Steps

1. Clone the repository:

```shellscript
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-IT22056320.git
cd af-2-IT22056320
```


2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Start the development server:

```shellscript
npm run dev
# or
yarn dev
```


4. Open your browser and navigate to `http://localhost:5173` to view the application


### Building for Production

To create a production build:

```shellscript
npm run build
# or
yarn build
```

The build files will be located in the `dist` directory.

## How to Use the Application

### Home Page

- The home page displays a grid of country cards
- Use the search bar at the top to search for countries by name
- Use the dropdown filters to filter countries by region or language
- Click on any country card to view detailed information


### Country Details

- The country details page shows comprehensive information about the selected country
- View the country's flag, population, capital, region, languages, and more
- If logged in, you can add the country to your favorites by clicking the heart icon
- Use the "Back to Countries" button to return to the home page


### Favorites

- To access your favorites, click on the "Favorites" link in the navigation bar
- You must be logged in to view and manage your favorites
- Your favorites are saved to your account and will persist between sessions
- Click on any favorite country to view its details
- Remove a country from your favorites by clicking the heart icon again


### User Authentication

- Click the "Login" button in the navigation bar to access the login page
- Enter any username and password (this is a demo application)
- Once logged in, your username will appear in the navigation bar
- Click "Logout" to end your session


## API Integration Details

GeoVault integrates with the [REST Countries API](https://restcountries.com/) to fetch country data. The application uses the following endpoints:

### API Endpoints Used

1. **Get All Countries**

1. Endpoint: `https://restcountries.com/v3.1/all`
2. Used to fetch all countries for the main listing
3. Fields requested: name, capital, population, region, subregion, flags, cca3, languages



2. **Search Countries by Name**

1. Endpoint: `https://restcountries.com/v3.1/name/{name}`
2. Used when searching for countries by name
3. Fields requested: name, capital, population, region, subregion, flags, cca3, languages



3. **Filter Countries by Region**

1. Endpoint: `https://restcountries.com/v3.1/region/{region}`
2. Used when filtering countries by region
3. Fields requested: name, capital, population, region, subregion, flags, cca3, languages



4. **Get Country by Code**

1. Endpoint: `https://restcountries.com/v3.1/alpha/{code}`
2. Used to fetch detailed information about a specific country
3. Returns all available fields for the country


### API Implementation

The API integration is implemented in the `src/lib/api.js` file. The application uses the following functions:

- `getAllCountries()`: Fetches all countries
- `searchCountriesByName(name)`: Searches countries by name
- `getCountriesByRegion(region)`: Filters countries by region
- `getCountriesByLanguage(language)`: Filters countries by language (client-side filtering)
- `getCountryByCode(code)`: Gets detailed information for a specific country


## Testing Instructions

GeoVault includes comprehensive tests for components and API functions. The tests are written using Jest and React Testing Library.

### Running Tests

To run all tests:

```shellscript
npm test
# or
yarn test
```

To run tests with coverage:

```shellscript
npm test -- --coverage
# or
yarn test --coverage
```

### Test Structure

The tests are organized in the `src/components/__tests__` directory:

- `api.test.js`: Tests for API functions
- `CountryCard.test.jsx`: Tests for the CountryCard component
- `CountryContext.test.jsx`: Tests for the CountryContext
- `SearchFilters.test.jsx`: Tests for the SearchFilters component


### Writing New Tests

To add new tests:

1. Create a new test file in the `src/components/__tests__` directory
2. Import the necessary testing utilities:

```javascript
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
```


3. Import the component or function you want to test
4. Write your test cases using Jest's `describe` and `it` functions
5. Use React Testing Library's utilities to interact with components


## Project Structure

```plaintext
AF-2-IT22056320/
├── public/               # Public assets
├── src/                  # Source code
│   ├── components/       # Reusable UI components
│   │   ├── __tests__/    # Component tests
│   │   ├── CountryCard.jsx
│   │   ├── CountryList.jsx
│   │   ├── FavoriteButton.jsx
│   │   ├── Header.jsx
│   │   ├── Loading.jsx
│   │   └── SearchFilters.jsx
│   ├── context/          # React context providers
│   │   ├── AuthContext.jsx
│   │   └── CountryContext.jsx
│   ├── lib/              # Utility functions
│   │   └── api.js        # API integration
│   ├── pages/            # Page components
│   │   ├── CountryPage.jsx
│   │   ├── FavoritesPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── App.css           # Global styles
│   ├── App.jsx           # Main application component
│   ├── index.css         # Tailwind imports
│   └── main.jsx          # Application entry point
├── .eslintrc.js          # ESLint configuration
├── babel.config.js       # Babel configuration
├── jest.config.js        # Jest configuration
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration
```

## Technologies Used

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation and routing
- **Tailwind CSS**: For styling and responsive design
- **Lucide React**: For icons
- **Jest & React Testing Library**: For testing
- **Vite**: Build tool and development server


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Created by Senavirathna K.M.U.T - [IT22056320](https://github.com/IT22056320)
