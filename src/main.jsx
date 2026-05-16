import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "react-calendar/dist/Calendar.css"
import "./index.css"
import App from "./App"
import { AttendanceProvider } from "./context/AttendanceContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AttendanceProvider>
        <App />
      </AttendanceProvider>
    </BrowserRouter>
  </React.StrictMode>
)