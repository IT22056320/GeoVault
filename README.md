[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

# REST Countries Explorer - GeoVault

A React application that allows users to explore countries around the world using the REST Countries API. This project was developed as part of the SE3040 – Application Frameworks assignment at SLIIT.

## Live Demo

View the live application - https://geo-vault.vercel.app/

## Features

- View all countries with essential information
- Search for countries by name
- Filter countries by region
- View detailed information about each country
- User authentication (demo)
- Save favorite countries (for logged-in users)
- Responsive design for all device sizes

## Technologies Used

- **Frontend Framework:** React (Functional Components)
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **API Integration:** REST Countries API
- **Testing:** Jest and React Testing Library
- **Build Tool:** Vite

## Application Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-IT22056320.git
   cd af-2-IT22056320
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Build Process

To create a production build:

```bash
npm run build
# or
yarn build
```

This will generate optimized files in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## Testing

Run the tests:

```bash
npm run test
# or
yarn test
```

## Usage Instructions

### Exploring Countries

- The homepage displays a grid of all countries
- Use the search bar to find countries by name
- Use the region dropdown to filter countries by region
- Click on any country card to view more detailed information

### User Authentication

- Click "Login" in the navigation bar
- Enter any username and password (this is a demo authentication)
- Once logged in, you can add countries to your favorites

### Managing Favorites

- When logged in, you'll see a heart icon on each country card
- Click the heart to add/remove a country from your favorites
- Access your favorites from the "Favorites" link in the navigation bar

## Project Structure

```
src/
├── components/         # Reusable UI components
├── context/           # React Context providers
├── lib/               # Utility functions and API services
├── pages/             # Page components
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
```

## API Report

### Chosen APIs

This application uses the [REST Countries API](https://restcountries.com/), which provides comprehensive data about countries worldwide. The API is free to use, requires no authentication, and offers various endpoints to access country information.

Specifically, the application uses the following endpoints:

1. **GET /all** - Retrieves all countries with selected fields
   - Used for the homepage to display all countries
   - Optimized by requesting only necessary fields

2. **GET /name/{name}** - Searches countries by name
   - Powers the search functionality
   - Returns partial matches for better user experience

3. **GET /region/{region}** - Filters countries by region
   - Used for the region filter dropdown
   - Provides a quick way to explore countries by geographical area

4. **GET /alpha/{code}** - Retrieves detailed information about a specific country
   - Used for the country detail page
   - Provides comprehensive information about a single country

