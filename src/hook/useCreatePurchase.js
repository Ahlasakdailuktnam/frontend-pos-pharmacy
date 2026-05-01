// src/hooks/useCreatePurchase.js

import { useState } from "react";
import { createPurchase } from "../services/auth";

const useCreatePurchase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // ===============================
  // Create Purchase
  // ===============================
  const handleCreatePurchase = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const res = await createPurchase(data);

      console.log("PURCHASE RESPONSE:", res);

      setSuccess(true);

      return {
        success: true,
        data: res?.data || res,
      };
    } catch (err) {
      console.error(
        "Create Purchase Error:",
        err.response || err
      );

      setError(
        err.response?.data?.message ||
          "Create purchase failed"
      );

      return {
        success: false,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    handleCreatePurchase,
    loading,
    error,
    success,
    setSuccess, // optional (to reset UI)
  };
};

export default useCreatePurchase;