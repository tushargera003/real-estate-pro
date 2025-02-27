import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { items: cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.service.price * item.quantity,
    0
  );

  const handleRemove = (serviceId, serviceName) => {
    dispatch(removeFromCart(serviceId));
    toast.success(`Removed ${serviceName} from cart`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 min-h-[50vh] flex flex-col items-center justify-center">
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
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.service._id}
                className="border p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between gap-4"
              >
                <div className="space-y-2 w-full md:w-2/3">
                  <Link
                    to={`/services/${item.service._id}`}
                    className="text-2xl font-semibold text-blue-600 hover:underline"
                  >
                    {item.service.name}
                  </Link>
                  <p className="text-gray-600">
                    Price:{" "}
                    <span className="font-semibold">
                      ₹{item.service.price.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Width: <span className="font-medium">{item.width} ft</span>{" "}
                    | Length:{" "}
                    <span className="font-medium">{item.length} ft</span>
                  </p>

                  {/* Document Preview (if available) */}
                  {item.document && (
                    <img
                      src={item.document}
                      alt="Uploaded Document"
                      className="w-full max-h-48 object-contain rounded-lg border"
                    />
                  )}

                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-gray-700">Quantity:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      disabled
                      className="w-20 border rounded-lg text-center px-2 py-1 bg-gray-200 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Subtotal & Remove Button */}
                <div className="flex flex-col justify-between items-end md:w-1/3">
                  <p className="text-xl font-bold text-green-600">
                    Subtotal: ₹
                    {(item.service.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() =>
                      handleRemove(item.service._id, item.service.name)
                    }
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="border p-6 rounded-lg shadow-lg h-fit sticky top-10">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Total Price:</span>
                <span className="font-bold text-lg text-green-700">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block mt-6 bg-green-600 text-white py-3 rounded-lg text-center text-lg hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
