// src/hooks/usePurchases.js

import { useEffect, useState } from "react";
import { getPurchases } from "../../services/auth";

const usePurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchases = async () => {
    try {
      setLoading(true);

      const res = await getPurchases();

      const rows = res?.data || []; // 🔥 important (your apiResponse)
      setPurchases(Array.isArray(rows) ? rows : []);

    } catch (error) {
      console.error("Fetch Purchases Error:", error);
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return {
    purchases,
    loading,
    fetchPurchases,
  };
};

export default usePurchases;