import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <section className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* Services Overview */}
      <section className="container py-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-blue-700 mb-12"
        >
          Our Top Services
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              title: "Site Measurement",
              color: "bg-gradient-to-r from-blue-500 to-indigo-500",
            },
            {
              title: "Legal Title Search of Property",
              color: "bg-gradient-to-r from-green-500 to-teal-500",
            },
            {
              title: "Building Sanction",
              color: "bg-gradient-to-r from-purple-500 to-pink-500",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`p-6 rounded-xl shadow-lg text-white text-center ${service.color} hover:scale-105 transition-transform duration-300`}
            >
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-white/80">
                Reliable {service.title.toLowerCase()} services with expert
                guidance.
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/services"
              className="py-3 px-8 rounded-lg bg-blue-600 text-white text-lg font-medium hover:bg-blue-500 transition-all duration-300 shadow-lg"
            >
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default Home;
