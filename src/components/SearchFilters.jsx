import { useState, useEffect } from "react"
import { useCountry } from "../context/CountryContext"
import { Search, ChevronDown, Globe, MessageSquare } from "lucide-react"

function SearchFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [region, setRegion] = useState("")
  const [language, setLanguage] = useState("")
  const { searchCountries, filterByRegion, filterByLanguage, availableLanguages } = useCountry()

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        searchCountries(searchTerm)
        // Reset other filters when searching
        setRegion("")
        setLanguage("")
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm, searchCountries])

  // Handle region change
  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value
    setRegion(selectedRegion)
    setLanguage("") // Reset language filter
    setSearchTerm("") // Reset search term
    filterByRegion(selectedRegion)
  }

  // Handle language change
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value
    setLanguage(selectedLanguage)
    setRegion("") // Reset region filter
    setSearchTerm("") // Reset search term
    filterByLanguage(selectedLanguage)
  }

  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm) {
      searchCountries(searchTerm)
      // Reset other filters
      setRegion("")
      setLanguage("")
    }
  }

  return (
    <div className="mb-8 flex flex-col md:flex-row md:justify-between gap-4">
      <form onSubmit={handleSubmit} className="relative md:w-1/3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-blue-500" />
          </div>
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl shadow-sm border-gray-200 border-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            data-testid="country-search-input"
          />
        </div>
      </form>

      <div className="w-full md:w-1/3 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Globe className="h-5 w-5 text-blue-500" />
          </div>
          <select
            value={region}
            onChange={handleRegionChange}
            className="w-full py-3 pl-10 pr-10 rounded-xl shadow-sm appearance-none border-gray-200 border-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            data-testid="region-filter"
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-blue-500" />
          </div>
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MessageSquare className="h-5 w-5 text-blue-500" />
          </div>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="w-full py-3 pl-10 pr-10 rounded-xl shadow-sm appearance-none border-gray-200 border-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            data-testid="language-filter"
          >
            <option value="">Filter by Language</option>
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchFilters
