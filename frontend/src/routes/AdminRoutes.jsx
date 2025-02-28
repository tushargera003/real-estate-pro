import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkAdmin } from "../utils/auth";

const AdminRoutes = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin().then((res) => {
      setIsAdmin(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
