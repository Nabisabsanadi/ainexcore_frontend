// src/components/AddTeachers.jsx
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";

const AddTeachers = () => {
  const [showForm, setShowForm] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teacherData, setTeacherData] = useState({
    name: "",
    email: "",
    subject: "",
    course: "",
  });
  const [editId, setEditId] = useState(null);
  const API_URL = "https://ainexcore-backend.onrender.com"; // Live backend URL
  useEffect(() => {
    fetchTeachers();
    fetchCourses();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/teachers`);
      const data = await res.json();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/api/courses`);
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleInputChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      const url = editId
        ? `${API_URL}/api/teachers/update/${editId}`
        : `${API_URL}/api/teachers/add`;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacherData),
      });

      if (res.ok) {
        alert(editId ? "Teacher updated successfully!" : "Teacher added successfully!");
        setTeacherData({ name: "", email: "", subject: "", course: "" });
        setShowForm(false);
        setEditId(null);
        fetchTeachers();
      } else {
        const data = await res.json();
        alert(data.message || "Error saving teacher");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (teacher) => {
    setTeacherData(teacher);
    setEditId(teacher._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    try {
      const res = await fetch(`${API_URL}/api/teachers/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Teacher deleted!");
        fetchTeachers();
      }
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className="bg-[#1B2C5B] p-4 sm:p-6 rounded-2xl shadow-md overflow-x-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-[#F36F25] text-center sm:text-left">
        Manage Teachers
      </h2>

      {!showForm ? (
        <>
          <div className="flex justify-center sm:justify-start">
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-[#112B66] via-[#623BA3] to-[#F36F25] px-4 sm:px-5 py-2 rounded-lg mb-5 flex items-center gap-2 text-white text-sm sm:text-base"
            >
              <FaPlusCircle /> Add Teacher
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
                    Email
                  </th>
                  <th className="p-3 border-b border-gray-600 whitespace-nowrap">
                    Subject
                  </th>
                  <th className="p-3 border-b border-gray-600 whitespace-nowrap">
                    Course
                  </th>
                  <th className="p-3 border-b border-gray-600 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {teachers.length > 0 ? (
                  teachers.map((t) => (
                    <tr key={t._id} className="hover:bg-[#2A3C7A] transition">
                      <td className="p-3 border-b border-gray-700">{t.name}</td>
                      <td className="p-3 border-b border-gray-700 break-words">
                        {t.email}
                      </td>
                      <td className="p-3 border-b border-gray-700">{t.subject}</td>
                      <td className="p-3 border-b border-gray-700">{t.course}</td>
                      <td className="p-3 border-b border-gray-700 space-x-3">
                        <button
                          onClick={() => handleEdit(t)}
                          className="text-[#FBBF24] hover:text-yellow-400"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(t._id)}
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
                      colSpan="5"
                      className="text-center py-4 text-gray-400 text-sm sm:text-base"
                    >
                      No teachers found.
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
            {editId ? "Edit Teacher" : "Add New Teacher"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Teacher Name"
              value={teacherData.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#1B2C5B] border border-gray-600 text-white"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={teacherData.email}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#1B2C5B] border border-gray-600 text-white"
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={teacherData.subject}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#1B2C5B] border border-gray-600 text-white"
              required
            />

            <select
              name="course"
              value={teacherData.course}
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
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#112B66] via-[#623BA3] to-[#F36F25] px-4 sm:px-5 py-2 rounded-lg text-white text-sm sm:text-base"
            >
              {editId ? "Update Teacher" : "Save Teacher"}
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

export default AddTeachers;
