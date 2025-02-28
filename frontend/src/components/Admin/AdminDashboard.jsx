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

// Register Chart.js components
ChartJS.register(
  CategoryScale, // For category (x-axis) scale
  LinearScale, // For linear (y-axis) scale
  BarElement, // For bar charts
  ArcElement, // For pie/doughnut charts
  PointElement, // For line charts
  LineElement, // For line charts
  Title, // For chart titles
  Tooltip, // For tooltips
  Legend // For legends
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

  const mostOrderedServices = analytics.mostOrderedServices || [];
  const paymentMethods = analytics.paymentMethods || {};
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Insights</h2>

      {/* Grid Layout for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 📈 Monthly Orders Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Orders Per Month
          </h3>
          <div className="h-64">
            <Line
              data={{
                labels: Object.keys(analytics.monthlyOrders || {}),
                datasets: [
                  {
                    label: "Orders",
                    data: Object.values(analytics.monthlyOrders || {}),
                    borderColor: "blue",
                    fill: false,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Monthly Orders",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* 📊 Order Status Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Order Status Distribution
          </h3>
          <div className="h-64">
            <Pie
              data={{
                labels: Object.keys(analytics.statusCounts || {}),
                datasets: [
                  {
                    data: Object.values(analytics.statusCounts || {}),
                    backgroundColor: [
                      "#4CAF50",
                      "#FFEB3B",
                      "#F44336",
                      "#2196F3",
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
                  },
                  title: {
                    display: true,
                    text: "Order Status Distribution",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* 💰 Revenue Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Total Revenue
          </h3>
          <div className="h-64">
            <Bar
              data={{
                labels: ["Total Revenue"],
                datasets: [
                  {
                    label: "Revenue (INR)",
                    data: [totalRevenue],
                    backgroundColor: "orange",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Total Revenue",
                  },
                },
              }}
            />
          </div>
        </div>

        {/* 🎯 Average Order Value */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Average Order Value
          </h3>
          <div className="text-3xl font-bold text-blue-600">
            ₹{averageOrderValue.toFixed(2)}
          </div>
          <p className="text-gray-600 mt-2">Average amount spent per order.</p>
        </div>

        {/* � Most Ordered Services */}
        {/* <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Most Ordered Services
          </h3>
          {mostOrderedServices.length > 0 ? (
            <ul className="space-y-2">
              {mostOrderedServices.map((service, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-semibold">{service.name}</span> -{" "}
                  {service.count} orders
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No data available.</p>
          )}
        </div> */}

        {/* 💳 Most Used Payment Methods */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Most Used Payment Methods
          </h3>
          <div className="h-64">
            {Object.keys(paymentMethods).length > 0 ? (
              <Pie
                data={{
                  labels: Object.keys(paymentMethods),
                  datasets: [
                    {
                      data: Object.values(paymentMethods),
                      backgroundColor: ["purple", "teal", "pink"],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Payment Methods",
                    },
                  },
                }}
              />
            ) : (
              <p className="text-gray-600">No data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
