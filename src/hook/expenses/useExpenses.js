import { useState, useCallback } from "react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats,
} from "../../services/auth";

export const useExpenses = () => {
  // Always initialize as empty array, never undefined
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    this_month: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    status: "all",
    month: "all",
  });

  // Fetch expenses with current filters (MANUAL)
  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.category && filters.category !== "all")
        params.category = filters.category;
      if (filters.status && filters.status !== "all")
        params.status = filters.status;
      if (filters.month && filters.month !== "all") params.month = filters.month;

      const response = await getExpenses(params);
      // Ensure we always set an array
      setExpenses(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError(err.response?.data?.message || "Failed to fetch expenses");
      setExpenses([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch statistics (MANUAL)
  const fetchStats = useCallback(async () => {
    try {
      const response = await getExpenseStats();
      setStats(response.data || { total: 0, paid: 0, pending: 0, this_month: 0 });
    } catch (err) {
      console.error("Error fetching stats:", err);
      setStats({ total: 0, paid: 0, pending: 0, this_month: 0 });
    }
  }, []);

  // Add new expense
  const addExpense = async (expenseData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createExpense(expenseData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create expense");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Edit existing expense
  const editExpense = async (id, expenseData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateExpense(id, expenseData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update expense");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Remove expense
  const removeExpense = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteExpense(id);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete expense");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      status: "all",
      month: "all",
    });
  };

  return {
    expenses,      // Always an array, never undefined
    stats,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    addExpense,
    editExpense,
    removeExpense,
    fetchExpenses,
    fetchStats,
  };
};