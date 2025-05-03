import { createContext, useContext, useState, useCallback } from "react"
import { getAllCountries, searchCountriesByName, getCountriesByRegion, getCountriesByLanguage } from "../lib/api"

const CountryContext = createContext()

export function CountryProvider({ children }) {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [availableLanguages, setAvailableLanguages] = useState([])

  const fetchAllCountries = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllCountries()
      setCountries(data)

      // Extract all available languages from the countries data
      const languagesSet = new Set()
      data.forEach((country) => {
        if (country.languages) {
          Object.values(country.languages).forEach((language) => {
            languagesSet.add(language)
          })
        }
      })

      // Convert Set to sorted array
      setAvailableLanguages(Array.from(languagesSet).sort())
    } catch (err) {
      setError("Failed to fetch countries. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const searchCountries = useCallback(
    async (name) => {
      if (!name.trim()) {
        fetchAllCountries()
        return
      }

      setLoading(true)
      setError(null)
      try {
        const data = await searchCountriesByName(name)
        setCountries(data)
      } catch (err) {
        if (err.message && err.message.includes("404")) {
          setCountries([])
        } else {
          setError("Failed to search countries. Please try again.")
          console.error(err)
        }
      } finally {
        setLoading(false)
      }
    },
    [fetchAllCountries],
  )

  const filterByRegion = useCallback(
    async (region) => {
      if (!region) {
        fetchAllCountries()
        return
      }

      setLoading(true)
      setError(null)
      try {
        const data = await getCountriesByRegion(region)
        setCountries(data)
      } catch (err) {
        setError("Failed to filter countries. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
    [fetchAllCountries],
  )

  const filterByLanguage = useCallback(
    async (language) => {
      if (!language) {
        fetchAllCountries()
        return
      }

      setLoading(true)
      setError(null)
      try {
        const data = await getCountriesByLanguage(language)
        setCountries(data)
      } catch (err) {
        setError("Failed to filter countries by language. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
    [fetchAllCountries],
  )

  return (
    <CountryContext.Provider
      value={{
        countries,
        loading,
        error,
        availableLanguages,
        fetchAllCountries,
        searchCountries,
        filterByRegion,
        filterByLanguage,
      }}
    >
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry() {
  const context = useContext(CountryContext)
  if (context === undefined) {
    throw new Error("useCountry must be used within a CountryProvider")
  }
  return context
}
