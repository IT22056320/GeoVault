import { useEffect } from "react"
import { useCountry } from "../context/CountryContext"
import CountryCard from "./CountryCard"
import Loading from "./Loading"

function CountryList() {
    const { countries, loading, error, fetchAllCountries } = useCountry()

    useEffect(() => {
        fetchAllCountries()
    }, [fetchAllCountries])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => fetchAllCountries()}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Try Again
                </button>
            </div>
        )
    }

    if (countries.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">No countries found matching your criteria.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country) => (
                <CountryCard key={country.cca3} country={country} />
            ))}
        </div>
    )
}

export default CountryList
