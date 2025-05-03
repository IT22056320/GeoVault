import "@testing-library/jest-dom"
import { getAllCountries, searchCountriesByName, getCountriesByRegion, getCountriesByLanguage } from "../../lib/api"

// Mock fetch
global.fetch = jest.fn()

describe("API functions", () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("getAllCountries fetches data correctly", async () => {
    const mockData = [{ name: { common: "Test Country" } }]
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const result = await getAllCountries()
    expect(result).toEqual(mockData)
    expect(fetch).toHaveBeenCalledWith(
      "https://restcountries.com/v3.1/all?fields=name,capital,population,region,subregion,flags,cca3,languages",
    )
  })

  it("searchCountriesByName fetches data correctly", async () => {
    const mockData = [{ name: { common: "Germany" } }]
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const result = await searchCountriesByName("Germany")
    expect(result).toEqual(mockData)
    expect(fetch).toHaveBeenCalledWith(
      "https://restcountries.com/v3.1/name/Germany?fields=name,capital,population,region,subregion,flags,cca3,languages",
    )
  })

  it("getCountriesByRegion fetches data correctly", async () => {
    const mockData = [{ name: { common: "Germany" }, region: "Europe" }]
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const result = await getCountriesByRegion("Europe")
    expect(result).toEqual(mockData)
    expect(fetch).toHaveBeenCalledWith(
      "https://restcountries.com/v3.1/region/Europe?fields=name,capital,population,region,subregion,flags,cca3,languages",
    )
  })

  it("getCountriesByLanguage filters countries by language", async () => {
    const mockData = [
      {
        name: { common: "Spain" },
        languages: { spa: "Spanish", cat: "Catalan" },
      },
      {
        name: { common: "Mexico" },
        languages: { spa: "Spanish" },
      },
      {
        name: { common: "Brazil" },
        languages: { por: "Portuguese" },
      },
    ]

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const result = await getCountriesByLanguage("Spanish")
    expect(result).toHaveLength(2) // Should return Spain and Mexico
    expect(result[0].name.common).toBe("Spain")
    expect(result[1].name.common).toBe("Mexico")
    expect(fetch).toHaveBeenCalledWith(
      "https://restcountries.com/v3.1/all?fields=name,capital,population,region,subregion,flags,cca3,languages",
    )
  })

  it("getCountriesByLanguage handles case insensitive search", async () => {
    const mockData = [
      {
        name: { common: "Spain" },
        languages: { spa: "Spanish" },
      },
      {
        name: { common: "France" },
        languages: { fra: "French" },
      },
    ]

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const result = await getCountriesByLanguage("spanish")
    expect(result).toHaveLength(1)
    expect(result[0].name.common).toBe("Spain")
  })

  it("getCountriesByLanguage handles countries without languages", async () => {
    const mockData = [
      {
        name: { common: "Spain" },
        languages: { spa: "Spanish" },
      },
      {
        name: { common: "Unknown Country" },
        // No languages property
      },
    ]

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const result = await getCountriesByLanguage("Spanish")
    expect(result).toHaveLength(1)
    expect(result[0].name.common).toBe("Spain")
  })

  it("handles API errors correctly", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    })

    await expect(getAllCountries()).rejects.toThrow("API error: 404")
  })
})
