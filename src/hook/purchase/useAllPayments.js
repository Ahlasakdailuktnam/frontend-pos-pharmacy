import { useEffect, useState } from "react";
import { getAllPayments } from "../../services/auth";

const useAllPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await getAllPayments();
      const data = res?.data || res || [];
      setPayments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch All Payments Error:", error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return {
    payments,
    loading,
    fetchPayments,
  };
};

export default useAllPayments;