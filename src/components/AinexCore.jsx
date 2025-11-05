import React from 'react';
import { BsFillCheckCircleFill } from "react-icons/bs";

const AinexCore = () => {
    const features = [
        "Expert Instructors: Learn from industry professionals with years of experience.",
        "Practical Learning: Hands-on projects and real-world applications for better understanding.",
        "Flexible Schedule: Learn at your own pace with online and offline options.",
        "Modern Tools: Access to cutting-edge software and AI tools for skill enhancement.",
    ];

    return (
        <section className="py-10 bg-gray-50">
            {/* Header */}
            <div className="text-center mb-8 px-4">
                <p className="text-[#6C2AA6] font-semibold text-lg mb-2">SMART LEARNING SOLUTIONS</p>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800">Why Choose Us?</h1>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    At AinexCore Academy, we provide a perfect blend of theory, practical skills, and modern technology to empower your career growth.
                </p>
            </div>

            {/* Feature Listing */}
            <ul className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <BsFillCheckCircleFill className="text-[#F05A28] mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default AinexCore;
