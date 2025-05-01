"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import CountryCard from "../components/CountryCard"
import { getCountryByCode } from "../lib/api"

function FavoritesPage() {
    const { user } = useAuth()
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFavorites() {
            if (!user) return

            try {
                // Get favorite country codes from localStorage
                const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${user}`) || "[]")

                if (storedFavorites.length === 0) {
                    setFavorites([])
                    setLoading(false)
                    return
                }

                // Fetch details for each favorite country
                const countriesData = await Promise.all(
                    storedFavorites.map(async (code) => {
                        const country = await getCountryByCode(code)
                        return country
                    }),
                )

                // Filter out any null values (failed fetches)
                setFavorites(countriesData.filter(Boolean))
            } catch (error) {
                console.error("Error loading favorites:", error)
            } finally {
                setLoading(false)
            }
        }

        loadFavorites()
    }, [user])

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-6">Favorites</h1>
                <p className="mb-6">Please log in to view your favorite countries.</p>
                <Link
                    to="/login"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Login
                </Link>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Favorite Countries</h1>

            {favorites.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500 mb-6">You haven't added any countries to your favorites yet.</p>
                    <Link
                        to="/"
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Explore Countries
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map((country) => (
                        <CountryCard key={country.cca3} country={country} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default FavoritesPage
