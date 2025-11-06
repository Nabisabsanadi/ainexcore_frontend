import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import brand from "../images/brand.png";
const API_URL = "https://ainexcore-backend.onrender.com"; // Live backend URL
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
  ];

  // Check user on load
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");
    if (storedName && token) {
      setUserName(storedName);
    }
  }, []);

  // Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // LOGIN / REGISTER handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isRegister
        ? `${API_URL}/api/auth/register`
        : `${API_URL}/api/auth/login`;

      const payload = isRegister
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      const { data } = await axios.post(url, payload);

      if (!isRegister) {
        // Login success
        const user = data?.user || {};
        localStorage.setItem("token", data?.token || "");
        localStorage.setItem("userName", user?.name || "User");
        localStorage.setItem("userEmail", user?.email || "");

        setUserName(user?.name || "User");
        alert("Login Successful!");

        // Notify App.jsx that token is updated
        window.dispatchEvent(new Event("storage"));

        // Close modal & redirect
        setShowLogin(false);
        setMenuOpen(false);

        // Redirect to Admin Dashboard
        navigate("/admin");
      } else {
        alert("Registration Successful! Please login now.");
        setIsRegister(false);
      }

      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Auth Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  // Forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const { email } = formData;
      if (!email) return alert("Please enter your registered email.");

      const { data } = await axios.post(
        `${API_URL}/api/auth/forgot-password`,
        { email }
      );

      alert(data?.message || "Reset link sent to your email!");
      setIsForgot(false);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error(" Forgot Password Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Unable to send reset link.");
    }
  };

  //  Logout
  const handleLogout = () => {
    localStorage.clear();
    setUserName("");
    navigate("/");
    window.dispatchEvent(new Event("storage")); // 🔥 trigger state update
  };

  return (
    <>
      {/* ===== Header ===== */}
      <header className="shadow-sm shadow-gray-300 py-2 bg-white sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-6xl mx-auto px-6">
          {/* Logo */}
          <Link to="/">
            <img src={brand} alt="Ainex Core Academy" className="w-40 object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex gap-10 font-medium">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-[#003C8F] hover:text-[#F05A28] transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {userName ? (
              <>
                <span className="text-gray-700 font-medium">
                  Hi, {userName?.split(" ")[0] || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-[#6C2AA6] hover:text-[#F05A28] font-medium transition"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#003C8F] text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-inner py-4 px-6 space-y-4 font-medium">
            <ul className="flex flex-col gap-4 text-[#003C8F]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="block hover:text-[#F05A28] transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 mt-4">
              {userName ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-red-600 font-medium hover:text-red-700"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setMenuOpen(false);
                  }}
                   className="w-full bg-gradient-to-r from-[#003C8F] via-[#6C2AA6] to-[#F05A28] text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ===== Modal (Login/Register/Forgot) ===== */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-[1000] animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
            <button
              onClick={() => {
                setShowLogin(false);
                setIsForgot(false);
                setIsRegister(false);
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            {!isForgot ? (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  {isRegister ? "Register" : "Admin Login"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {isRegister && (
                    <div>
                      <label className="block text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required autoComplete="off" 
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required autoComplete="off"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    {isRegister ? "Register" : "Login"}
                  </button>

                  {!isRegister && (
                    <p
                      onClick={() => setIsForgot(true)}
                      className="text-blue-600 text-center mt-3 cursor-pointer hover:underline text-sm"
                    >
                      Forgot Password?
                    </p>
                  )}

                  <p className="text-center text-gray-600 text-sm mt-3">
                    {isRegister ? (
                      <>
                        Already have an account?{" "}
                        <span
                          onClick={() => setIsRegister(false)}
                          className="text-blue-600 cursor-pointer hover:underline"
                        >
                          Login
                        </span>
                      </>
                    ) : (
                      <>
                        Don’t have an account?{" "}
                        <span
                          onClick={() => setIsRegister(true)}
                          className="text-blue-600 cursor-pointer hover:underline"
                        >
                          Register
                        </span>
                      </>
                    )}
                  </p>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                  Forgot Password
                </h2>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Registered Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your registered email"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Send Reset Link
                  </button>

                  <p
                    onClick={() => setIsForgot(false)}
                    className="text-blue-600 text-center mt-3 cursor-pointer hover:underline text-sm"
                  >
                    Back to Login
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
