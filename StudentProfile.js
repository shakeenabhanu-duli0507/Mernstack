"use client";
import { useEffect, useState } from "react";

export default function MarkAttendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");

  // Fetch Students
  useEffect(() => {
    fetch("/api/faculty/get-students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  // Handle Present/Absent Click
  const handleStatusChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // Save Attendance
  const handleSubmit = async () => {
    const records = Object.keys(attendance).map((studentId) => ({
      studentId,
      status: attendance[studentId],
      date,
    }));

    await fetch("/api/faculty/mark-attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ records }),
    });

    alert("Attendance Saved Successfully ✅");
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>

      <input
        type="date"
        className="border p-2 mb-4"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>S.No</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id} className="text-center border">
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
              <td>
                <button
                  className={`px-3 py-1 ${
                    attendance[student._id] === "Present"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() =>
                    handleStatusChange(student._id, "Present")
                  }
                >
                  ✔
                </button>
              </td>
              <td>
                <button
                  className={`px-3 py-1 ${
                    attendance[student._id] === "Absent"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() =>
                    handleStatusChange(student._id, "Absent")
                  }
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Save Attendance
      </button>
    </div>
  );
}