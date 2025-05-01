"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"

function FavoriteButton({ countryCode }) {
    const { user } = useAuth()
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        if (!user) return

        // Check if this country is in the user's favorites
        const favorites = JSON.parse(localStorage.getItem(`favorites_${user}`) || "[]")
        setIsFavorite(favorites.includes(countryCode))
    }, [user, countryCode])

    const toggleFavorite = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!user) return

        // Get current favorites
        const favorites = JSON.parse(localStorage.getItem(`favorites_${user}`) || "[]")

        // Toggle favorite status
        let newFavorites
        if (isFavorite) {
            newFavorites = favorites.filter((code) => code !== countryCode)
        } else {
            newFavorites = [...favorites, countryCode]
        }

        // Save to localStorage
        localStorage.setItem(`favorites_${user}`, JSON.stringify(newFavorites))
        setIsFavorite(!isFavorite)
    }

    if (!user) return null

    return (
        <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full ${isFavorite ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-500"
                } hover:bg-opacity-80 transition-colors`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill={isFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        </button>
    )
}

export default FavoriteButton
