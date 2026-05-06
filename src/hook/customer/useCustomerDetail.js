// src/hooks/customer/useCustomerDetail.js
import { useState } from "react";
import { getCustomerById } from "../../services/auth";

const useCustomerDetail = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCustomer = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getCustomerById(id);
      const data = res?.data || res;
      setCustomer(data);
      return data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch customer");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { customer, loading, error, fetchCustomer };
};

export default useCustomerDetail;