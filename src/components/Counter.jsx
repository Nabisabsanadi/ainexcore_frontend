import React from 'react';
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlineMenuBook } from "react-icons/md";
import { GiMedallist } from "react-icons/gi";

const Counter = () => {
    const stats = [
        { icon: <BsPeopleFill size={40} className="text-[#F05A28]" />, value: "10K+", label: "Students" },
        { icon: <MdOutlineMenuBook size={40} className="text-[#003C8F]" />, value: "50+", label: "Courses" },
        { icon: <GiMedallist size={40} className="text-[#6C2AA6]" />, value: "100+", label: "Awards" },
    ];

    return (
        <section className="py-8 bg-gray-50">
            {/* Title Section */}
            <div className="text-center mb-12">
                <p className="text-[#6C2AA6] font-semibold text-lg mb-2">Innovative Teaching Methods</p>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
                    Inspiring Excellence in Every Student
                </h1>
            </div>

            {/* Counter Cards */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center w-[200px] p-6 rounded-2xl 
                                   bg-gradient-to-br from-white to-gray-100
                                   transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                    >
                        <div className="mb-4">{stat.icon}</div>
                        <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                        <div className="text-gray-600">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Counter;
