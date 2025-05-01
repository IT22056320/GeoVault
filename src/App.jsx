import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import CountryPage from "./pages/CountryPage"
import LoginPage from "./pages/LoginPage"
import FavoritesPage from "./pages/FavoritesPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:code" element={<CountryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 GeoVault | Your World of Data, One Request Away</p>
        </div>
      </footer>
    </div>
  )
}

export default App
