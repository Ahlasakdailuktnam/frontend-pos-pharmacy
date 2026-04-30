import { useState } from "react";
import { createPurchase } from "../services/auth";

const useCreatePurchase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState(null);

  /**
   * 🔍 VALIDATION FUNCTION (IMPORTANT)
   */
  const validate = (data) => {
    if (!data.supplier_id) {
      return "សូមជ្រើសរើសអ្នកផ្គត់ផ្គង់";
    }

    if (!data.warehouse_id) {
      return "សូមជ្រើសរើសឃ្លាំង";
    }

    if (!data.items || data.items.length === 0) {
      return "សូមបញ្ចូលទំនិញយ៉ាងហោចណាស់ ១";
    }

    const invalidItem = data.items.find(item => !item.product_id);
    if (invalidItem) {
      return "មានទំនិញមិនទាន់ជ្រើសរើស";
    }

    if (data.payment_status === "partial") {
      if (!data.paid_amount || data.paid_amount <= 0) {
        return "សូមបញ្ចូលចំនួនប្រាក់ដែលបានបង់";
      }

      if (data.paid_amount > data.grand_total) {
        return "ប្រាក់បង់មិនអាចលើសសរុបបានទេ";
      }
    }

    return null;
  };

  /**
   * 🚀 CREATE PURCHASE FUNCTION
   */
  const create = async (payload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      /**
       * ✅ FRONTEND VALIDATION FIRST
       */
      const validationError = validate(payload);
      if (validationError) {
        setError(validationError);
        setLoading(false);
        return null;
      }

      /**
       * 🔥 API CALL
       */
      const res = await createPurchase(payload);

      /**
       * ✅ SUCCESS HANDLE
       */
      setResponse(res);
      setSuccess(true);

      return res;

    } catch (err) {
      /**
       * ❌ ERROR HANDLE
       */
      if (err.response) {
        // Laravel validation error
        const msg =
          err.response.data?.message ||
          JSON.stringify(err.response.data);

        setError(msg);
      } else if (err.request) {
        setError("មិនអាចភ្ជាប់ទៅ server បានទេ");
      } else {
        setError("មានបញ្ហាផ្នែក client");
      }

      return null;

    } finally {
      setLoading(false);
    }
  };

  /**
   * 🔄 RESET STATE
   */
  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
    setResponse(null);
  };

  return {
    createPurchase: create,
    loading,
    error,
    success,
    response,
    reset,
  };
};

export default useCreatePurchase;