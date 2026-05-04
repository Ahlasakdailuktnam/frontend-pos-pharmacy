// src/hooks/supplier/useSupplierDashboard.js

import { useEffect, useState } from "react";
import { getSupplierDashboard } from "../../services/auth";

const useSupplierDashboard = (year, month) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await getSupplierDashboard(year, month);
      const data = res?.data || res;
      setDashboardData(data);
    } catch (error) {
      console.error("Fetch Dashboard Error:", error);
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (year && month !== undefined) {
      fetchDashboard();
    }
  }, [year, month]);

  return {
    dashboardData,
    loading,
    fetchDashboard,
  };
};

export default useSupplierDashboard;