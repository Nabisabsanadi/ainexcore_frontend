import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, FileText, Video, Image as ImageIcon } from "lucide-react";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}/details`);
      const data = await res.json();
      setCourse(data.course);
      setMaterials(data.studyMaterials || []);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  if (!course)
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-500 text-lg">
        Loading Course Details...
      </div>
    );

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gradient-to-br from-[#f5f8ff] via-white to-[#fff3eb] rounded-2xl shadow-xl mt-8 border border-gray-100">
      {/* Back Button */}
      <button
        onClick={() => navigate("/courses")}
        className="mb-6 px-6 py-2 bg-gradient-to-r from-[#004AAD] via-[#6C2BD9] to-[#FF6600] text-white rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform"
      >
        ← Back to Courses
      </button>

      {/* Course Header */}
      <div className="flex items-center gap-4 mb-6 border-b pb-5">
        <div className="p-4 bg-gradient-to-br from-[#004AAD] to-[#6C2BD9] rounded-xl shadow-md text-white">
          <BookOpen size={40} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{course.name}</h1>
          <p className="text-gray-600 mt-1">
            Category:{" "}
            <span className="font-semibold text-[#6C2BD9]">{course.category}</span> | Duration:{" "}
            <span className="font-semibold text-[#FF6600]">{course.duration}</span>
          </p>
        </div>
      </div>

      {/* Course Description */}
      <p className="text-gray-700 leading-relaxed mb-8">{course.description}</p>

      {/* Study Materials */}
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-[#004AAD] to-[#6C2BD9] text-transparent bg-clip-text">
        <FileText className="text-[#FF6600]" /> Study Materials
      </h2>

      {materials.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {materials.map((mat) => (
            <div
              key={mat._id}
              className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-gray-800">
                <BookOpen className="text-[#004AAD]" size={20} />
                {mat.title}
              </h3>

              {/* PDF Link */}
              {mat.pdfUrl && (
                <a
                  href={mat.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#004AAD] hover:underline mt-1"
                >
                  <FileText size={18} /> View PDF
                </a>
              )}

              {/* Video Link */}
              {mat.videoLink && (
                <a
                  href={mat.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#FF0000] hover:underline mt-1"
                >
                  <Video size={18} /> Watch Video
                </a>
              )}

              {/* Image Preview */}
              {mat.imageUrl ? (
                <img
                  src={mat.imageUrl}
                  alt={mat.title}
                  className="mt-4 rounded-lg shadow-md max-h-60 w-full object-cover border border-gray-200"
                />
              ) : (
                <div className="mt-4 bg-gray-100 rounded-lg flex justify-center items-center h-48 text-gray-400">
                  <ImageIcon size={32} />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">
          No study materials available for this course.
        </p>
      )}
    </div>
  );
};

export default CourseDetails;
