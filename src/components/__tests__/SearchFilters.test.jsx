import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useCountry } from "../../context/CountryContext";
import "@testing-library/jest-dom";
import SearchFilters from "../SearchFilters";

// Mock the CountryContext
jest.mock("../../context/CountryContext");

describe("SearchFilters", () => {
  let mockSearchCountries, mockFilterByRegion, mockFilterByLanguage;

  beforeEach(() => {
    // Reset mocks before each test
    mockSearchCountries = jest.fn();
    mockFilterByRegion = jest.fn();
    mockFilterByLanguage = jest.fn();

    // Configure the mock return value directly on the imported mock
    useCountry.mockReturnValue({
      searchCountries: mockSearchCountries,
      filterByRegion: mockFilterByRegion,
      filterByLanguage: mockFilterByLanguage,
      availableLanguages: ["English", "Spanish", "French", "Arabic", "Chinese"],
    });
  });

  it("renders search input, region filter, and language filter", () => {
    render(<SearchFilters />);

    // Check if search input exists
    expect(
      screen.getByPlaceholderText("Search for a country...")
    ).toBeInTheDocument();

    // Check if region filter exists
    expect(screen.getByTestId("region-filter")).toBeInTheDocument();

    // Check if language filter exists
    expect(screen.getByTestId("language-filter")).toBeInTheDocument();
  });

  it("allows selecting a region", () => {
    render(<SearchFilters />);

    // Select a region
    fireEvent.change(screen.getByTestId("region-filter"), {
      target: { value: "Europe" },
    });

    // Check if filterByRegion was called with the correct region
    expect(mockFilterByRegion).toHaveBeenCalledWith("Europe");
  });

  it("allows selecting a language", () => {
    render(<SearchFilters />);

    // Select a language
    fireEvent.change(screen.getByTestId("language-filter"), {
      target: { value: "Spanish" },
    });

    // Check if filterByLanguage was called with the correct language
    expect(mockFilterByLanguage).toHaveBeenCalledWith("Spanish");
  });

  it("allows searching for a country", async () => {
    render(<SearchFilters />);

    // Type in the search input
    fireEvent.change(screen.getByTestId("country-search-input"), {
      target: { value: "Germany" },
    });

    // Wait for debounce
    await waitFor(
      () => {
        expect(mockSearchCountries).toHaveBeenCalledWith("Germany");
      },
      { timeout: 600 }
    );
  });

  it("resets other filters when searching", async () => {
    render(<SearchFilters />);

    // First select a region
    fireEvent.change(screen.getByTestId("region-filter"), {
      target: { value: "Europe" },
    });

    // Then search for a country
    fireEvent.change(screen.getByTestId("country-search-input"), {
      target: { value: "Germany" },
    });

    // Wait for debounce
    await waitFor(
      () => {
        expect(mockSearchCountries).toHaveBeenCalledWith("Germany");
        // Check that region filter was reset
        expect(screen.getByTestId("region-filter").value).toBe("");
        expect(screen.getByTestId("language-filter").value).toBe("");
      },
      { timeout: 600 }
    );
  });

  it("resets other filters when selecting a region", () => {
    render(<SearchFilters />);

    // First type in search
    fireEvent.change(screen.getByTestId("country-search-input"), {
      target: { value: "Germany" },
    });

    // Then select a region
    fireEvent.change(screen.getByTestId("region-filter"), {
      target: { value: "Europe" },
    });

    // Check that search was reset
    expect(screen.getByTestId("country-search-input").value).toBe("");
    expect(screen.getByTestId("language-filter").value).toBe("");
  });

  it("resets other filters when selecting a language", () => {
    render(<SearchFilters />);

    // First type in search
    fireEvent.change(screen.getByTestId("country-search-input"), {
      target: { value: "Germany" },
    });

    // Then select a language
    fireEvent.change(screen.getByTestId("language-filter"), {
      target: { value: "Spanish" },
    });

    // Check that search was reset
    expect(screen.getByTestId("country-search-input").value).toBe("");
    expect(screen.getByTestId("region-filter").value).toBe("");
  });
});
