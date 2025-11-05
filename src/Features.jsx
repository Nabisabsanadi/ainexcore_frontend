import React from "react";
import { BsPeopleFill, BsFillGearFill, BsLaptop, BsFillAwardFill } from "react-icons/bs";
import { MdOutlineSupportAgent, MdOutlineAccessTime, MdOutlineWorkspacePremium, MdOutlineSchool } from "react-icons/md";

const Features = () => {
  const featuresList = [
    {
      icon: <BsPeopleFill size={40} className="text-[#F05A28]" />,
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with years of practical experience.",
    },
    {
      icon: <BsLaptop size={40} className="text-[#003C8F]" />,
      title: "Practical Learning",
      description:
        "Hands-on projects and real-world applications for better understanding.",
    },
    {
      icon: <BsFillGearFill size={40} className="text-[#6C2AA6]" />,
      title: "Modern Tools",
      description:
        "Access cutting-edge software, AI tools, and modern technology.",
    },
    {
      icon: <MdOutlineSupportAgent size={40} className="text-[#00BFA6]" />,
      title: "24/7 Support",
      description:
        "Get guidance and help whenever you need it from our dedicated support team.",
    },
    {
      icon: <MdOutlineAccessTime size={40} className="text-[#FF8C00]" />,
      title: "Flexible Schedule",
      description:
        "Learn at your own pace with online and offline options to suit your lifestyle.",
    },
    {
      icon: <BsFillAwardFill size={40} className="text-[#DAA520]" />,
      title: "Certifications",
      description:
        "Receive globally recognized certificates after completing your courses.",
    },
    {
      icon: <MdOutlineWorkspacePremium size={40} className="text-[#8A2BE2]" />,
      title: "Premium Resources",
      description:
        "Access exclusive study material, e-books, and tutorials for better learning.",
    },
    {
      icon: <MdOutlineSchool size={40} className="text-[#1E90FF]" />,
      title: "Career Guidance",
      description:
        "Get mentorship and guidance to help you succeed in your career path.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 px-6">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <p className="text-[#6C2AA6] font-semibold mb-2">OUR FEATURES</p>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Why Choose AinexCore Academy?
        </h1>
        <p className="text-gray-600 mt-4">
          We provide innovative learning solutions, flexible schedules, and expert guidance to help you succeed in your career.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
        {featuresList.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col items-center text-center"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
