import React, { useEffect, useState } from "react";
import brand from "../images/brand.png";
import {
  FaUsers,
  FaBook,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaHome,
  FaTrash,
  FaEdit,
  FaPlusCircle,
  FaFileUpload,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import AddStudyMaterial from "./AddStudyMaterial";
import AddStudents from "./AddStudents";
import AddTeachers from "./AddTeachers";
const API_URL = "https://ainexcore-backend.onrender.com"; // Live backend URL
const AdminDashboard = () => {
  const [adminName, setAdminName] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [courseData, setCourseData] = useState({
    name: "",
    category: "",
    description: "",
    duration: "",
  });
  const [courses, setCourses] = useState([]);
  const [editCourseId, setEditCourseId] = useState(null);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setAdminName(name);
    fetchCourses();
    fetchStudents();
    fetchTeachers();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/api/courses`);
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/students`);
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/teachers`);
      const data = await res.json();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleInputChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      const url = editCourseId
        ? `${API_URL}/api/courses/update/${editCourseId}`
        : `${API_URL}/api/courses/add`;
      const method = editCourseId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(editCourseId ? "Course updated!" : "Course added!");
        setCourseData({ name: "", category: "", description: "", duration: "" });
        setShowAddCourse(false);
        setEditCourseId(null);
        fetchCourses();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save course");
    }
  };

  const handleEdit = (course) => {
    setCourseData(course);
    setEditCourseId(course._id);
    setShowAddCourse(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`${API_URL}/api/courses/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        alert("Course deleted!");
        fetchCourses();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0E1630] text-white">
      {/* Mobile Header */}
      <div className="flex items-center justify-between bg-[#112B66] p-4 md:hidden">
        <img src={brand} alt="brand" className="h-10 bg-white p-1 rounded-md" />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-[#112B66] p-5 flex flex-col justify-between fixed md:static top-0 left-0 h-full z-50 md:z-auto transition-all duration-300`}
      >
        <div>
          <div className="hidden md:flex justify-center mb-6 bg-white/90 p-2 rounded-lg">
            <img src={brand} alt="brand" />
          </div>
          <nav className="space-y-3">
            {[
              { key: "dashboard", icon: <FaHome />, label: "Dashboard" },
              { key: "students", icon: <FaUsers />, label: "Students" },
              { key: "courses", icon: <FaBook />, label: "Courses" },
              {
                key: "addStudyMaterial",
                icon: <FaFileUpload />,
                label: "Add Study Material",
              },
              { key: "teachers", icon: <FaChalkboardTeacher />, label: "Teachers" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveSection(item.key);
                  setShowAddCourse(false);
                  setMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
                  activeSection === item.key
                    ? "bg-gradient-to-r from-[#112B66] via-[#623BA3] to-[#F36F25] text-white"
                    : "text-gray-300 hover:bg-[#1B2C5B]"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 mt-6 text-gray-300 hover:bg-[#F36F25] hover:text-white rounded-lg transition"
        >
          <FaSignOutAlt className="mr-3" /> Logout
        </button>
      </aside>

      {/* Overlay for mobile */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-5 md:p-10 mt-16 md:mt-0">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Welcome,{" "}
          <span className="bg-gradient-to-r from-[#112B66] via-[#623BA3] to-[#F36F25] bg-clip-text text-transparent">
            {adminName || "Admin"} 👋
          </span>
        </h1>

        {/* Dashboard Section */}
        {activeSection === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#1B2C5B] p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-200">
                Total Students
              </h3>
              <p className="text-4xl font-bold text-[#F36F25]">
                {students.length}
              </p>
            </div>

            <div className="bg-[#1B2C5B] p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-200">
                Total Courses
              </h3>
              <p className="text-4xl font-bold text-[#F36F25]">
                {courses.length}
              </p>
            </div>

            <div className="bg-[#1B2C5B] p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-200">
                Active Teachers
              </h3>
              <p className="text-4xl font-bold text-[#F36F25]">
                {teachers.length}
              </p>
            </div>
          </div>
        )}

        {/* Courses Section */}
        {activeSection === "courses" && (
          <div className="bg-[#1B2C5B] p-4 md:p-6 rounded-2xl shadow-md overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-6 text-[#F36F25]">
              Manage Courses
            </h2>
            {!showAddCourse ? (
              <>
                <button
                  onClick={() => setShowAddCourse(true)}
                  className="bg-gradient-to-r from-[#112B66] via-[#623BA3] to-[#F36F25] px-5 py-2 rounded-lg mb-5 flex items-center gap-2 text-white"
                >
                  <FaPlusCircle /> Add Course
                </button>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border border-gray-700 text-left text-sm md:text-base">
                    <thead className="bg-[#112B66]">
                      <tr>
                        <th className="p-3 border-b border-gray-600">Name</th>
                        <th className="p-3 border-b border-gray-600">Category</th>
                        <th className="p-3 border-b border-gray-600">Duration</th>
                        <th className="p-3 border-b border-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.length > 0 ? (
                        courses.map((course) => (
                          <tr
                            key={course._id}
                            className="hover:bg-[#2A3C7A] transition"
                          >
                            <td className="p-3 border-b border-gray-700">
                              {course.name}
                            </td>
                            <td className="p-3 border-b border-gray-700">
                              {course.category}
                            </td>
                            <td className="p-3 border-b border-gray-700">
                              {course.duration}
                            </td>
                            <td className="p-3 border-b border-gray-700 space-x-3">
                              <button
                                onClick={() => handleEdit(course)}
                                className="text-[#FBBF24] hover:text-yellow-400"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(course._id)}
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
                            colSpan="4"
                            className="text-center py-4 text-gray-400"
                          >
                            No courses found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <form
                onSubmit={handleAddOrUpdateCourse}
                className="bg-[#0E1630] p-4 md:p-6 rounded-lg space-y-4 mt-4"
              >
                <h3 className="text-xl font-semibold mb-2 text-[#F36F25]">
                  {editCourseId ? "Edit Course" : "Add New Course"}
                </h3>

                <input
                  type="text"
                  name="name"
                  placeholder="Course Name"
                  autoComplete="off"
                  value={courseData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-[#1B2C5B] border border-gray-600"
                  required
                />

                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  autoComplete="off"
                  value={courseData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-[#1B2C5B] border border-gray-600"
                  required
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  value={courseData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-[#1B2C5B] border border-gray-600"
                  rows="3"
                />

                <input
                  type="text"
                  name="duration"
                  autoComplete="off"
                  placeholder="Duration (e.g. 3 months)"
                  value={courseData.duration}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-[#1B2C5B] border border-gray-600"
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#112B66] via-[#623BA3] to-[#F36F25] px-5 py-2 rounded-lg text-white"
                  >
                    {editCourseId ? "Update Course" : "Save Course"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddCourse(false);
                      setEditCourseId(null);
                    }}
                    className="bg-[#F36F25] hover:bg-[#d85b17] px-5 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeSection === "addStudyMaterial" && <AddStudyMaterial />}
        {activeSection === "students" && <AddStudents />}
        {activeSection === "teachers" && <AddTeachers />}
      </main>
    </div>
  );
};

export default AdminDashboard;
