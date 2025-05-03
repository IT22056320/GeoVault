import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import CountryCard from "../CountryCard"
import "@testing-library/jest-dom"

// Mock the AuthContext
jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    user: null,
  }),
}))

describe("CountryCard", () => {
  const mockCountry = {
    name: {
      common: "Test Country",
      official: "Official Test Country",
    },
    cca3: "TST",
    population: 1000000,
    region: "Test Region",
    capital: ["Test Capital"],
    flags: {
      svg: "https://test.com/flag.svg",
      png: "https://test.com/flag.png",
    },
    languages: {
      eng: "English",
      spa: "Spanish",
    },
  }

  it("renders country information correctly", () => {
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>,
    )

    // Check if country name is displayed
    expect(screen.getByText("Test Country")).toBeInTheDocument()

    // Check if population is displayed with formatting
    expect(screen.getByText("Population:")).toBeInTheDocument()
    expect(screen.getByText("1,000,000", { exact: false })).toBeInTheDocument()

    // Check if region is displayed
    expect(screen.getByText("Region:")).toBeInTheDocument()
    expect(screen.getByText("Test Region", { exact: false })).toBeInTheDocument()

    // Check if capital is displayed
    expect(screen.getByText("Capital:")).toBeInTheDocument()
    expect(screen.getByText("Test Capital", { exact: false })).toBeInTheDocument()

    // Check if languages are displayed
    expect(screen.getByText("Languages:")).toBeInTheDocument()
    expect(screen.getByText("English, Spanish", { exact: false })).toBeInTheDocument()
  })

  it("handles missing capital correctly", () => {
    const countryWithoutCapital = {
      ...mockCountry,
      capital: undefined,
    }

    render(
      <BrowserRouter>
        <CountryCard country={countryWithoutCapital} />
      </BrowserRouter>,
    )

    expect(screen.getByText("Capital:")).toBeInTheDocument()
    expect(screen.getByText("N/A", { exact: false })).toBeInTheDocument()
  })

  it("handles missing languages correctly", () => {
    const countryWithoutLanguages = {
      ...mockCountry,
      languages: undefined,
    }

    render(
      <BrowserRouter>
        <CountryCard country={countryWithoutLanguages} />
      </BrowserRouter>,
    )

    // Languages section should not be displayed
    expect(screen.queryByText("Languages:")).not.toBeInTheDocument()
  })
})
