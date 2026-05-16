import {
  useParams,
} from "react-router-dom"

import {
  useAttendance,
} from "../context/AttendanceContext"
import { useState } from "react"
import Calendar from "react-calendar"
export default function SubjectDetail() {

  const { id } = useParams()

  const {
    subjects,
    calculateStats,
    updateSubject,
    requiredPercentage,
  } = useAttendance()

  const subject =
    subjects.find(
      (subject) =>
        subject.id === Number(id)
    )
    const [isEditing, setIsEditing]=useState(false)

  
  

   const [editedName, setEditedName] =
  useState(subject?.name || "")

const [editedCode, setEditedCode] =
  useState(subject?.code || "")

const [
  editedTotalClasses,
  setEditedTotalClasses,
] = useState(subject?.initialTotalClasses || 0)

const [
  editedAttendedClasses,
  setEditedAttendedClasses,
] = useState(
  subject?.initialAttendedClasses || 0
)

const [
  editedSchedule,
  setEditedSchedule,
] = useState(subject?.schedule || []) 


const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const [selectedDate, setSelectedDate]=useState(new Date())
const today=new Date()
const isFutureDate=selectedDate > new Date(today.getFullYear(), today.getMonth(), today.getDate())
if (!subject) {

    return (
      <div className="p-6 text-white">
        Subject not found
      </div>
    )
  }
  const stats =
    calculateStats(subject)

  const insight =
  getAttendanceInsight()  
function toggleDay(day) {

  if (
    editedSchedule.includes(day)
  ) {

    setEditedSchedule(

      editedSchedule.filter(
        (d) => d !== day
      )
    )

  } else {

    setEditedSchedule([
      ...editedSchedule,
      day,
    ])
  }
}
function handleSave() {

  const total =
    Number(editedTotalClasses)

  const attended =
    Number(editedAttendedClasses)

  if (
    total <= 0 ||
    attended < 0 ||
    attended > total ||
    !Number.isInteger(total) ||
    !Number.isInteger(attended)
  ) {

    alert(
      "Enter valid attendance values"
    )

    return
  }

  updateSubject({

    ...subject,

    name: editedName,

    code: editedCode,

    initialTotalClasses:
      total,

    initialAttendedClasses:
      attended,

    schedule: editedSchedule,
  })

  setIsEditing(false)
}
function updateAttendanceStatus(
  status
) {

  const formattedDate =
    formatDate(selectedDate)

  const existingRecords =
    subject.records[
      formattedDate
    ] || []

  updateSubject({

    ...subject,

    records: {

      ...subject.records,

      [formattedDate]:

  status === "no_class"

    ? ["no_class"]

    : existingRecords.includes(
        "no_class"
      )

    ? [status]

    : [
        ...existingRecords,
        status,
      ]
    },
  })
}

function getAttendanceStatus(
  date
) {

  const formattedDate =
    formatDate(date)

  const records =
    subject.records[
      formattedDate
    ]

  if (!records) {
    return []
  }

  return Array.isArray(records)
    ? records
    : [records]
}
function formatDate(date) {

  return (
    `${date.getFullYear()}-${
      String(
        date.getMonth() + 1
      ).padStart(2, "0")
    }-${
      String(
        date.getDate()
      ).padStart(2, "0")
    }`
  )
}
function getAttendanceInsight() {

  const required =
    requiredPercentage / 100

  const attended =
    stats.attendedClasses

  const total =
    stats.totalClasses

  if (total === 0) {

    return {
      type: "neutral",

      message:
        "No attendance data yet.",
    }
  }

  const currentPercentage =
    attended / total

  if (
    currentPercentage >= required
  ) {

    const canMiss = Math.floor(

      (
        attended -

        required * total
      ) / required
    )

    return {

      type: "safe",

      message:
        `You can miss ${canMiss} more classes safely.`,
    }
  }

  const needToAttend =
    Math.ceil(

      (
        required * total -

        attended
      ) /

      (1 - required)
    )

  return {

    type: "danger",

    message:
      `Attend next ${needToAttend} classes continuously to recover ${requiredPercentage}.`,
  }
}
  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold text-white">
        {subject.name}
      </h1>

      <p className="text-slate-400 mt-2">
        {subject.code}
      </p>
      <button
  onClick={() =>
    setIsEditing(!isEditing)
  }

  className="mt-5 bg-indigo-500 hover:bg-indigo-600 transition px-4 py-2 rounded-xl text-white"
>
  {isEditing
    ? "Cancel"
    : "Edit Subject"}
</button>

      {isEditing && (

  <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">

    <input
      type="text"

      value={editedName}

      onChange={(e) =>
        setEditedName(
          e.target.value
        )
      }

      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
    />

    <input
      type="text"

      value={editedCode}

      onChange={(e) =>
        setEditedCode(
          e.target.value
        )
      }

      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
    />

    <input
      type="number"
      min="0"
      step="1"

      value={editedTotalClasses}

      onChange={(e) =>
        setEditedTotalClasses(
          e.target.value
        )
      }

      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
    />

    <input
      type="number"
      min="0"
      step="1"

      value={editedAttendedClasses}

      onChange={(e) =>
        setEditedAttendedClasses(
          e.target.value
        )
      }

      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
    />

    <div className="flex flex-wrap gap-3">

      {weekDays.map((day) => (

        <button
          key={day}

          onClick={() =>
            toggleDay(day)
          }

          className={`px-4 py-2 rounded-xl border transition ${
            editedSchedule.includes(day)
              ? "bg-indigo-500 border-indigo-500 text-white"
              : "bg-slate-800 border-slate-700 text-slate-400"
          }`}
        >
          {day}
        </button>

      ))}

    </div>

    <button
      onClick={handleSave}

      className="w-full bg-green-500 hover:bg-green-600 transition rounded-xl py-3 font-semibold text-white"
    >
      Save Changes
    </button>

  </div>

)}
      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <p className={`text-5xl font-bold ${
          stats.percentage >= 75
            ? "text-green-400"
            : "text-red-400"
        }`}>
          {stats.percentage}%
        </p>

        <p className="text-slate-400 mt-2">
  Attendance Percentage
</p>

<div className={`mt-5 rounded-2xl p-4 ${
  insight.type === "safe"
    ? "bg-green-500/10 border border-green-500/20"
    : insight.type === "danger"
    ? "bg-red-500/10 border border-red-500/20"
    : "bg-slate-800 border border-slate-700"
}`}>

  <p className={`font-medium ${
    insight.type === "safe"
      ? "text-green-400"
      : insight.type === "danger"
      ? "text-red-400"
      : "text-slate-300"
  }`}>
    {insight.message}
  </p>

</div>

        
            <div className="grid grid-cols-3 gap-4 mt-8">

          <div>
            <p className="text-slate-500 text-sm">
              Total
            </p>

            <p className="text-white text-2xl font-bold">
              {stats.totalClasses}
            </p>
          </div>

          <div>
            <p className="text-slate-500 text-sm">
              Attended
            </p>

            <p className="text-green-400 text-2xl font-bold">
              {stats.attendedClasses}
            </p>
          </div>

          <div>
            <p className="text-slate-500 text-sm">
              Missed
            </p>

            <p className="text-red-400 text-2xl font-bold">
              {stats.missedClasses}
            </p>
          </div>

        </div>

        
        

        

      </div>

      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-white text-2xl font-bold">
          Schedule
        </h2>

        <div className="flex flex-wrap gap-3 mt-5">

          {subject.schedule.map((day) => (

            <div
              key={day}

              className="bg-slate-800 px-4 py-2 rounded-xl text-slate-300"
            >
              {day}
            </div>

          ))}

        </div>

      </div>
      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">

  <h2 className="text-white text-2xl font-bold">
    Attendance Calendar
  </h2>

  <div className="mt-5">

    <Calendar
    className="attendance-calendar"

      onChange={setSelectedDate}

      value={selectedDate}
      

      tileContent={({ date }) => {

  const statuses =
    getAttendanceStatus(date)

  return (
    <div className="flex justify-center gap-1 mt-1 flex-wrap">

      {statuses.map(
        (status, index) => (

          <div
            key={index}
             className={`w-2 h-2 rounded-full ${
              status === "present"
                ? "bg-green-500"
                : status === "absent"
                ? "bg-red-500"
                : "bg-slate-500"
            }`}
          />

        )
      )}

    </div>
  )
}}

    />
    <div className="mt-6">

  <p className="text-slate-400 mb-3">
    Selected Date:
  </p>

  <p className="text-white text-lg font-semibold">
    {selectedDate.toDateString()}
  </p>
{!isFutureDate&&(
    <div className="grid grid-cols-3 gap-3 mt-5">

    <button
      onClick={() =>
        updateAttendanceStatus(
          "present"
        )
      }

      className="bg-green-500 hover:bg-green-600 transition rounded-xl py-3 font-semibold text-white"
    >
      Present
    </button>

    <button
      onClick={() =>
        updateAttendanceStatus(
          "absent"
        )
      }

      className="bg-red-500 hover:bg-red-600 transition rounded-xl py-3 font-semibold text-white"
    >
      Absent
    </button>

    <button
      onClick={() =>
        updateAttendanceStatus(
          "no_class"
        )
      }

      className="bg-slate-700 hover:bg-slate-600 transition rounded-xl py-3 font-semibold text-white"
    >
      No Class
    </button>

  </div>
  
)}


{isFutureDate && (

  <div className="mt-5 bg-slate-800 rounded-xl p-4">

    <p className="text-slate-400 text-sm">
      Future dates cannot be edited yet.
    </p>

  </div>

)}
  

</div>

  </div>

</div>

    </div>
    
  )
}