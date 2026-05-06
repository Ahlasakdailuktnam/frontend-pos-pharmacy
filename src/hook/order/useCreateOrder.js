// src/hooks/order/useCreateOrder.js
import { useState } from "react";
import { createOrder } from "../../services/auth";

const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitOrder = async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createOrder(orderData);
      return {
        success: true,
        data: response?.data || response,
        message: response?.message || "បញ្ចប់ការលក់ដោយជោគជ័យ"
      };
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "មានបញ្ហាក្នុងការបញ្ចប់ការលក់";
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: error?.response?.data
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    submitOrder,
    loading,
    error
  };
};

export default useCreateOrder;