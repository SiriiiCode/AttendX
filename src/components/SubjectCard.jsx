import { useAttendance } from "../context/AttendanceContext"
import AttendanceCircle from "./AttendanceCircle"
export default function SubjectCard({
  id,
  name,
  code,
  percentage,
  totalClasses,
  attendedClasses,
  missedClasses,
  

  showActions = false,
  currentStatus,
}) {

  const {
    markAttendance,
  } = useAttendance()

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-white font-bold text-lg">
            {name}
          </h2>

          <p className="text-slate-400 text-sm">
            {code}
          </p>

        </div>

        <div className="flex flex-col items-center">

  <AttendanceCircle
    percentage={percentage}
  />

  <p className="text-slate-500 text-xs mt-2">
    Attendance
  </p>

</div>

      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">

        <div>
          <p className="text-slate-500 text-xs">
            Total
          </p>

          <p className="text-white font-bold text-lg">
            {totalClasses}
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-xs">
            Attended
          </p>

          <p className="text-green-400 font-bold text-lg">
            {attendedClasses}
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-xs">
            Missed
          </p>

          <p className="text-red-400 font-bold text-lg">
            {missedClasses}
          </p>
        </div>

      </div>
      {showActions && currentStatus && (

  <div className="mt-4">

    <p className="text-sm text-slate-400">
      Today's Status:
    </p>

    <div className={`mt-2 inline-flex px-4 py-2 rounded-xl font-semibold ${
      currentStatus === "present"

        ? "bg-green-500/20 text-green-400"

        : currentStatus === "absent"

        ? "bg-red-500/20 text-red-400"

        : "bg-slate-700 text-slate-300"
    }`}>

      {currentStatus === "present"
        ? "Present"

        : currentStatus === "absent"
        ? "Absent"

        : "No Class"}

    </div>

  </div>

)}

      {showActions && (

        <div className="mt-5 grid grid-cols-3 gap-3">

          <button
            onClick={() =>
              markAttendance(id, "present")
            }
            className="bg-green-500 hover:bg-green-600 transition rounded-xl py-3 font-semibold text-white"
          >
            Present
          </button>

          <button
            onClick={() =>
              markAttendance(id, "absent")
            }
            className="bg-red-500 hover:bg-red-600 transition rounded-xl py-3 font-semibold text-white"
          >
            Absent
          </button>

          <button
            onClick={() =>
              markAttendance(id, "no_class")
            }
            className="bg-slate-700 hover:bg-slate-600 transition rounded-xl py-3 font-semibold text-white"
          >
            No Class
          </button>

        </div>

      )}

    </div>
  )
}
