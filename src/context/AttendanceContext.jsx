import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react"

export const AttendanceContext =
  createContext()

export function AttendanceProvider({
  children,
}) {

  const [subjects, setSubjects] =
  useState(() => {

    const savedSubjects =
      localStorage.getItem(
        "subjects"
      )

    try {

      return savedSubjects

        ? JSON.parse(savedSubjects)

        : []
          

    } catch {

      return []
    }
})

  const [attendance, setAttendance] =
    useState({})

 const [
  requiredPercentage,
  setRequiredPercentage,
] = useState(() => {

  const saved =
    localStorage.getItem(
      "requiredPercentage"
    )

  return saved
    ? Number(saved)
    : 75
})

 

  useEffect(() => {

    localStorage.setItem(
      "subjects",

      JSON.stringify(subjects)
    )

  }, [subjects])
  useEffect(() => {

  localStorage.setItem(

    "requiredPercentage",

    requiredPercentage
  )

}, [requiredPercentage])

 function calculateStats(
  subject
) {

  const allRecords =

    Object.values(
      subject.records || {}
    ).flat()

  const recordedPresent =

    allRecords.filter(
      (record) =>
        record === "present"
    ).length

  const recordedAbsent =

    allRecords.filter(
      (record) =>
        record === "absent"
    ).length

  const attendedClasses =

    subject.initialAttendedClasses +

    recordedPresent

  const totalClasses =

    subject.initialTotalClasses +

    recordedPresent +

    recordedAbsent

  const missedClasses =

    totalClasses -

    attendedClasses

  const percentage =

    totalClasses === 0

      ? 0

      : Math.round(
          (
            attendedClasses /
            totalClasses
          ) * 100
        )

  return {

    attendedClasses,

    missedClasses,

    totalClasses,

    percentage,
  }
}
  function markAttendance(
  subjectId,
  status
) {

  const date = new Date()

  const today =
    `${date.getFullYear()}-${
      String(
        date.getMonth() + 1
      ).padStart(2, "0")
    }-${
      String(
        date.getDate()
      ).padStart(2, "0")
    }`

  setSubjects(
    (prevSubjects) =>

      prevSubjects.map(
        (subject) => {

          if (
            subject.id ===
            subjectId
          ) {

            const existingRecords =

              subject.records[
                today
              ] || []

            const extraClasses =
              existingRecords.slice(1)

            return {

              ...subject,

              records: {

                ...subject.records,

                [today]: [
                  status,
                  ...extraClasses,
                ],
              },
            }
          }

          return subject
        }
      )
  )
}
function addExtraClassAttendance(
  subjectId,
  status
) {

  const date = new Date()

  const today =
    `${date.getFullYear()}-${
      String(
        date.getMonth() + 1
      ).padStart(2, "0")
    }-${
      String(
        date.getDate()
      ).padStart(2, "0")
    }`

  setSubjects(
    (prevSubjects) =>

      prevSubjects.map(
        (subject) => {

          if (
            subject.id ===
            subjectId
          ) {

            const existingRecords =

              subject.records[
                today
              ] || []

            return {

              ...subject,

              records: {

                ...subject.records,

                [today]: [
                  ...existingRecords,
                  status,
                ],
              },
            }
          }

          return subject
        }
      )
  )
}

  function addSubject(
    newSubject
  ) {

    setSubjects(
      (prevSubjects) => [

        ...prevSubjects,

        {
          id: Date.now(),

          name:
            newSubject.name,

          code:
            newSubject.code,

          schedule:
            newSubject.schedule,

          initialTotalClasses:
            Number(
              newSubject.initialTotalClasses
            ) || 0,

          initialAttendedClasses:
            Number(
              newSubject.initialAttendedClasses
            ) || 0,

          records: {},
        },
      ]
    )
  }

  function deleteSubject(
    subjectId
  ) {

    setSubjects(
      (prevSubjects) =>

        prevSubjects.filter(
          (subject) =>

            subject.id !==
            subjectId
        )
    )
  }

  function updateSubject(
    updatedSubject
  ) {

    setSubjects(
      (prevSubjects) =>

        prevSubjects.map(
          (subject) =>

            subject.id ===
            updatedSubject.id

              ? updatedSubject

              : subject
        )
    )
  }

  return (

    <AttendanceContext.Provider
      value={{

        subjects,
        setSubjects,

        attendance,
        setAttendance,

        requiredPercentage,
        setRequiredPercentage,

        calculateStats,

        markAttendance,
        addExtraClassAttendance,

        addSubject,

        deleteSubject,

        updateSubject,
        
      }}
    >
      {children}
    </AttendanceContext.Provider>
  )
}

export function useAttendance() {

  return useContext(
    AttendanceContext
  )
}