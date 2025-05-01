import { Link } from "react-router-dom"

function NotFoundPage() {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
            <Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                Return Home
            </Link>
        </div>
    )
}

export default NotFoundPage
