import { useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === `/admin/${path.toLowerCase()}`;

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/70 backdrop-blur-lg p-4 text-white shadow-lg fixed w-full top-0 z-50 border-b border-gray-700/50"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo / Brand Name */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2"
        >
          <h1 className="text-xl font-extrabold tracking-wide text-purple-400">
            🚀 Admin Panel
          </h1>
        </motion.div>

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
                className={`relative text-lg font-semibold ${
                  isActive(item)
                    ? "text-purple-400"
                    : "text-gray-300 hover:text-purple-400"
                } transition duration-300 group`}
              >
                {item}
                {isActive(item) && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-400 transition-all duration-300"></span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden focus:outline-none text-gray-300 hover:text-purple-400 transition duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col mt-3 space-y-3 bg-gray-800/70 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700/50"
          >
            {["Users", "Orders", "Services"].map((item, index) => (
              <Link
                key={index}
                to={`/admin/${item.toLowerCase()}`}
                className={`text-lg font-medium text-center py-2 rounded-lg ${
                  isActive(item)
                    ? "bg-gray-700/50 text-purple-400"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-purple-400"
                } transition duration-300`}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default AdminNavbar;
