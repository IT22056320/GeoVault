import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Globe, Home, Heart, User, LogOut, LogIn } from "lucide-react"

function Header() {
  const { user, logout } = useAuth()

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

          <nav>
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
      </div>
    </header>
  )
}

export default Header
