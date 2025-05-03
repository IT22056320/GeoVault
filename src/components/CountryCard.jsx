import { Link } from "react-router-dom"
import FavoriteButton from "./FavoriteButton"
import { Users, Globe, MapPin, MessageSquare } from "lucide-react"

function CountryCard({ country }) {
  // Extract languages as an array of strings
  const languages = country.languages ? Object.values(country.languages) : []

  return (
    <Link to={`/country/${country.cca3}`} className="block h-full">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full relative group">
        <div className="h-48 relative overflow-hidden">
          <img
            src={country.flags.svg || country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton countryCode={country.cca3} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold mb-3 text-gray-800">{country.name.common}</h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-600" />
              <span className="font-medium">Population:</span> {country.population.toLocaleString()}
            </p>
            <p className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-blue-600" />
              <span className="font-medium">Region:</span> {country.region}
            </p>
            <p className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-blue-600" />
              <span className="font-medium">Capital:</span> {country.capital?.[0] || "N/A"}
            </p>
            {languages.length > 0 && (
              <p className="flex items-start">
                <MessageSquare className="h-4 w-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                <span>
                  <span className="font-medium">Languages:</span>{" "}
                  <span className="line-clamp-1">{languages.join(", ")}</span>
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CountryCard
