import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import CountryPage from "./pages/CountryPage"
import LoginPage from "./pages/LoginPage"
import FavoritesPage from "./pages/FavoritesPage"
import NotFoundPage from "./pages/NotFoundPage"
import { Globe, Facebook, Twitter, Instagram } from "lucide-react"

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
      <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center">
              <Globe className="h-6 w-6 mr-2 text-blue-300" />
              <span className="text-xl font-bold">GeoVault</span>
            </div>
            <p className="text-blue-200">© 2025 GeoVault | Your World of Data, One Request Away</p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
