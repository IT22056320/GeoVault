import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Globe, Home, Heart, User, LogOut, LogIn, Menu, X } from "lucide-react"

function Header() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <div className="bg-white text-blue-700 p-2 rounded-full mr-3 transform transition-transform group-hover:rotate-12">
              <Globe className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">GeoVault</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-blue-800 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-300 transition duration-200 flex items-center gap-1 font-medium"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="hover:text-blue-300 transition duration-200 flex items-center gap-1 font-medium"
                >
                  <Heart className="h-4 w-4" />
                  Favorites
                </Link>
              </li>
              {user ? (
                <>
                  <li className="flex items-center bg-blue-800 px-3 py-1 rounded-full">
                    <User className="h-4 w-4 mr-1" />
                    <span>{user}</span>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="flex items-center hover:text-blue-300 transition duration-200 font-medium"
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="bg-white text-blue-700 px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition duration-200 flex items-center gap-1"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-2">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-300 transition duration-200 flex items-center gap-2 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="hover:text-blue-300 transition duration-200 flex items-center gap-2 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-5 w-5" />
                  Favorites
                </Link>
              </li>
              {user ? (
                <>
                  <li className="flex items-center bg-blue-800 px-3 py-2 rounded-full w-fit">
                    <User className="h-5 w-5 mr-2" />
                    <span>{user}</span>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center hover:text-blue-300 transition duration-200 font-medium py-2"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="bg-white text-blue-700 px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition duration-200 flex items-center gap-2 w-fit"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-5 w-5" />
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
