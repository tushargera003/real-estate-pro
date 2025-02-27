import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message.");
    }
  };

  return (
    <section className="container mx-auto px-6 py-16">
      {/* Contact Us Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
          Contact Us
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have any questions or concerns? Reach out to us and we'll get back to
          you as soon as possible.
        </p>
      </motion.div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { title: "Phone", icon: <Phone />, content: "+91 7065600010" },
          { title: "Email", icon: <Mail />, content: "100SOLUTIONS.com" },
          { title: "Location", icon: <MapPin />, content: "Delhi" },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out flex flex-col items-center"
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
            <p className="text-lg">{item.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Send a Message
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="w-full p-3 mt-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows="5"
          required
          className="w-full p-3 mt-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full mt-6 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
        >
          Send Message
        </motion.button>
      </motion.form>
    </section>
  );
};

export default ContactUs;
