import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home";
import About from "./components/About";
import Courses from "./components/Courses";
import Contact from "./components/Contact";
import Features from "./Features";
import AdminDashboard from "./components/AdminDashboard";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import CourseDetails from "./components/CourseDetails";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); //  Start with null instead of false

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (isAuthenticated === null) {
    //  Prevents redirect flicker before state loads
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Layout with Header for public pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="courses" element={<Courses />} />
          <Route path="contact" element={<Contact />} />
          <Route path="features" element={<Features />} />
        </Route>

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            isAuthenticated ? <AdminDashboard /> : <Navigate to="/" replace />
          }
        />

        {/* Forgot & Reset Password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Course Details Page */}
        <Route path="/course/:id" element={<CourseDetails />} />

        {/* Redirect all other routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
