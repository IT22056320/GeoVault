import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import SearchFilters from "../SearchFilters"
import { describe, it, expect, vi } from "vitest"
import "@testing-library/jest-dom"

// Mock the CountryContext
vi.mock("../../context/CountryContext", () => ({
    useCountry: () => ({
        searchCountries: vi.fn(),
        filterByRegion: vi.fn(),
    }),
}))

describe("SearchFilters", () => {
    it("renders search input and region filter", () => {
        render(<SearchFilters />)

        // Check if search input exists
        expect(screen.getByPlaceholderText("Search for a country...")).toBeInTheDocument()

        // Check if region filter exists
        expect(screen.getByText("Filter by Region")).toBeInTheDocument()
    })

    it("allows selecting a region", () => {
        const { useCountry } = require("../../context/CountryContext")
        const mockFilterByRegion = vi.fn()
        useCountry.mockImplementation(() => ({
            searchCountries: vi.fn(),
            filterByRegion: mockFilterByRegion,
        }))

        render(<SearchFilters />)

        // Select a region
        fireEvent.change(screen.getByRole("combobox"), { target: { value: "Europe" } })

        // Check if filterByRegion was called with the correct region
        expect(mockFilterByRegion).toHaveBeenCalledWith("Europe")
    })

    it("allows searching for a country", async () => {
        const { useCountry } = require("../../context/CountryContext")
        const mockSearchCountries = vi.fn()
        useCountry.mockImplementation(() => ({
            searchCountries: mockSearchCountries,
            filterByRegion: vi.fn(),
        }))

        render(<SearchFilters />)

        // Type in the search input
        fireEvent.change(screen.getByPlaceholderText("Search for a country..."), {
            target: { value: "Germany" },
        })

        // Wait for debounce
        await waitFor(
            () => {
                expect(mockSearchCountries).toHaveBeenCalledWith("Germany")
            },
            { timeout: 600 },
        )
    })
})
