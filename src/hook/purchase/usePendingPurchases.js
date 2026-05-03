import { useEffect, useState } from "react";
import { getPendingPurchases } from "../../services/auth";

const usePendingPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const res = await getPendingPurchases();
      const data = res?.data || res || [];
      setPurchases(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch Pending Purchases Error:", error);
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

export default usePendingPurchases;