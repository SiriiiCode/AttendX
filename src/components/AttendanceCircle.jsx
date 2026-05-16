import { useContext } from "react"
import { AttendanceContext } from "../context/AttendanceContext"
export default function AttendanceCircle({
  percentage,
}) {
  const { requiredPercentage } =
  useContext(AttendanceContext)

  const isSafe =
    percentage >= requiredPercentage

  const progressColor =
    isSafe
      ? "#4ade80"
      : "#f87171"

  return (

    <div className="relative w-20 h-20 flex items-center justify-center">

      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"

        style={{

          background: `conic-gradient(
            ${progressColor} ${
              percentage * 3.6
            }deg,

            #0f172a ${
              percentage * 3.6
            }deg
          )`,
        }}
      >

        <div
          className="absolute w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center"
        >

          <p
            className={`text-sm font-bold ${
              isSafe
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {percentage}%
          </p>

        </div>

      </div>

      <div
        className="absolute inset-0 rounded-full blur-xl opacity-40"

        style={{

          background: `conic-gradient(
            ${progressColor} ${
              percentage * 3.6
            }deg,

            transparent ${
              percentage * 3.6
            }deg
          )`,
        }}
      />

    </div>
  )
}