import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkAdmin, checkUserAuth } from "./utils/auth";
import LoadingSpinner from "./components/LoadingSpinner"; // Add a loading spinner component

// Lazy load components
const Home = React.lazy(() => import("./pages/Home"));
const Services = React.lazy(() => import("./pages/Services"));
const About = React.lazy(() => import("./pages/About"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const Cart = React.lazy(() => import("./pages/Cart"));
const BlogPage = React.lazy(() => import("./pages/BlogPage"));
const DocsPage = React.lazy(() => import("./pages/DocsPage"));
const Auth = React.lazy(() => import("./pages/Auth"));
const MyOrders = React.lazy(() => import("./pages/MyOrders"));
const OrderDetails = React.lazy(() => import("./pages/OrderDetails"));
const ServiceDetails = React.lazy(() => import("./pages/ServiceDetails"));
const AdminDashboard = React.lazy(() =>
  import("./components/Admin/AdminDashboard")
);
const ManageUsers = React.lazy(() => import("./components/Admin/ManageUsers"));
const ManageOrders = React.lazy(() =>
  import("./components/Admin/ManageOrders")
);
const ManageServices = React.lazy(() =>
  import("./components/Admin/ManageServices")
);
const AdminLayout = React.lazy(() => import("./components/Admin/AdminLayout"));
const AdminRoutes = React.lazy(() => import("./routes/AdminRoutes"));
const AdminContactMessages = React.lazy(() =>
  import("./components/Admin/AdminContactMessages")
);
const NewsletterSubscribers = React.lazy(() =>
  import("./components/Admin/NewsletterSubscribers")
);
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

const AppContent = ({ isAdmin }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Conditionally render Navbar */}
      {!isAdminRoute && <Navbar isAdmin={isAdmin} />}

      <div
        className={
          !isAdminRoute ? "pt-20 container max-w-full" : "container max-w-full"
        }
      >
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
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

  if (loading) return <LoadingSpinner />;

  return (
    <CartProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppContent isAdmin={isAdmin} />
    </CartProvider>
  );
}
