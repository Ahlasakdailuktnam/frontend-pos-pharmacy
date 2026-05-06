// src/hooks/customer/useCustomers.js
import { useEffect, useState } from "react";
import { getCustomers, getCustomerStats } from "../../services/auth";

const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({
    total_customers: 0,
    total_spent: 0,
    total_orders: 0,
    avg_spent: 0
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("all");

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (tier !== "all") params.tier = tier;
      
      const res = await getCustomers(params);
      const data = res?.data || res || [];
      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch Customers Error:", error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await getCustomerStats();
      const data = res?.data || res;
      setStats({
        total_customers: data.total_customers || 0,
        total_spent: data.total_spent || 0,
        total_orders: data.total_orders || 0,
        avg_spent: data.avg_spent || 0
      });
    } catch (error) {
      console.error("Fetch Stats Error:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, tier]);

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    customers,
    stats,
    loading,
    search,
    setSearch,
    tier,
    setTier,
    fetchCustomers,
    fetchStats
  };
};

export default useCustomers;