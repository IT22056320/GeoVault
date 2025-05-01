import { Link } from "react-router-dom"
import FavoriteButton from "./FavoriteButton"

function CountryCard({ country }) {
    return (
        <Link to={`/country/${country.cca3}`} className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 h-full relative">
                <div className="h-40 relative">
                    <img
                        src={country.flags.svg || country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                        <FavoriteButton countryCode={country.cca3} />
                    </div>
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-2">{country.name.common}</h2>
                    <div className="text-sm text-gray-700">
                        <p>
                            <span className="font-semibold">Population:</span> {country.population.toLocaleString()}
                        </p>
                        <p>
                            <span className="font-semibold">Region:</span> {country.region}
                        </p>
                        <p>
                            <span className="font-semibold">Capital:</span> {country.capital?.[0] || "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CountryCard
