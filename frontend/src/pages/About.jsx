import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "TUSHAR GERA",
    role: "Founder & CEO",
    image:
      "https://th.bing.com/th/id/OIP.GqGVPkLpUlSo5SmeDogUdwHaHa?w=191&h=191&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  {
    name: "TUSHAR GERA",
    role: "FULL STACK DEVELOPER",
    image:
      "https://th.bing.com/th/id/OIP.GqGVPkLpUlSo5SmeDogUdwHaHa?w=191&h=191&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  {
    name: "TUSHAR GERA",
    role: "PROJECT MANAGER",
    image:
      "https://th.bing.com/th/id/OIP.GqGVPkLpUlSo5SmeDogUdwHaHa?w=191&h=191&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
];

const About = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      {/* About Us Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">About Us</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We are committed to providing top-notch real estate services with
          transparency and trust. Our mission is to make property-related
          processes seamless for our clients.
        </p>
      </motion.div>

      {/* Vision & Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          {
            title: "Our Mission",
            content:
              "To deliver reliable and efficient real estate services ensuring customer satisfaction.",
          },
          {
            title: "Our Vision",
            content:
              "To be the leading real estate service provider, known for innovation and integrity.",
          },
          {
            title: "Why Choose Us?",
            content:
              "Experienced team, secure processes, and customer-first approach to every service.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
          >
            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
            <p className="text-lg">{item.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Meet Our Team
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map(({ name, role, image }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-xl text-center transform transition duration-300 ease-in-out"
            >
              <img
                src={image}
                alt={name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500 object-cover"
              />
              <h4 className="text-2xl font-bold text-gray-900">{name}</h4>
              <p className="text-lg text-gray-500">{role}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
