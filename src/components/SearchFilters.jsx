"use client"

import { useState, useEffect } from "react"
import { useCountry } from "../context/CountryContext"

function SearchFilters() {
    const [searchTerm, setSearchTerm] = useState("")
    const [region, setRegion] = useState("")
    const { searchCountries, filterByRegion } = useCountry()

    // Debounce search to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm) {
                searchCountries(searchTerm)
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [searchTerm, searchCountries])

    // Handle region change
    const handleRegionChange = (e) => {
        const selectedRegion = e.target.value
        setRegion(selectedRegion)
        filterByRegion(selectedRegion)
    }

    // Handle search form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchTerm) {
            searchCountries(searchTerm)
        }
    }

    return (
        <div className="mb-8 flex flex-col md:flex-row md:justify-between gap-4">
            <form onSubmit={handleSubmit} className="relative md:w-1/2">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a country..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </form>

            <div className="w-full md:w-64">
                <select
                    value={region}
                    onChange={handleRegionChange}
                    className="w-full py-3 px-4 rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                    <option value="">Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
        </div>
    )
}

export default SearchFilters
