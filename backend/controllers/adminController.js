import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Service from "../models/serviceModel.js";
import contact from "../models/contact.js";
// ✅ 1. Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Password hide karenge
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ 2. Delete User
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting User" });
  }
};

// ✅ 3. Get All Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email phone") // ✅ Populate user details
      .populate({
        path: "services.service", // ✅ Populate services.service
        select: "name", // ✅ Select only the name field
      })
      .sort({ createdAt: -1 }); // ✅ Sort by createdAt in descending order

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ 4. Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      await order.save();
      res.json({ message: "Order Status Updated" });
    } else {
      res.status(404).json({ message: "Order Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ 5. Get All Services (With Pagination)
export const getServices = async (req, res) => {
    try {
      let { page, limit } = req.query;
  
      // Convert page and limit to numbers, set default values
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
  
      const totalServices = await Service.countDocuments(); // Total service count
      const services = await Service.find()
        .skip((page - 1) * limit) // Skip previous records
        .limit(limit); // Limit the records
  
      res.json({
        totalPages: Math.ceil(totalServices / limit),
        currentPage: page,
        totalServices,
        services,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
  

// ✅ 6. Add New Service
export const addService = async (req, res) => {
  try {
    const { name, description, price, document, images, priceType, requiresDimensions, requiresDocument } = req.body;
    console.log("requiresDimensions",requiresDimensions);
    console.log("requiresDocument",requiresDocument);
    const service = new Service({ 
      name, 
      description, 
      price, 
      document, 
      images,
      priceType,
      requiresDimensions,
      requiresDocument
    });

    const createdService = await service.save();
    res.status(201).json(createdService);

  } catch (error) {
    res.status(400).json({ message: 'Invalid service data' });
  }
};

// ✅ 7. Delete Service
export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Service" });
  }
};
export const analytics = async (req, res) => {
  try {
    const orders = await Order.find().populate("services.service"); // Populate service details

    // Total Revenue Calculation
    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;

    // Order Status Count
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    // Monthly Orders
    const monthlyOrders = {};
    orders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleString("default", {
        month: "short",
      });
      monthlyOrders[month] = (monthlyOrders[month] || 0) + 1;
    });

    // Orders of This Month
    const currentMonth = new Date().toLocaleString("default", { month: "short" });
    const ordersThisMonth = orders.filter((order) => {
      const orderMonth = new Date(order.createdAt).toLocaleString("default", {
        month: "short",
      });
      return orderMonth === currentMonth;
    }).length;

    // Total Number of Orders by Date
    const ordersByDate = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Pending Orders Percentage
    const pendingOrders = statusCounts["Pending"] || 0;
    const pendingOrdersPercentage = ((pendingOrders / totalOrders) * 100).toFixed(2);

    // Most Ordered Service
    const mostOrderedServices = orders.reduce((acc, order) => {
      order.services.forEach((service) => {
        const serviceName = service.service?.name || "Unknown Service"; // Handle undefined service
        acc[serviceName] = (acc[serviceName] || 0) + 1;
      });
      return acc;
    }, {});

    // Payment Methods
    const paymentMethods = orders.reduce((acc, order) => {
      acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1;
      return acc;
    }, {});

    res.json({
      revenue,
      totalOrders,
      statusCounts,
      monthlyOrders,
      ordersThisMonth,
      ordersByDate,
      pendingOrdersPercentage,
      mostOrderedServices,
      paymentMethods,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
  

  export const toggleAdmin = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.isAdmin = !user.isAdmin;
      await user.save();
  
      res.json({ message: "User admin status updated", isAdmin: user.isAdmin });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };


 export const toggleActiveService = async (req, res) => {
    try {
      const { active } = req.body;
      const service = await Service.findByIdAndUpdate(
        req.params.id,
        { active },
        { new: true }
      );
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (err) {
      console.error("Error toggling active status:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const getAllContactMessages = async (req, res) => {
    try {
      const messages = await contact.find().sort({ createdAt: -1 });
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };



  //update service 
  export const updateService = async (req, res) => {
    try {
      const { name, description, price, document, images, priceType, requiresDimensions, requiresDocument } = req.body;
      const service = await Service.findById(req.params.id);
  
      if (service) {
        service.name = name;
        service.description = description;
        service.price = price;
        service.document = document;
        service.images = images;
        service.priceType = priceType;
        service.requiresDimensions = requiresDimensions;
        service.requiresDocument = requiresDocument;
  
        const updatedService = await service.save();
        res.json(updatedService);
      } else {
        res.status(404).json({ message: 'Service not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Invalid service data' });
    }
  };