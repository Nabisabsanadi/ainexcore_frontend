import React from "react";
import brand from "../images/about.jpg";

const About = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
        {/* Left side - Image */}
        <div className="relative group">
          <img
            src={brand}
            alt="About AinexCore Academy"
            className="rounded-2xl shadow-lg transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#003C8F]/30 to-[#F05A28]/30 rounded-2xl"></div>
        </div>

        {/* Right side - Content */}
        <div>
          <p className="text-[#6C2AA6] font-semibold text-lg mb-2">
            ABOUT AINEXCORE ACADEMY
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Empowering Learners to Build a Smarter Future
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            At <span className="text-[#F05A28] font-semibold">AinexCore Academy</span>,
            we believe education should be practical, innovative, and
            technology-driven. Our mission is to bridge the gap between
            traditional learning and modern industry needs through hands-on
            training and expert guidance.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-[#F05A28] text-xl">✔</span>
              <p className="text-gray-700">
                Learn from certified instructors with real-world expertise.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6C2AA6] text-xl">✔</span>
              <p className="text-gray-700">
                Modern classrooms and AI-based tools for advanced learning.
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#003C8F] text-xl">✔</span>
              <p className="text-gray-700">
                100% practical approach — learn by doing, not memorizing.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
