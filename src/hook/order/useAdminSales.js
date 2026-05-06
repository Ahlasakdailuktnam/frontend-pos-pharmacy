// src/hooks/order/useAdminSales.js
import { useEffect, useState } from "react";
import { getAllSales, getSalesStats, getOrderById } from "../../services/auth";

export const useAllSales = (initialFilters = {}) => {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    total_orders: 0,
    total_sales: 0,
    total_items: 0,
    total_discount: 0
  });
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);

  const fetchSales = async (params = {}) => {
    try {
      setLoading(true);
      const res = await getAllSales(params);
      // Handle response structure
      const data = res?.data?.data || res?.data || res;
      setOrders(data.orders || []);
      setSummary(data.summary || {});
      setStaffs(data.staffs || []);
    } catch (error) {
      console.error("Fetch All Sales Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales(filters);
  }, [filters]);

  return { orders, summary, staffs, loading, filters, setFilters, fetchSales };
};

export const useSalesStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await getSalesStats();
      // Handle response structure
      const data = res?.data?.data || res?.data || res;
      setStats(data);
    } catch (error) {
      console.error("Fetch Sales Stats Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, fetchStats };
};

export const useOrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async (id) => {
    try {
      setLoading(true);
      const res = await getOrderById(id);
      const data = res?.data?.data || res?.data || res;
      setOrder(data);
      return data;
    } catch (error) {
      console.error("Fetch Order Detail Error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { order, loading, fetchOrder };
};