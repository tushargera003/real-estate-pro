import { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/analytics`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };
    fetchAnalytics();
  }, []);

  if (!analytics) return <p>Loading...</p>;

  // Default values to prevent errors
  const totalRevenue = analytics.revenue || 0;
  const totalOrders = analytics.totalOrders || 1; // Avoid division by zero
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const mostOrderedServices = analytics.mostOrderedServices || {};
  const paymentMethods = analytics.paymentMethods || {};
  const ordersThisMonth = analytics.ordersThisMonth || 0;
  const pendingOrdersPercentage = analytics.pendingOrdersPercentage || 0;
  const ordersByDate = analytics.ordersByDate || {};

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col h-full">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {/* <h2 className="text-xl font-bold mb-4 text-purple-400">
          Admin Insights
        </h2> */}

        {/* Grid Layout for Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 📈 Monthly Orders Line Chart */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="bg-gray-800/70 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700/50"
          >
            <h3 className="text-md font-semibold mb-2 text-purple-300">
              Orders Per Month
            </h3>
            <div className="h-40">
              <Line
                data={{
                  labels: Object.keys(analytics.monthlyOrders || {}),
                  datasets: [
                    {
                      label: "Orders",
                      data: Object.values(analytics.monthlyOrders || {}),
                      borderColor: "#8b5cf6", // Purple
                      backgroundColor: "rgba(139, 92, 246, 0.1)",
                      fill: true,
                      tension: 0.4,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        color: "#e5e7eb", // Light gray
                      },
                    },
                    title: {
                      display: false, // Hide title
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: "#374151", // Dark gray
                      },
                      ticks: {
                        color: "#e5e7eb", // Light gray
                      },
                    },
                    y: {
                      grid: {
                        color: "#374151", // Dark gray
                      },
                      ticks: {
                        color: "#e5e7eb", // Light gray
                      },
                    },
                  },
                }}
              />
            </div>
          </motion.div>

          {/* 📊 Order Status Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="bg-gray-800/70 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700/50"
          >
            <h3 className="text-md font-semibold mb-2 text-purple-300">
              Order Status Distribution
            </h3>
            <div className="h-40">
              <Pie
                data={{
                  labels: Object.keys(analytics.statusCounts || {}),
                  datasets: [
                    {
                      data: Object.values(analytics.statusCounts || {}),
                      backgroundColor: [
                        "#4CAF50", // Green
                        "#FFEB3B", // Yellow
                        "#F44336", // Red
                        "#2196F3", // Blue
                      ],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        color: "#e5e7eb", // Light gray
                      },
                    },
                    title: {
                      display: false, // Hide title
                    },
                  },
                }}
              />
            </div>
          </motion.div>

          {/* 💰 Revenue Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="bg-gray-800/70 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700/50"
          >
            <h3 className="text-md font-semibold mb-2 text-purple-300">
              Total Revenue
            </h3>
            <div className="h-40">
              <Bar
                data={{
                  labels: ["Total Revenue"],
                  datasets: [
                    {
                      label: "Revenue (INR)",
                      data: [totalRevenue],
                      backgroundColor: "#f59e0b", // Orange
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        color: "#e5e7eb", // Light gray
                      },
                    },
                    title: {
                      display: false, // Hide title
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: "#374151", // Dark gray
                      },
                      ticks: {
                        color: "#e5e7eb", // Light gray
                      },
                    },
                    y: {
                      grid: {
                        color: "#374151", // Dark gray
                      },
                      ticks: {
                        color: "#e5e7eb", // Light gray
                      },
                    },
                  },
                }}
              />
            </div>
          </motion.div>

          {/* 🎯 Average Order Value */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="bg-gray-800/70 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700/50"
          >
            <h3 className="text-md font-semibold mb-2 text-purple-300">
              Average Order Value
            </h3>
            <div className="text-2xl font-bold text-purple-400">
              ₹{averageOrderValue.toFixed(2)}
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Average amount spent per order.
            </p>
          </motion.div>

          {/* 💳 Most Used Payment Methods */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="bg-gray-800/70 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700/50"
          >
            <h3 className="text-md font-semibold mb-2 text-purple-300">
              Most Used Payment Methods
            </h3>
            <div className="h-40">
              {Object.keys(paymentMethods).length > 0 ? (
                <Pie
                  data={{
                    labels: Object.keys(paymentMethods),
                    datasets: [
                      {
                        data: Object.values(paymentMethods),
                        backgroundColor: ["#8b5cf6", "#14b8a6", "#ec4899"], // Purple, Teal, Pink
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          color: "#e5e7eb", // Light gray
                        },
                      },
                      title: {
                        display: false, // Hide title
                      },
                    },
                  }}
                />
              ) : (
                <p className="text-gray-400 text-sm">No data available.</p>
              )}
            </div>
          </motion.div>

          {/* 📅 Orders This Month */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.3 }}
            className="bg-gray-800/70 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700/50"
          >
            <h3 className="text-md font-semibold mb-2 text-purple-300">
              Orders This Month
            </h3>
            <div className="text-2xl font-bold text-purple-400">
              {ordersThisMonth}
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Total orders placed this month.
            </p>
          </motion.div>

          {/* ⏳ Pending Orders Percentage */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.3 }}
            className="bg-gray-800/70 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700/50"
          >
            <h3 className="text-md font-semibold mb-2 text-purple-300">
              Pending Orders
            </h3>
            <div className="text-2xl font-bold text-purple-400">
              {pendingOrdersPercentage}%
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Percentage of pending orders.
            </p>
          </motion.div>

          {/* 🏆 Most Ordered Service */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.3 }}
            className="bg-gray-800/70 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700/50"
          >
            <h3 className="text-md font-semibold mb-2 text-purple-300">
              Most Ordered Service
            </h3>
            <div className="text-2xl font-bold text-purple-400">
              {Object.keys(mostOrderedServices).length > 0
                ? Object.keys(mostOrderedServices)[0]
                : "N/A"}
            </div>
            <p className="text-gray-400 text-sm mt-1">
              Most frequently ordered service.
            </p>
          </motion.div>

          {/* 📊 Orders by Date */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.3 }}
            className="bg-gray-800/70 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700/50"
          >
            <h3 className="text-md font-semibold mb-2 text-purple-300">
              Orders by Date
            </h3>
            <div className="h-40">
              <Bar
                data={{
                  labels: Object.keys(ordersByDate),
                  datasets: [
                    {
                      label: "Orders",
                      data: Object.values(ordersByDate),
                      backgroundColor: "#8b5cf6", // Purple
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        color: "#e5e7eb", // Light gray
                      },
                    },
                    title: {
                      display: false, // Hide title
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: "#374151", // Dark gray
                      },
                      ticks: {
                        color: "#e5e7eb", // Light gray
                      },
                    },
                    y: {
                      grid: {
                        color: "#374151", // Dark gray
                      },
                      ticks: {
                        color: "#e5e7eb", // Light gray
                      },
                    },
                  },
                }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
