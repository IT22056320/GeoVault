import CountryList from "../components/CountryList";
import SearchFilters from "../components/SearchFilters";

function HomePage() {
  return (
    <main className="container mx-auto px-4 py-4 sm:py-8">
      <div className="mb-8 sm:mb-12 text-center">
        <div className="relative py-8 sm:py-12 px-4 sm:px-6 mb-6 sm:mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern
                  id="world-pattern"
                  patternUnits="userSpaceOnUse"
                  width="100"
                  height="100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <circle
                    cx="0"
                    cy="100"
                    r="25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <circle
                    cx="100"
                    cy="0"
                    r="25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#world-pattern)" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 relative">
            Explore Our World
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto relative">
            Discover detailed information about countries, cultures, and
            geography from around the globe
          </p>
        </div>
      </div>

      <SearchFilters />
      <CountryList />
    </main>
  );
}

export default HomePage;
