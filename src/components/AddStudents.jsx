import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";

const AddStudents = () => {
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentData, setStudentData] = useState({
    name: "",
    course: "",
    semester: "",
    email: "",
    phone: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/courses");
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleInputChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      const url = editId
        ? `http://localhost:5000/api/students/update/${editId}`
        : "http://localhost:5000/api/students/add";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });

      if (res.ok) {
        alert(editId ? "Student updated successfully!" : "Student added successfully!");
        setStudentData({
          name: "",
          course: "",
          semester: "",
          email: "",
          phone: "",
        });
        setShowForm(false);
        setEditId(null);
        fetchStudents();
      } else {
        const data = await res.json();
        alert(data.message || "Error saving student");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (student) => {
    setStudentData(student);
    setEditId(student._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/students/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Student deleted!");
        fetchStudents();
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="bg-[#1B2C5B] p-4 sm:p-6 rounded-2xl shadow-md text-white overflow-x-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-[#F36F25] text-center sm:text-left">
        Manage Students
      </h2>

      {!showForm ? (
        <>
          <div className="flex justify-center sm:justify-start">
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-[#112B66] via-[#623BA3] to-[#F36F25] px-4 sm:px-5 py-2 rounded-lg mb-5 flex items-center gap-2 text-white text-sm sm:text-base"
            >
              <FaPlusCircle /> Add Student
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 text-left text-sm sm:text-base">
              <thead className="bg-[#112B66]">
                <tr>
                  <th className="p-3 border-b border-gray-600 whitespace-nowrap">
                    Name
                  </th>
                  <th className="p-3 border-b border-gray-600 whitespace-nowrap">
                    Course
                  </th>
                  <th className="p-3 border-b border-gray-600 whitespace-nowrap">
                    Semester
                  </th>
                  <th className="p-3 border-b border-gray-600 whitespace-nowrap">
                    Email
                  </th>
                  <th className="p-3 border-b border-gray-600 whitespace-nowrap">
                    Phone
                  </th>
                  <th className="p-3 border-b border-gray-600 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((s) => (
                    <tr key={s._id} className="hover:bg-[#2A3C7A] transition">
                      <td className="p-3 border-b border-gray-700">{s.name}</td>
                      <td className="p-3 border-b border-gray-700">{s.course}</td>
                      <td className="p-3 border-b border-gray-700">
                        {s.semester}
                      </td>
                      <td className="p-3 border-b border-gray-700 break-words">
                        {s.email}
                      </td>
                      <td className="p-3 border-b border-gray-700">{s.phone}</td>
                      <td className="p-3 border-b border-gray-700 space-x-3">
                        <button
                          onClick={() => handleEdit(s)}
                          className="text-[#FBBF24] hover:text-yellow-400"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          className="text-[#F36F25] hover:text-red-500"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-4 text-gray-400 text-sm sm:text-base"
                    >
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <form
          onSubmit={handleAddOrUpdate}
          className="bg-[#0E1630] p-4 sm:p-6 rounded-lg space-y-4 mt-4"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[#F36F25] text-center sm:text-left">
            {editId ? "Edit Student" : "Add New Student"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={studentData.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#1B2C5B] border border-gray-600 text-white"
              required
            />

            <select
              name="course"
              value={studentData.course}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#1B2C5B] border border-gray-600 text-white"
              required
            >
              <option value="">Select Course</option>
              {courses.length > 0 ? (
                courses.map((c) => (
                  <option key={c._id} value={c.name || c.courseName}>
                    {c.name || c.courseName}
                  </option>
                ))
              ) : (
                <option disabled>No courses available</option>
              )}
            </select>

            <input
              type="text"
              name="semester"
              placeholder="Semester"
              autoComplete="off"
              value={studentData.semester}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#1B2C5B] border border-gray-600 text-white"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              value={studentData.email}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#1B2C5B] border border-gray-600 text-white"
            />

            <input
              type="text"
              name="phone"
              autoComplete="off"
              placeholder="Phone"
              value={studentData.phone}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#1B2C5B] border border-gray-600 text-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#112B66] via-[#623BA3] to-[#F36F25] px-4 sm:px-5 py-2 rounded-lg text-white text-sm sm:text-base"
            >
              {editId ? "Update Student" : "Save Student"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditId(null);
              }}
              className="bg-[#F36F25] hover:bg-[#d85b17] px-4 sm:px-5 py-2 rounded-lg text-white text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddStudents;
