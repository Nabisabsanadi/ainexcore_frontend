import React, { useState } from "react";
// import Login from "./Login";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="py-16 bg-gray-50 px-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-[#6C2AA6] font-semibold mb-2">GET IN TOUCH</p>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Contact Us
        </h1>
        <p className="text-gray-600 mt-4">
          Have questions or want to know more? Fill out the form below and we’ll get back to you.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow max-w-3xl mx-auto space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6C2AA6]"
              required autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6C2AA6]"
              required autoComplete="off"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6C2AA6]"
            autoComplete="off"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message here..."
            rows="4"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6C2AA6]"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#003C8F] via-[#6C2AA6] to-[#F05A28] text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
        >
          Send Message
        </button>
      </form>
      {/* <Login/> */}
    </section>
  );
};

export default Contact;
