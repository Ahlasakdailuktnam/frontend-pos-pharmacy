import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

const AdminOnlyRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await api.get("/api/user");

        if (res.data.is_admin === 1) {
          setAllow(true);
        }
      } catch {}

      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) return <div>Loading...</div>;

  return allow ? children : <Navigate to="/staff" />;
};

export default AdminOnlyRoute;