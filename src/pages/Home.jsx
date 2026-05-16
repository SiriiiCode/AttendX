import { useAttendance } from "../context/AttendanceContext"
import SubjectCard from "../components/SubjectCard"

export default function Home() {

  const {
    requiredPercentage,
    subjects,
    calculateStats,
  } = useAttendance()

  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold text-white">
        AttendX
      </h1>

      <p className="text-slate-400 mt-2">
        Upload your timetable and let me set up the attendance track for you!
      </p>

      <p className="text-indigo-400 mt-4">
        Required Attendance: {requiredPercentage}%
      </p>

      <div className="mt-8 space-y-4">

        {subjects.map((subject) => {

          const stats = calculateStats(subject)

          return (
            <SubjectCard
            showActions={false}
              key={subject.id}
              id={subject.id}

              name={subject.name}
              code={subject.code}

              percentage={stats.percentage}

              totalClasses={stats.totalClasses}

              attendedClasses={stats.attendedClasses}
              missedClasses={stats.missedClasses}
            />
          )
        })}

      </div>

    </div>
  )
}