import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for responsive menu

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white w-64 p-5 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-64 sm:translate-x-0"
        } fixed sm:relative h-full z-50`}
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
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 bg-gray-100 transition-all duration-500">
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden fixed top-4 left-4 bg-gray-900 text-white p-2 rounded-full shadow-lg"
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
