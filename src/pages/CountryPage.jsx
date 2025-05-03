import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { getCountryByCode } from "../lib/api"
import Loading from "../components/Loading"
import FavoriteButton from "../components/FavoriteButton"
import { ArrowLeft } from "lucide-react"

function CountryPage() {
  const { code } = useParams()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCountry() {
      try {
        setLoading(true)
        const data = await getCountryByCode(code)
        setCountry(data)
      } catch (err) {
        setError("Failed to load country details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCountry()
  }, [code])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center mb-6 text-gray-700 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Countries
        </Link>
        <Loading />
      </div>
    )
  }

  if (error || !country) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center mb-6 text-gray-700 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Countries
        </Link>
        <div className="text-center py-10">
          <p className="text-red-500">{error || "Country not found"}</p>
        </div>
      </div>
    )
  }

  // Extract languages as an array of strings
  const languages = country.languages ? Object.values(country.languages) : []

  // Extract currencies
  const currencies = country.currencies
    ? Object.entries(country.currencies).map(([code, currency]) => `${currency.name} (${currency.symbol || code})`)
    : []

  // Get border countries
  const borders = country.borders || []

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center mb-8 text-gray-700 hover:text-blue-600 transition-colors bg-white py-2 px-4 rounded-lg shadow-sm"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Countries
      </Link>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-auto bg-gray-100">
            <img
              src={country.flags.svg || country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <FavoriteButton countryCode={country.cca3} />
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">{country.name.common}</h1>

            <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 mb-8">
              <div className="space-y-3">
                <p className="flex items-center">
                  <span className="font-semibold text-gray-700 mr-2">Official Name:</span>
                  <span className="text-gray-600">{country.name.official}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold text-gray-700 mr-2">Population:</span>
                  <span className="text-gray-600">{country.population.toLocaleString()}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold text-gray-700 mr-2">Region:</span>
                  <span className="text-gray-600">{country.region}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold text-gray-700 mr-2">Sub Region:</span>
                  <span className="text-gray-600">{country.subregion || "N/A"}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold text-gray-700 mr-2">Capital:</span>
                  <span className="text-gray-600">{country.capital?.[0] || "N/A"}</span>
                </p>
              </div>

              <div className="space-y-3">
                <p className="flex items-center">
                  <span className="font-semibold text-gray-700 mr-2">Top Level Domain:</span>
                  <span className="text-gray-600">{country.tld?.[0] || "N/A"}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold text-gray-700 mr-2">Currencies:</span>
                  <span className="text-gray-600">{currencies.length > 0 ? currencies.join(", ") : "N/A"}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-semibold text-gray-700 mr-2">Languages:</span>
                  <span className="text-gray-600">{languages.length > 0 ? languages.join(", ") : "N/A"}</span>
                </p>
              </div>
            </div>

            {borders.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Border Countries:</h2>
                <div className="flex flex-wrap gap-2">
                  {borders.map((border) => (
                    <span
                      key={border}
                      className="px-4 py-2 bg-gray-100 shadow-sm rounded-lg text-sm font-medium text-gray-700"
                    >
                      {border}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryPage
