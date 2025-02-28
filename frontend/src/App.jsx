import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./pages/Services";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import ContactUs from "./pages/ContactUs";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import BlogPage from "./pages/Blogpage";
import DocsPage from "./pages/DocsPage";
import Footer from "./components/Footer";
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
import { checkAdmin } from "./utils/auth";
import AdminContactMessages from "./components/Admin/AdminContactMessages";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is an admin on app load
    checkAdmin().then((res) => {
      setIsAdmin(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <CartProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar isAdmin={isAdmin} />
        <div className="pt-20 container mx-auto">
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

            {/* Admin Routes */}
            <Route element={<AdminRoutes />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="orders" element={<ManageOrders />} />
                <Route path="services" element={<ManageServices />} />
                <Route
                  path="contactMessages"
                  element={<AdminContactMessages />}
                />
              </Route>
            </Route>
          </Routes>
        </div>

        {/* Conditionally render the Footer */}
        {!isAdmin && <Footer />}
      </Router>
    </CartProvider>
  );
}
