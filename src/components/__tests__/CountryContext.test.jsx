import { render, act } from "@testing-library/react"
import { CountryProvider, useCountry } from "../../context/CountryContext"
import "@testing-library/jest-dom"

// Mock the API functions
jest.mock("../../lib/api", () => ({
  getAllCountries: jest.fn(),
  searchCountriesByName: jest.fn(),
  getCountriesByRegion: jest.fn(),
  getCountriesByLanguage: jest.fn(),
}))

// Test component that uses the CountryContext
function TestComponent() {
  const {
    countries,
    loading,
    error,
    availableLanguages,
    fetchAllCountries,
    searchCountries,
    filterByRegion,
    filterByLanguage,
  } = useCountry()

  return (
    <div>
      <div data-testid="loading">{loading.toString()}</div>
      <div data-testid="error">{error || "no error"}</div>
      <div data-testid="countries-count">{countries.length}</div>
      <div data-testid="languages-count">{availableLanguages.length}</div>
      <button data-testid="fetch-all" onClick={fetchAllCountries}>
        Fetch All
      </button>
      <button data-testid="search" onClick={() => searchCountries("test")}>
        Search
      </button>
      <button data-testid="filter-region" onClick={() => filterByRegion("Europe")}>
        Filter Region
      </button>
      <button data-testid="filter-language" onClick={() => filterByLanguage("English")}>
        Filter Language
      </button>
    </div>
  )
}

describe("CountryContext", () => {
  const {
    getAllCountries,
    searchCountriesByName,
    getCountriesByRegion,
    getCountriesByLanguage,
  } = require("../../lib/api")

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("provides the country context values", () => {
    const { getByTestId } = render(
      <CountryProvider>
        <TestComponent />
      </CountryProvider>,
    )

    expect(getByTestId("loading").textContent).toBe("false")
    expect(getByTestId("error").textContent).toBe("no error")
    expect(getByTestId("countries-count").textContent).toBe("0")
  })

  it("fetches all countries", async () => {
    const mockCountries = [
      {
        name: { common: "Test Country" },
        languages: { eng: "English", spa: "Spanish" },
      },
      {
        name: { common: "Another Country" },
        languages: { fra: "French" },
      },
    ]

    getAllCountries.mockResolvedValueOnce(mockCountries)

    const { getByTestId } = render(
      <CountryProvider>
        <TestComponent />
      </CountryProvider>,
    )

    await act(async () => {
      getByTestId("fetch-all").click()
    })

    expect(getAllCountries).toHaveBeenCalled()
    expect(getByTestId("countries-count").textContent).toBe("2")
    expect(getByTestId("languages-count").textContent).toBe("3") // English, Spanish, French
  })

  it("searches countries by name", async () => {
    const mockCountries = [{ name: { common: "Test Country" } }]
    searchCountriesByName.mockResolvedValueOnce(mockCountries)

    const { getByTestId } = render(
      <CountryProvider>
        <TestComponent />
      </CountryProvider>,
    )

    await act(async () => {
      getByTestId("search").click()
    })

    expect(searchCountriesByName).toHaveBeenCalledWith("test")
    expect(getByTestId("countries-count").textContent).toBe("1")
  })

  it("filters countries by region", async () => {
    const mockCountries = [{ name: { common: "European Country" }, region: "Europe" }]
    getCountriesByRegion.mockResolvedValueOnce(mockCountries)

    const { getByTestId } = render(
      <CountryProvider>
        <TestComponent />
      </CountryProvider>,
    )

    await act(async () => {
      getByTestId("filter-region").click()
    })

    expect(getCountriesByRegion).toHaveBeenCalledWith("Europe")
    expect(getByTestId("countries-count").textContent).toBe("1")
  })

  it("filters countries by language", async () => {
    const mockCountries = [{ name: { common: "English Speaking Country" }, languages: { eng: "English" } }]
    getCountriesByLanguage.mockResolvedValueOnce(mockCountries)

    const { getByTestId } = render(
      <CountryProvider>
        <TestComponent />
      </CountryProvider>,
    )

    await act(async () => {
      getByTestId("filter-language").click()
    })

    expect(getCountriesByLanguage).toHaveBeenCalledWith("English")
    expect(getByTestId("countries-count").textContent).toBe("1")
  })

  it("handles API errors", async () => {
    getAllCountries.mockRejectedValueOnce(new Error("API Error"))

    const { getByTestId } = render(
      <CountryProvider>
        <TestComponent />
      </CountryProvider>,
    )

    await act(async () => {
      getByTestId("fetch-all").click()
    })

    expect(getAllCountries).toHaveBeenCalled()
    expect(getByTestId("error").textContent).not.toBe("no error")
  })
})
