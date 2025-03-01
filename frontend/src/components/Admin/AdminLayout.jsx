import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react"; // Icons for UI

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo"); // Remove token from storage
    navigate("/auth"); // Redirect to login
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 p-5 transition-all duration-300 fixed h-full z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-64 sm:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-wide">Admin Panel</h2>
          <button
            className="sm:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <ul>
            {[
              { name: "Dashboard", path: "/admin" },
              { name: "Manage Users", path: "/admin/users" },
              { name: "Manage Orders", path: "/admin/orders" },
              { name: "Manage Services", path: "/admin/services" },
              { name: "Manage Contact Us", path: "/admin/ContactMessages" },
            ].map((item, index) => (
              <li key={index} className="mb-2">
                <Link
                  to={item.path}
                  className="block p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsOpen(false)} // Close sidebar on link click (mobile)
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Back to Website */}
            <li className="mt-6">
              <Link
                to="/"
                className="block p-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 text-center"
                onClick={() => setIsOpen(false)} // Close sidebar on link click (mobile)
              >
                Back to Website
              </Link>
            </li>

            {/* Logout Button */}
            <li className="mt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-red-600 hover:bg-red-500 transition-all duration-300 transform hover:scale-105"
              >
                <LogOut size={18} /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-0 sm:ml-64 p-5 overflow-y-auto min-h-screen">
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden fixed top-4 left-4 bg-gray-900 text-white p-2 rounded-full shadow-lg z-50"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>

        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
