"use client"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Header() {
    const { user, logout } = useAuth()

    return (
        <header className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <span className="text-xl font-bold">GeoVault</span>
                    </Link>

                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <Link to="/" className="hover:text-blue-300 transition duration-200">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/favorites" className="hover:text-blue-300 transition duration-200">
                                    Favorites
                                </Link>
                            </li>
                            {user ? (
                                <>
                                    <li className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-1"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <span>{user}</span>
                                    </li>
                                    <li>
                                        <button onClick={logout} className="flex items-center hover:text-blue-300 transition duration-200">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-1"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                <polyline points="16 17 21 12 16 7"></polyline>
                                                <line x1="21" y1="12" x2="9" y2="12"></line>
                                            </svg>
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/login" className="hover:text-blue-300 transition duration-200">
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
