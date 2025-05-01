import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App"
import { AuthProvider } from "./context/AuthContext"
import { CountryProvider } from "./context/CountryContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CountryProvider>
          <App />
        </CountryProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
