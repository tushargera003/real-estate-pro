import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaArrowRight } from "react-icons/fa";

const Cart = () => {
  const { items: cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calculate total items and total price
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => {
    if (item.service.priceType === "perUnit") {
      return (
        acc + item.service.price * item.width * item.length * item.quantity
      );
    } else {
      return acc + item.service.price * item.quantity;
    }
  }, 0);

  const handleRemove = (serviceId, serviceName) => {
    dispatch(removeFromCart(serviceId));
    toast.success(`Removed ${serviceName} from cart`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 min-h-[50vh] flex flex-col items-center justify-center">
          <p className="text-lg">Your cart is empty.</p>
          <Link
            to="/services"
            className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg"
          >
            Browse Services
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => {
              // Calculate subtotal based on priceType
              const subtotal =
                item.service.priceType === "perUnit"
                  ? item.service.price *
                    item.width *
                    item.length *
                    item.quantity
                  : item.service.price * item.quantity;

              return (
                <div
                  key={item.service._id}
                  className="border p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between gap-6 bg-white"
                >
                  {/* Service Details */}
                  <div className="space-y-3 w-full md:w-2/3">
                    <Link
                      to={`/services/${item.service._id}`}
                      className="text-2xl font-semibold text-blue-600 hover:underline"
                    >
                      {item.service.name}
                    </Link>
                    <p className="text-gray-700">
                      <span className="font-medium">Price:</span>{" "}
                      {item.service.priceType === "perUnit"
                        ? `₹${item.service.price} per sq. ft`
                        : `₹${item.service.price.toLocaleString()}`}
                    </p>
                    {item.service.priceType === "perUnit" && (
                      <p className="text-gray-700">
                        <span className="font-medium">Dimensions:</span>{" "}
                        {item.width} ft (W) x {item.length} ft (L)
                      </p>
                    )}

                    {/* Document Preview (if available) */}
                    {item.document && (
                      <div className="mt-3">
                        <img
                          src={item.document}
                          alt="Uploaded Document"
                          className="w-full max-h-48 object-contain rounded-lg border"
                        />
                      </div>
                    )}

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-3">
                      <label className="text-gray-700 font-medium">
                        Quantity:
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        disabled
                        className="w-20 border rounded-lg text-center px-2 py-1 bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Subtotal & Remove Button */}
                  <div className="flex flex-col justify-between items-end md:w-1/3">
                    <p className="text-xl font-bold text-green-700">
                      Subtotal: ₹{subtotal.toLocaleString()}
                    </p>
                    <button
                      onClick={() =>
                        handleRemove(item.service._id, item.service.name)
                      }
                      className="mt-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                    >
                      <FaTrash className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary Section */}
          <div className="border p-6 rounded-xl shadow-lg bg-white h-fit sticky top-10">
            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">
              Order Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-700">
                <span>Total Items:</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Total Price:</span>
                <span className="font-bold text-xl text-green-700">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-6 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition-all shadow-lg"
            >
              Proceed to Checkout <FaArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
