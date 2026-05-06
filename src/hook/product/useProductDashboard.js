import { useEffect, useState } from "react";
import { getProductDashboard } from "../../services/auth";

const useProductDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await getProductDashboard();
      const data = res?.data || res;
      setDashboardData(data);
    } catch (error) {
      console.error("Fetch Product Dashboard Error:", error);
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return { dashboardData, loading, fetchDashboard };
};

export default useProductDashboard;