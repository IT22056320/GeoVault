import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CountryCard from "../components/CountryCard";
import { getCountryByCode } from "../lib/api";
import { Heart, Plus } from "lucide-react";

function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (!user) return;

      try {
        // Get favorite country codes from localStorage
        const storedFavorites = JSON.parse(
          localStorage.getItem(`favorites_${user}`) || "[]"
        );

        if (storedFavorites.length === 0) {
          setFavorites([]);
          setLoading(false);
          return;
        }

        // Fetch details for each favorite country
        const countriesData = await Promise.all(
          storedFavorites.map(async (code) => {
            const country = await getCountryByCode(code);
            return country;
          })
        );

        // Filter out any null values (failed fetches)
        setFavorites(countriesData.filter(Boolean));
      } catch (error) {
        console.error("Error loading favorites:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-16 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Favorites
        </h1>
        <p className="mb-4 sm:mb-6">
          Please log in to view your favorite countries.
        </p>
        <Link
          to="/login"
          className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-16 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Your Favorites
        </h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
        Your Favorite Countries
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-10 sm:py-16 bg-white rounded-2xl shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 text-gray-400 rounded-full mb-4 sm:mb-6">
            <Heart className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>
          <p className="text-gray-500 mb-4 sm:mb-6 text-base sm:text-lg">
            You haven't added any countries to your favorites yet.
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-blue-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            Explore Countries
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {favorites.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
