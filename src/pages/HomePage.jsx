import CountryList from "../components/CountryList"
import SearchFilters from "../components/SearchFilters"

function HomePage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-2">Explore Countries</h1>
                <p className="text-gray-600">Discover information about countries around the world</p>
            </div>

            <SearchFilters />
            <CountryList />
        </main>
    )
}

export default HomePage
