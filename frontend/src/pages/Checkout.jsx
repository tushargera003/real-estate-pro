import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });
  const navigate = useNavigate();

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.paymentMethod !== "Cash on Delivery") {
      handleRazorpayPayment();
    } else {
      placeOrder("Cash on Delivery", null);
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      const response = await axios.post("/api/payment", {
        amount: calculateTotal(),
      });
      const { order } = response.data;

      const options = {
        key: "RAZORPAY_KEY",
        amount: order.amount,
        currency: "INR",
        name: "Real Estate Services",
        description: "Complete your payment",
        order_id: order.id,
        handler: async function (response) {
          placeOrder("Razorpay", response.razorpay_payment_id);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const placeOrder = async (paymentMethod, paymentId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        {
          customerDetails: formData,
          cartItems,
          totalAmount: calculateTotal(),
          paymentMethod,
          paymentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully!");
      dispatch(clearCart());
      navigate("/my-orders");
    } catch (error) {
      console.error("Order placement failed", error);
      toast.error("Failed to place order: " + error.response?.data?.message);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Your cart is empty.</p>
          <Link
            to="/services"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse Services
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing Information Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 border p-6 rounded-lg shadow-lg space-y-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {/* Phone Number */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {/* Address */}
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Payment Method:
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="UPI">UPI</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition duration-300"
            >
              Place Order
            </button>
          </form>

          {/* Order Summary */}
          <div className="border p-6 rounded-lg shadow-lg h-fit sticky top-10">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Order Summary
            </h3>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>
                    {item.service.name} (x{item.quantity})
                  </span>
                  <span>₹{item.totalPrice.toLocaleString()}</span>
                </div>
              ))}
              <hr className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
            <Link
              to="/cart"
              className="block mt-6 text-center text-blue-600 hover:underline"
            >
              Edit Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
