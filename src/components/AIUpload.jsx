import { useState } from "react"

import Tesseract from "tesseract.js"

import axios from "axios"

import {
  useAttendance,
} from "../context/AttendanceContext"

export default function AIUpload() {

  const {
    addSubject,
  } = useAttendance()

  const [
    loading,
    setLoading,
  ] = useState(false)

  async function handleImageUpload(
    e
  ) {

    const file =
      e.target.files[0]

    if (!file) return

    setLoading(true)

    try {

      const {
        data: { text },
      } = await Tesseract.recognize(
        file,
        "eng"
      )

      console.log(text)

      const prompt = `
You are given OCR text extracted from a college timetable.

Extract all UNIQUE subjects.

Return ONLY valid JSON array.

Format:

[
  {
    "name": "Subject Name",
    "code": "Subject Code",
    "schedule": ["Monday", "Wednesday"]
  }
]

Rules:
- Only weekdays allowed
- Remove duplicates
- No markdown
- No explanation
- Only raw JSON

OCR TEXT:
${text}
`

      const response =
        await axios.post(

          "https://openrouter.ai/api/v1/chat/completions",

          {

            model:
              "openai/gpt-3.5-turbo",

            messages: [
              {
                role: "user",

                content: prompt,
              },
            ],
          },

          {

            headers: {

              Authorization:
                `Bearer ${
                  import.meta.env
                    .VITE_OPENROUTER_API_KEY
                }`,

              "Content-Type":
                "application/json",
            },
          }
        )

      const aiText =

        response.data
          .choices[0]
          .message.content

      console.log(aiText)

      const cleanedText =
        aiText
          .replace(
            /```json/g,
            ""
          )
          .replace(
            /```/g,
            ""
          )
          .trim()

      const subjects =
        JSON.parse(
          cleanedText
        )

      subjects.forEach(
        (subject) => {

          addSubject({

            name:
              subject.name,

            code:
              subject.code,

            schedule:
              subject.schedule,

            initialTotalClasses: 0,

            initialAttendedClasses: 0,
          })
        }
      )

      alert(
        "Timetable imported successfully!"
      )

    } catch (error) {

      console.log(error)

      alert(
        "Failed to scan timetable."
      )
    }

    setLoading(false)
  }

  return (

    <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-5">

      <h2 className="text-white text-2xl font-bold">
        AI Timetable Scanner
      </h2>

      <p className="text-slate-400 mt-2">
        Upload timetable image to auto-add subjects.
      </p>

      <label className="mt-5 flex items-center justify-center h-40 border-2 border-dashed border-slate-700 rounded-2xl cursor-pointer hover:border-indigo-500 transition">

        <input
          type="file"

          accept="image/*"

          className="hidden"

          onChange={
            handleImageUpload
          }
        />

        <span className="text-slate-400">

          {loading

            ? "Scanning timetable..."

            : "Upload Timetable"}

        </span>

      </label>

    </div>
  )
}