import React from "react";
import ManageCourses from "./ManageCourses.jsx";
import { 
  FaLaptopCode, FaPaintBrush, FaRobot, FaDatabase, FaPython, 
  FaJava, FaDesktop, FaCalculator 
} from "react-icons/fa";
import { SiCplusplus, SiHtml5 } from "react-icons/si";

const Courses = () => {
  const courseList = [
    { icon: <FaRobot size={30} className="text-[#F05A28]" />, title: "Latest AI Tools" },
    { icon: <FaDesktop size={30} className="text-[#003C8F]" />, title: "Basic Computer" },
    { icon: <FaCalculator size={30} className="text-[#6C2AA6]" />, title: "Tally Prime" },
    { icon: <FaPaintBrush size={30} className="text-[#00BFA6]" />, title: "Graphic Design" },
    { icon: <SiCplusplus size={30} className="text-[#F0A500]" />, title: "C / C++" },
    { icon: <FaPython size={30} className="text-[#306998]" />, title: "Python" },
    { icon: <FaJava size={30} className="text-[#5382A1]" />, title: "Java" },
    { icon: <SiHtml5 size={30} className="text-[#E34F26]" />, title: "Web Design" },
    { icon: <FaLaptopCode size={30} className="text-[#003C8F]" />, title: "Web Development" },
    { icon: <FaDatabase size={30} className="text-[#6C2AA6]" />, title: "50+ Courses We Offer" },
  ];

  return (
    <section className="py-16 bg-gray-50 text-center px-6">
      {/* Header */}
      <p className="text-[#6C2AA6] font-semibold mb-2">OUR COURSES</p>
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
        Learn Skills that Matter
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Explore our wide range of courses from programming to AI, design, and more. Start your learning journey today!
      </p>

      {/* Course Cards */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-6xl mx-auto">
        {courseList.map((course, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col items-center"
          >
            <div className="mb-4">{course.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
          </div>
        ))}
      </div>
      <ManageCourses />
    </section>
  );
};

export default Courses;
