import { useState } from "react"

import {
  useAttendance,
} from "../context/AttendanceContext"

export default function Settings() {

  const {

    requiredPercentage,

    setRequiredPercentage,

  } = useAttendance()

  const [
    value,
    setValue,
  ] = useState(
    requiredPercentage
  )

  function handleSave() {

    const number =
      Number(value)

    if (
      number < 0 ||
      number > 100
    ) {
      return
    }

    setRequiredPercentage(
      number
    )
  }

  return (

    <div className="p-6">

      <h1 className="text-4xl font-bold text-white">
        Settings
      </h1>

      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-white text-2xl font-bold">
          Required Attendance
        </h2>

        <p className="text-slate-400 mt-2">
          Set your minimum attendance percentage.
        </p>

        <input
          type="number"

          value={value}

          onChange={(e) =>
            setValue(
              e.target.value
            )
          }

          className="w-full mt-5 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
        />

        <button
          onClick={handleSave}

          className="w-full mt-5 bg-indigo-500 hover:bg-indigo-600 transition rounded-xl py-3 font-semibold text-white"
        >
          Save
        </button>

      </div>

    </div>
  )
}