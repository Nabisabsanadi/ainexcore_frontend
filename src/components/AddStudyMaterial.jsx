import React, { useEffect, useState } from "react";

const AddStudyMaterial = () => {
  const [courses, setCourses] = useState([]);
  const [materialData, setMaterialData] = useState({
    course: "",
    title: "",
    pdfUrl: "",
    imageUrl: "",
    videoLink: "",
  });

  // Fetch courses from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setMaterialData({ ...materialData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!materialData.course || !materialData.title) {
      alert("Course and Title are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/study-materials/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(materialData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(" Study Material Added Successfully!");
        setMaterialData({
          course: "",
          title: "",
          pdfUrl: "",
          imageUrl: "",
          videoLink: "",
        });
      } else {
        alert(" " + data.message);
      }
    } catch (error) {
      console.error("Error adding material:", error);
      alert(" Failed to add material");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md text-white">
      <h2 className="text-2xl font-semibold mb-6">Add Study Material</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Course */}
        <div>
          <label className="block mb-2 text-gray-300">Select Course</label>
          <select
            name="course"
            value={materialData.course}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 border border-gray-700"
            required
          >
            <option value="">-- Choose a Course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block mb-2 text-gray-300">Title</label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Material Title"
            value={materialData.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 border border-gray-700"
            required
          />
        </div>

        {/* PDF URL */}
        <div>
          <label className="block mb-2 text-gray-300">PDF URL</label>
          <input
            type="text"
            name="pdfUrl"
            autoComplete="off"
            placeholder="Enter PDF Link"
            value={materialData.pdfUrl}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 border border-gray-700"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-2 text-gray-300">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            autoComplete="off"
            placeholder="Enter Image Link"
            value={materialData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 border border-gray-700"
          />
        </div>

        {/* Video Link */}
        <div>
          <label className="block mb-2 text-gray-300">Video Link</label>
          <input
            type="text"
            name="videoLink"
            autoComplete="off"
            placeholder="Enter YouTube or Video Link"
            value={materialData.videoLink}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 border border-gray-700"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-gradient-to-r from-[#112B66] via-[#623BA3] to-[#F36F25] px-5 py-2 rounded-lg mb-5 flex items-center gap-2 text-white"
        >
          Add Study Material
        </button>
      </form>
    </div>
  );
};

export default AddStudyMaterial;
