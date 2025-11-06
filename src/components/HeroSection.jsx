import React, { useState } from "react";
import heroImg from "../images/herobg.webp";

const HeroSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* Hero Section */}
            <section
                className="relative h-[85vh] flex items-center justify-center text-center text-white"
                style={{
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                {/* Black overlay with slight transparency */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Content */}
                <div className="relative z-10 max-w-2xl px-6">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        Transform Your{" "}
                        <span className="text-[#F05A28]">
                            Future Today
                        </span>
                    </h1>

                    <p className="mt-6 text-lg md:text-xl text-gray-200">
                        Join{" "}
                        <span className="text-[#F05A28] font-semibold">
                            AinexCoreAcademy
                        </span>{" "}
                        and unlock your potential with world-class education, expert
                        instructors, and cutting-edge learning technology.
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-8 bg-gradient-to-r cursor-pointer from-[#003C8F] via-[#6C2AA6] to-[#F05A28] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition"
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-lg w-full sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 p-6 relative max-h-[90vh] overflow-y-auto">
                        {/* Close button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-semibold text-center mb-4 text-[#003C8F]">
                            Get Started
                        </h2>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="John Doe"
                                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6C2AA6]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                                <input
                                    type="email"
                                    autoComplete="off"
                                    placeholder="john@example.com"
                                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6C2AA6]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    autoComplete="off"
                                    placeholder="+91 98765 43210"
                                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6C2AA6]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Course Interested In *</label>
                                <select
                                    required
                                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6C2AA6]"
                                >
                                    <option value="">Select a course</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Graphic Design">Graphic Design</option>
                                    <option value="AI Tools">AI Tools</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    placeholder="Tell us about your learning goals..."
                                    rows="3"
                                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6C2AA6]"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#003C8F] via-[#6C2AA6] to-[#F05A28] text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </>
    );
};

export default HeroSection;
