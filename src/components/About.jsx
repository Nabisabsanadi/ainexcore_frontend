import React from "react";
import brand from "../images/about.jpg";

const About = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left side - Image */}
        <div className="relative group order-1 md:order-none">
          <img
            src={brand}
            alt="About AinexCore Academy"
            className="rounded-2xl shadow-lg w-full object-cover transition-transform duration-500 transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#003C8F]/30 to-[#F05A28]/30 rounded-2xl"></div>
        </div>

        {/* Right side - Content */}
        <div className="text-center md:text-left">
          <p className="text-[#6C2AA6] font-semibold text-base sm:text-lg mb-2">
            ABOUT AINEXCORE ACADEMY
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            Empowering Learners to Build a Smarter Future
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
            At{" "}
            <span className="text-[#F05A28] font-semibold">
              AinexCore Academy
            </span>
            , we believe education should be practical, innovative, and
            technology-driven. Our mission is to bridge the gap between
            traditional learning and modern industry needs through hands-on
            training and expert guidance.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start justify-center md:justify-start gap-2">
              <span className="text-[#F05A28] text-lg sm:text-xl">✔</span>
              <p className="text-gray-700 text-sm sm:text-base">
                Learn from certified instructors with real-world expertise.
              </p>
            </li>
            <li className="flex items-start justify-center md:justify-start gap-2">
              <span className="text-[#6C2AA6] text-lg sm:text-xl">✔</span>
              <p className="text-gray-700 text-sm sm:text-base">
                Modern classrooms and AI-based tools for advanced learning.
              </p>
            </li>
            <li className="flex items-start justify-center md:justify-start gap-2">
              <span className="text-[#003C8F] text-lg sm:text-xl">✔</span>
              <p className="text-gray-700 text-sm sm:text-base">
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
