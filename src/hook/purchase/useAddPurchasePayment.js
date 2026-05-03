// src/hooks/purchase/useAddPurchasePayment.js

import { useState } from "react";
import { addPurchasePayment } from "../../services/auth";

const useAddPurchasePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addPayment = async (purchaseId, paymentData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await addPurchasePayment(purchaseId, paymentData);
      return {
        success: response?.success ?? true,
        data: response?.data,
        message: response?.message || 'កត់ត្រាការបង់ប្រាក់ដោយជោគជ័យ'
      };
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'មានបញ្ហាក្នុងការកត់ត្រា';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  return { addPayment, loading, error };
};

export default useAddPurchasePayment;