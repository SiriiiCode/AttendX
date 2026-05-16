import { useState } from "react"

import {
  useAttendance,
} from "../context/AttendanceContext"
import { useNavigate } from "react-router-dom"
import AIUpload from "../components/AIUpload"
export default function Subjects() {

  const {
    subjects,
    addSubject,
    deleteSubject,
    updateSubject,
  } = useAttendance()

  const [name, setName] =
    useState("")

  const [code, setCode] =
    useState("")

  const [
    initialTotalClasses,
    setInitialTotalClasses,
  ] = useState("")

  const [
    initialAttendedClasses,
    setInitialAttendedClasses,
  ] = useState("")

  const [selectedDays, setSelectedDays] =
    useState([])

  const [editingId, setEditingId] =
    useState(null)

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const navigate=useNavigate()

  function toggleDay(day) {

    if (selectedDays.includes(day)) {

      setSelectedDays(
        selectedDays.filter(
          (d) => d !== day
        )
      )

    } else {

      setSelectedDays([
        ...selectedDays,
        day,
      ])
    }
  }

  function handleAddSubject() {

    if (!name || !code) return

    addSubject({
      name,
      code,

      schedule: selectedDays,

      initialTotalClasses,
      initialAttendedClasses,
    })

    setName("")
    setCode("")

    setInitialTotalClasses("")
    setInitialAttendedClasses("")

    setSelectedDays([])
  }

  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold text-white">
        Subjects
      </h1>
      <AIUpload />

      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-5">

        <h2 className="text-white text-xl font-bold">
          Add Subject
        </h2>

        <div className="mt-5 space-y-4">

          <input
            type="text"
            placeholder="Subject Name"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          />

          <input
            type="text"
            placeholder="Subject Code"

            value={code}

            onChange={(e) =>
              setCode(e.target.value)
            }

            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Total Classes Done"

            value={initialTotalClasses}

            onChange={(e) =>
              setInitialTotalClasses(
                e.target.value
              )
            }

            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Classes Attended"

            value={initialAttendedClasses}

            onChange={(e) =>
              setInitialAttendedClasses(
                e.target.value
              )
            }

            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          />

          <div>

            <p className="text-slate-400 mb-3">
              Select Days
            </p>

            <div className="flex flex-wrap gap-3">

              {weekDays.map((day) => (

                <button
                  key={day}

                  onClick={() =>
                    toggleDay(day)
                  }

                  className={`px-4 py-2 rounded-xl border transition ${
                    selectedDays.includes(day)
                      ? "bg-indigo-500 border-indigo-500 text-white"
                      : "bg-slate-800 border-slate-700 text-slate-400"
                  }`}
                >
                  {day}
                </button>

              ))}

            </div>

          </div>

          <button
            onClick={handleAddSubject}

            className="w-full bg-indigo-500 hover:bg-indigo-600 transition rounded-xl py-3 font-semibold text-white"
          >
            Add Subject
          </button>

        </div>

      </div>

      <div className="mt-8">

        <h2 className="text-white text-2xl font-bold">
          Current Subjects
        </h2>

        <div className="mt-5 space-y-3">

          {subjects.map((subject) => (

            <div
              key={subject.id}
              onClick={()=> navigate(`/subjects/${subject.id}`)}

              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 cursor-pointer"
            >

              {editingId === subject.id ? (

                <div className="space-y-4">

                  <input
                    type="text"

                    value={subject.name}

                    onChange={(e) =>
                      updateSubject({
                        ...subject,

                        name: e.target.value,
                      })
                    }

                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
                  />

                  <input
                    type="text"

                    value={subject.code}

                    onChange={(e) =>
                      updateSubject({
                        ...subject,

                        code: e.target.value,
                      })
                    }

                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
                  />

                  <button
                    onClick={(e) =>{
                        e.stopPropagation()
                      setEditingId(null)
                    }}

                    className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded-xl text-white"
                  >
                    Save
                  </button>

                </div>

              ) : (

                <>

                  <div className="flex items-start justify-between">

                    <div>

                      <h3 className="text-white font-bold">
                        {subject.name}
                      </h3>

                      <p className="text-slate-400 text-sm">
                        {subject.code}
                      </p>

                    </div>

                    <div className="flex gap-2">

                      <button
                        onClick={(e) =>{
                            e.stopPropagation()
                            setEditingId(subject.id)
                        }
                          
                        }

                        className="bg-indigo-500 hover:bg-indigo-600 transition px-3 py-2 rounded-lg text-sm text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={(e) =>{
                            e.stopPropagation()

                          deleteSubject(subject.id)
                        }}

                        className="bg-red-500 hover:bg-red-600 transition px-3 py-2 rounded-lg text-sm text-white"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">

                    {subject.schedule.map((day) => (

                      <div
                        key={day}

                        className="bg-slate-800 px-3 py-1 rounded-lg text-sm text-slate-300"
                      >
                        {day}
                      </div>

                    ))}

                  </div>

                </>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}