import { createSlice } from "@reduxjs/toolkit";

// Helper function to load cart from local storage
const loadCartFromLocalStorage = () => {
  try {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error loading cart from local storage:", error);
    return [];
  }
};

// Helper function to save cart to local storage
const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to local storage:", error);
  }
};

const initialState = {
  items: loadCartFromLocalStorage(), // Load cart from local storage on initialization
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { service, quantity, width, length, document } = action.payload;

      // Calculate total price based on priceType
      let totalPrice = service.price;
      if (service.priceType === "perUnit" && service.requiresDimensions) {
        totalPrice = service.price * width * length;
      }

      const existingItem = state.items.find(
        (item) =>
          item.service.id === service.id &&
          item.width === width &&
          item.length === length &&
          item.document === document
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = totalPrice * existingItem.quantity; // Update total price
      } else {
        state.items.push({
          service,
          quantity,
          width,
          length,
          document,
          totalPrice: totalPrice * quantity, // Store total price for the item
        });
      }

      saveCartToLocalStorage(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.service._id !== action.payload
      );
      saveCartToLocalStorage(state.items); // Save cart to local storage
    },

    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items); // Save cart to local storage
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;