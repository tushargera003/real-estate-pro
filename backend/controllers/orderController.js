import Order from '../models/orderModel.js';
import Service from '../models/serviceModel.js';
import dotenv from "dotenv";
import crypto from 'crypto';
import Razorpay from 'razorpay';
dotenv.config();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { customerDetails, cartItems, totalAmount, paymentMethod, paymentId } = req.body;
    const newOrder = new Order({
      user: req.user._id, // Assuming user is authenticated
      services: cartItems.map(item => ({
        service: item.service._id,  // Extracting only the ObjectId
        width: item.width || 0,
        length: item.length || 0,
        documentUrl: item.document || "",
        price: item.service.price, // Getting price from service object
      })),
      paymentMethod,
      isPaid: !!paymentId,
      paymentId: paymentId || null,
      status: "Pending",
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


// Verify Razorpay Payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, serviceId, userId, width, length, documentUrl } = req.body;

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // Fetch service price
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    // Create order after successful payment
    const newOrder = await Order.create({
      service: serviceId,
      user: userId,
      width,
      length,
      documentUrl,
      price: service.cost,
      status: 'Processing',
      paymentMethod: 'Online Payment',
      isPaid: true,
      paymentId: razorpay_payment_id,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('service user', 'name email cost');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('service', 'name cost');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("services.service", "name");
    
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error); // Debug log
    res.status(500).json({ message: "Error fetching orders", error });
  }
};



export const placeOrder = async (req, res) => {
  try {
    const { user, items, paymentMethod, paymentInfo } = req.body;

    const newOrder = new Order({
      user,
      items,
      paymentMethod,
      paymentInfo: paymentMethod === "razorpay" ? paymentInfo : null,
      status: paymentMethod === "cod" ? "Pending" : "Paid",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order Placement Error:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
};