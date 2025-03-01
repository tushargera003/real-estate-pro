import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";
import BlogPage from "./pages/BlogPage";
import DocsPage from "./pages/DocsPage";
import Auth from "./pages/Auth";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import ServiceDetails from "./pages/ServiceDetails";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageUsers from "./components/Admin/ManageUsers";
import ManageOrders from "./components/Admin/ManageOrders";
import ManageServices from "./components/Admin/ManageServices";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminRoutes from "./routes/AdminRoutes";
import { checkAdmin, checkUserAuth } from "./utils/auth"; // Import your auth functions
import AdminContactMessages from "./components/Admin/AdminContactMessages";
import NewsletterSubscribers from "./components/Admin/NewsletterSubscribers";
import NotFoundPage from "./pages/NotFoundPage";

const AppContent = ({ isAdmin }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Conditionally render Navbar */}
      {!isAdminRoute && <Navbar isAdmin={isAdmin} />}

      <div
        className={
          !isAdminRoute ? "pt-20 container mx-auto" : "container mx-auto"
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/blogpage" element={<BlogPage />} />
          <Route path="/docspage" element={<DocsPage />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* Admin Routes */}

          <Route element={<AdminRoutes />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="orders" element={<ManageOrders />} />
              <Route path="services" element={<ManageServices />} />
              <Route path="newsletters" element={<NewsletterSubscribers />} />
              <Route
                path="contactMessages"
                element={<AdminContactMessages />}
              />
            </Route>
          </Route>
        </Routes>
      </div>

      {/* Conditionally render Footer */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated and an admin on app load
    const verifyUser = async () => {
      const isUserAuthenticated = await checkUserAuth();
      setIsAuthenticated(isUserAuthenticated);

      if (isUserAuthenticated) {
        const isUserAdmin = await checkAdmin();
        setIsAdmin(isUserAdmin);
      }

      setLoading(false);
    };

    verifyUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <CartProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppContent isAdmin={isAdmin} />
    </CartProvider>
  );
}
