import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { clearCart } from "../redux/cartSlice";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const logoutHandler = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/30 shadow-md border-b border-gray-200"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-gray-900 hover:text-primary"
        >
          Real Estate Pro
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {["Services", "Blogs", "Docs", "About Us", "Contact"].map(
            (item, index) => (
              <Link
                key={index}
                to={
                  item === "About Us"
                    ? "/about"
                    : item === "Blogs"
                    ? "/blogpage"
                    : item === "Docs"
                    ? "/docspage"
                    : `/${item.toLowerCase().replace(/\s/g, "")}`
                }
                className="text-gray-700 hover:text-primary hover:text-lg"
              >
                {item}
              </Link>
            )
          )}
        </div>

        {/* Cart & User Profile */}
        <div className="flex items-center space-x-5">
          <Link to="/cart" className="relative group">
            <ShoppingCartIcon className="w-7 h-7 text-gray-700 group-hover:scale-110 group-hover:text-primary transition-transform duration-200" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* User Profile */}
          {userInfo ? (
            <Menu as="div" className="relative">
              <Menu.Button className="group">
                <UserCircleIcon className="w-8 h-8 text-gray-700 cursor-pointer group-hover:scale-110 group-hover:text-primary transition-transform duration-200" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/my-orders"
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        My Orders
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logoutHandler}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <Link to="/auth" className="text-gray-700 hover:text-primary">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? (
            <XMarkIcon className="w-7 h-7 text-gray-700" />
          ) : (
            <Bars3Icon className="w-7 h-7 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg absolute top-16 right-0 w-full py-4 flex flex-col space-y-3"
        >
          {["Services", "Blogs", "Docs", "About Us", "Contact"].map(
            (item, index) => (
              <Link
                key={index}
                to={
                  item === "About Us"
                    ? "/about"
                    : item === "Blogs"
                    ? "/blogpage"
                    : item === "Docs"
                    ? "/docspage"
                    : `/${item.toLowerCase().replace(/\s/g, "")}`
                }
                className="text-gray-700 hover:text-primary"
              >
                {item}
              </Link>
            )
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
