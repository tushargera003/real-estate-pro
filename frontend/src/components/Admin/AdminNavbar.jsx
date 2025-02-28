import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-4 text-white shadow-lg fixed w-full top-0 z-50"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo / Brand Name */}
        <h1 className="text-xl font-extrabold tracking-wide">🚀 Admin Panel</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {["Users", "Orders", "Services"].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                to={`/admin/${item.toLowerCase()}`}
                className="relative text-lg font-semibold hover:text-yellow-400 transition duration-300"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden flex flex-col mt-3 space-y-3 bg-gray-800 p-4 rounded-lg shadow-lg"
        >
          {["Users", "Orders", "Services"].map((item, index) => (
            <Link
              key={index}
              to={`/admin/${item.toLowerCase()}`}
              className="text-lg font-medium text-center py-2 rounded-lg hover:bg-gray-700 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default AdminNavbar;
