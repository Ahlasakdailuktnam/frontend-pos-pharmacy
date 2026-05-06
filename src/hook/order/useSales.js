// src/hooks/order/useSales.js
import { useEffect, useState } from "react";
import { getTodaySales, getStaffSales, getAllSales } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

export const useTodaySales = () => {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    total_orders: 0,
    total_sales: 0,
    total_items: 0,
    total_discount: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const res = await getTodaySales();
      const data = res?.data || res;
      setOrders(data.orders || []);
      setSummary(data.summary || {});
    } catch (error) {
      console.error("Fetch Today Sales Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return { orders, summary, loading, fetchSales };
};

export const useStaffSales = (date = null) => {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    total_orders: 0,
    total_sales: 0,
    total_items: 0,
    total_discount: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchSales = async (params = {}) => {
    try {
      setLoading(true);
      const res = await getStaffSales(params);
      const data = res?.data || res;
      setOrders(data.orders || []);
      setSummary(data.summary || {});
    } catch (error) {
      console.error("Fetch Staff Sales Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return { orders, summary, loading, fetchSales };
};