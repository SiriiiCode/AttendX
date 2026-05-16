import { useAttendance } from "../context/AttendanceContext"
import SubjectCard from "../components/SubjectCard"
import { useState } from "react"
export default function Today() {

  const {
    subjects,
    calculateStats,
  } = useAttendance()
  const{
    addExtraClassAttendance,
  }=useAttendance()
  const [
    showExtraClass,
    setShowExtraClass,
  ]=useState(false)
  const [
    selectedSubjectId,
    setSelectedSubjectId,
  ]=useState("")


  const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const today =
  weekDays[new Date().getDay()]

  const todaysSubjects =
    subjects.filter((subject) => {

      return subject.schedule.includes(today)

    })

  return (
  <>

    <div className="p-6">

      <h1 className="text-4xl font-bold text-white">
        Today's Classes
      </h1>


      <p className="text-slate-400 mt-2">
        {today}
      </p>

      <div className="mt-8 space-y-4">

        {todaysSubjects.length === 0 ? (

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">

            <p className="text-slate-400">
              No classes today 🎉
            </p>

          </div>

        ) : (

          todaysSubjects.map((subject) => {

            const todayDate =
  new Date()

const formattedToday =
  `${todayDate.getFullYear()}-${
    String(
      todayDate.getMonth() + 1
    ).padStart(2, "0")
  }-${
    String(
      todayDate.getDate()
    ).padStart(2, "0")
  }`

const currentStatus =

  subject.records?.[
    formattedToday
  ]?.[0]
            const stats =
              calculateStats(subject)

            return (

              <SubjectCard
                showActions={true}

                key={subject.id}

                id={subject.id}

                name={subject.name}

                code={subject.code}

                percentage={
                  stats.percentage
                }

                totalClasses={
                  stats.totalClasses
                }

                attendedClasses={
                  stats.attendedClasses
                }

                missedClasses={
                  stats.missedClasses
                }
                currentStatus={
                    currentStatus
                }
              />

            )
          })

        )}

      </div>

    </div>

    <button
      onClick={() =>
        setShowExtraClass(true)
      }

      className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-indigo-500 hover:bg-indigo-600 transition text-white text-3xl shadow-lg z-50"
    >
      +
    </button>

    {showExtraClass && (

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-[90%] max-w-md">

          <h2 className="text-2xl font-bold text-white">
            Add Extra Class
          </h2>

          <select

            value={selectedSubjectId}

            onChange={(e) =>
              setSelectedSubjectId(
                e.target.value
              )
            }

            className="w-full mt-5 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          >

            <option value="">
              Select Subject
            </option>

            {subjects.map((subject) => (

              <option
                key={subject.id}

                value={subject.id}
              >
                {subject.name}
              </option>

            ))}

          </select>

          {selectedSubjectId && (

            <div className="grid grid-cols-2 gap-3 mt-5">

              <button
                onClick={() => {

                  addExtraClassAttendance(
                    Number(
                      selectedSubjectId
                    ),
                    "present"
                  )

                  setShowExtraClass(false)

                  setSelectedSubjectId("")
                }}

                className="bg-green-500 hover:bg-green-600 transition rounded-xl py-3 font-semibold text-white"
              >
                Present
              </button>

              <button
                onClick={() => {

                  addExtraClassAttendance(
                    Number(
                      selectedSubjectId
                    ),
                    "absent"
                  )

                  setShowExtraClass(false)

                  setSelectedSubjectId("")
                }}

                className="bg-red-500 hover:bg-red-600 transition rounded-xl py-3 font-semibold text-white"
              >
                Absent
              </button>

            </div>

          )}

          <button
            onClick={() => {

              setShowExtraClass(false)

              setSelectedSubjectId("")
            }}

            className="w-full mt-5 bg-slate-800 hover:bg-slate-700 transition rounded-xl py-3 text-white"
          >
            Cancel
          </button>

        </div>

      </div>

    )}

  </>
)
}