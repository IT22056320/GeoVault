"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")

        // Simple validation
        if (!username || !password) {
            setError("Please enter both username and password")
            return
        }

        // For demo purposes, accept any non-empty credentials
        // In a real app, you would validate against a backend
        login(username)
        navigate("/")
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-md">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>For demo purposes, you can use any username and password</p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
