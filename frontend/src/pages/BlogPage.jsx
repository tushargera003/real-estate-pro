import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogPage = () => {
  const letters = "BLOGS".split("");
  const colors = [
    "text-red-500",
    "text-blue-500",
    "text-green-500",
    "text-yellow-500",
    "text-purple-500",
  ];

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Blog Section */}
      <section className="pt-20 px-6 text-center">
        <div className="flex justify-center text-6xl font-extrabold space-x-2">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className={`${colors[index]} drop-shadow-lg`}
              initial={{ y: -10 }}
              animate={{
                y: [10, -10, 0],
                color: ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <motion.p
          className="text-lg mt-3 italic text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          "Explore the latest insights and updates in the real estate world"
        </motion.p>
      </section>

      <div className="container mx-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog 1 */}
          <motion.div
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="https://th.bing.com/th/id/OIP.HuqlRQlpEcF4JSXV_9dgowHaEJ?w=289&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Property Document Verification"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Property Document Verification
              </h3>
              <p className="text-gray-600 mt-2">
                Importance of Property Document Verification Before Purchasing
                the Property...
              </p>
              <Link
                to="/blog/property-document-verification"
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Read More
              </Link>
            </div>
          </motion.div>

          {/* Blog 2 */}
          <motion.div
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <img
              src="https://th.bing.com/th/id/OIP.ZaQSMO7F-LSpp-rCbxfMhQHaEQ?w=276&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Property Valuation Advisory"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Property Valuation Advisory
              </h3>
              <p className="text-gray-600 mt-2">
                How Can Property Valuation Help You Buy or Sell the Property?
              </p>
              <Link
                to="/blog/property-valuation-advisory"
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Read More
              </Link>
            </div>
          </motion.div>

          {/* Blog 3 */}
          <motion.div
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <img
              src="https://cdn.pixabay.com/photo/2020/03/29/02/13/pen-4979032_1280.jpg"
              alt="Property Laws in Delhi"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Property Laws in Delhi
              </h3>
              <p className="text-gray-600 mt-2">
                How Can Property Valuation Help You Buy or Sell the Property?
              </p>
              <Link
                to="/blog/property-laws-delhi"
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Read More
              </Link>
            </div>
          </motion.div>

          {/* Blog 4 */}
          <motion.div
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <img
              src="https://th.bing.com/th/id/OIP.OYi0hBFDMZszGayHBXc33QHaDZ?w=307&h=160&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Land Use Change"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Land Use Change
              </h3>
              <p className="text-gray-600 mt-2">
                How Does Land Use Change Impact Urban Development?
              </p>
              <Link
                to="/blog/land-use-change"
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Read More
              </Link>
            </div>
          </motion.div>

          {/* Blog 5 */}
          <motion.div
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <img
              src="https://th.bing.com/th/id/OIP.49NQz7eD3AYDnqC4c03CqQHaFj?w=210&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Property Lawyers in Delhi"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Property Lawyers in Delhi
              </h3>
              <p className="text-gray-600 mt-2">
                Choosing One of the Best Lawyers for Property Cases in Delhi
              </p>
              <Link
                to="/blog/property-lawyers-delhi"
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Read More
              </Link>
            </div>
          </motion.div>

          {/* Blog 6 */}
          <motion.div
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <img
              src="https://th.bing.com/th/id/OIP.49NQz7eD3AYDnqC4c03CqQHaFj?w=210&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Due Diligence Services in Delhi"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Due Diligence Services in Delhi
              </h3>
              <p className="text-gray-600 mt-2">
                Delhi's Leading Due Diligence Specialist – Verify Your Property
                Before Purchase
              </p>
              <Link
                to="/blog/due-diligence-services-delhi"
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Read More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
