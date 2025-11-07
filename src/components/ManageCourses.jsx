import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa"; // 🎓 Course Icon

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const API_URL = "https://ainexcore-backend.onrender.com"; // Live backend URL

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/api/courses/show`);
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-br from-[#f5f8ff] via-white to-[#fff3eb]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#004AAD] via-[#6C2BD9] to-[#FF6600] text-transparent bg-clip-text flex items-center gap-2 text-center md:text-left">
          <FaBookOpen className="text-[#FF6600]" /> Latest Courses
        </h2>

        <input
          type="text"
          autoComplete="off"
          placeholder="Search course by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#004AAD] shadow-sm text-sm sm:text-base"
        />
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-md rounded-2xl p-5 sm:p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-[#FF6600] cursor-pointer"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              <div className="flex items-center gap-3 mb-3">
                <FaBookOpen className="text-[#004AAD] text-xl sm:text-2xl" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {course.name}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium text-[#6C2BD9]">Category:</span>{" "}
                {course.category}
              </p>
              <p className="text-gray-500 text-sm line-clamp-2">
                {course.description}
              </p>
              <p className="text-sm font-medium text-[#FF6600] mt-3">
                Duration: {course.duration}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full mt-10">
            No courses found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageCourses;
