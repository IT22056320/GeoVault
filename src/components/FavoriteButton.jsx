import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Heart } from "lucide-react"

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
      className={`p-2 rounded-full ${
        isFavorite ? "bg-red-500 text-white" : "bg-white/80 text-gray-600 backdrop-blur-sm"
      } hover:scale-110 transition-all duration-200 shadow-md`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
    </button>
  )
}

export default FavoriteButton
