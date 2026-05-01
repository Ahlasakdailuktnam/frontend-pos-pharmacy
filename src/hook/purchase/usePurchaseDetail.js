// src/hooks/usePurchaseDetail.js

import { useEffect, useState } from "react";
import { getPurchaseById } from "../../services/auth";

const usePurchaseDetail = (id) => {
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPurchase = async () => {
    try {
      setLoading(true);

      const res = await getPurchaseById(id);

      setPurchase(res?.data || null); //  same fix

    } catch (error) {
      console.error("Fetch Purchase Detail Error:", error);
      setPurchase(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPurchase();
  }, [id]);

  return {
    purchase,
    loading,
  };
};

export default usePurchaseDetail;