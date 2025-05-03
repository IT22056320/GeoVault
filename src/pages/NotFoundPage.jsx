import { Link } from "react-router-dom"
import { AlertCircle, Home } from "lucide-react"

function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 text-red-600 rounded-full mb-6">
          <AlertCircle className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8 text-lg">The page you are looking for does not exist or has been moved.</p>
        <Link
          to="/"
          className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
        >
          <Home className="h-5 w-5 mr-2" />
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
