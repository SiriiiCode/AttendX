import { Home, Calendar, BookOpen, Settings } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {

  const location = useLocation()

  const navItems = [
    {
      path: "/",
      icon: Home,
      label: "Home",
    },
    {
      path: "/today",
      icon: Calendar,
      label: "Today",
    },
    {
      path: "/subjects",
      icon: BookOpen,
      label: "Subjects",
    },
    {
      path: "/settings",
      icon: Settings,
      label: "Settings",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-[#0a0f1e]/90 backdrop-blur-lg">

      <div className="max-w-md mx-auto flex justify-around py-4">

        {navItems.map((item) => {

          const Icon = item.icon
          const active = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center transition ${
                active
                  ? "text-indigo-400"
                  : "text-slate-500"
              }`}
            >
              <Icon size={22} />
              <span className="text-xs mt-1">
                {item.label}
              </span>
            </Link>
          )
        })}

      </div>

    </div>
  )
}