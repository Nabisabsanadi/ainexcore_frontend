import React from 'react';

const Copyright = () => {
    const year = new Date().getFullYear(); // Automatically gets current year

    return (
        <footer className="bg-gray-800 text-gray-300 py-4">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <p className="text-sm">
                    &copy; {year} AinexCore Academy. All rights reserved.
                </p>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <a href="#" className="hover:text-white transition">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Copyright;
