const BASE_URL = "https://restcountries.com/v3.1"

// Get all countries with essential fields
export async function getAllCountries() {
    const response = await fetch(`${BASE_URL}/all?fields=name,capital,population,region,subregion,flags,cca3`)

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
    }

    return response.json()
}

// Search countries by name
export async function searchCountriesByName(name) {
    const response = await fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,region,subregion,flags,cca3`)

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
    }

    return response.json()
}

// Get countries by region
export async function getCountriesByRegion(region) {
    const response = await fetch(
        `${BASE_URL}/region/${region}?fields=name,capital,population,region,subregion,flags,cca3`,
    )

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
    }

    return response.json()
}

// Get country by code (alpha code)
export async function getCountryByCode(code) {
    try {
        const response = await fetch(`${BASE_URL}/alpha/${code}`)

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        return data[0] || null
    } catch (error) {
        console.error("Error fetching country by code:", error)
        return null
    }
}
