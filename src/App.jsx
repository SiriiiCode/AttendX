import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import SubjectDetail from "./pages/SubjectDetails"


import Home from "./pages/Home"
import Today from "./pages/Today"
import Subjects from "./pages/Subjects"
import Settings from "./pages/Settings"

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      
      <div className="max-w-md mx-auto pb-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/today" element={<Today />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/subjects/:id" element={<SubjectDetail/>} />
        </Routes>
      </div>

      <Navbar />
    </div>
  )
}