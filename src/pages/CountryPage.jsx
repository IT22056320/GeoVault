"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { getCountryByCode } from "../lib/api"
import Loading from "../components/Loading"
import FavoriteButton from "../components/FavoriteButton"

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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
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
            <Link to="/" className="inline-flex items-center mb-6 text-gray-700 hover:text-gray-900">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Countries
            </Link>

            <div className="grid md:grid-cols-2 gap-10">
                <div className="relative h-64 md:h-auto">
                    <img
                        src={country.flags.svg || country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                        className="w-full h-full object-contain"
                    />
                    <div className="absolute top-2 right-2">
                        <FavoriteButton countryCode={country.cca3} />
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-6">{country.name.common}</h1>

                    <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 mb-8">
                        <div>
                            <p>
                                <span className="font-semibold">Official Name:</span> {country.name.official}
                            </p>
                            <p>
                                <span className="font-semibold">Population:</span> {country.population.toLocaleString()}
                            </p>
                            <p>
                                <span className="font-semibold">Region:</span> {country.region}
                            </p>
                            <p>
                                <span className="font-semibold">Sub Region:</span> {country.subregion || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Capital:</span> {country.capital?.[0] || "N/A"}
                            </p>
                        </div>

                        <div>
                            <p>
                                <span className="font-semibold">Top Level Domain:</span> {country.tld?.[0] || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Currencies:</span>{" "}
                                {currencies.length > 0 ? currencies.join(", ") : "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Languages:</span> {languages.length > 0 ? languages.join(", ") : "N/A"}
                            </p>
                        </div>
                    </div>

                    {borders.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-3">Border Countries:</h2>
                            <div className="flex flex-wrap gap-2">
                                {borders.map((border) => (
                                    <span key={border} className="px-4 py-1 bg-white shadow-sm rounded text-sm">
                                        {border}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CountryPage
