// src/hooks/purchase/usePurchasePayments.js

import { useEffect, useState } from "react";
import { getPurchasePayments } from "../../services/auth";

const usePurchasePayment = (purchaseId) => {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({
    total_paid: 0,
    remaining: 0,
    grand_total: 0,
    payment_status: 'pending'
  });
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    if (!purchaseId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const res = await getPurchasePayments(purchaseId);
      const data = res?.data || {};
      setPayments(data.payments || []);
      setSummary(data.summary || {
        total_paid: 0,
        remaining: 0,
        grand_total: 0,
        payment_status: 'pending'
      });
    } catch (error) {
      console.error("Fetch Purchase Payments Error:", error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (purchaseId) {
      fetchPayments();
    }
  }, [purchaseId]);

  return {
    payments,
    summary,
    loading,
    fetchPayments,
  };
};

export default usePurchasePayment;