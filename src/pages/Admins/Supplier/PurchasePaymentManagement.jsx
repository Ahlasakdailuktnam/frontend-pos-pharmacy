// src/pages/Admins/Supplier/PurchasePaymentManagement.jsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdAttachMoney,
  MdRefresh,
  MdCheckCircle,
  MdCancel,
  MdPending,
  MdClose,
  MdHistory,
  MdReceipt,
  MdAccountBalance,
  MdMoney,
} from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import usePurchaseDetail from "../../../hook/purchase/usePurchaseDetail";
import usePurchasePayment from "../../../hook/purchase/usePurchasePayment";
import useAddPurchasePayment from "../../../hook/purchase/useAddPurchasePayment";

const PurchasePaymentManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { purchase, loading: purchaseLoading } = usePurchaseDetail(id);
  const { payments, summary, loading: paymentsLoading, fetchPayments } = usePurchasePayment(id);
  const { addPayment, loading: addLoading } = useAddPurchasePayment();
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentNotes, setPaymentNotes] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const formatCurrency = (amount) => {
    const numAmount = parseFloat(amount) || 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(numAmount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleString("en-CA", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case "cash": return "សាច់ប្រាក់";
      case "bank_transfer": return "ផ្ទេរធនាគារ";
      default: return method || "—";
    }
  };

  const getPaymentMethodBadge = (method) => {
    const colors = {
      cash: "bg-green-100 text-green-700",
      bank_transfer: "bg-blue-100 text-blue-700",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${colors[method] || "bg-gray-100"}`}>
        {method === "cash" ? <MdMoney size={12} /> : <MdAccountBalance size={12} />}
        {getPaymentMethodText(method)}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><MdCheckCircle size={12} /> បានបង់អស់ហើយ</span>;
      case "partial":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"><MdPending size={12} /> បានបង់ខ្លះ</span>;
      case "pending":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700"><MdCancel size={12} /> មិនទាន់បង់</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100">{status}</span>;
    }
  };

  const remaining = (purchase?.grand_total || 0) - (purchase?.paid_amount || 0);
  const isFullyPaid = remaining <= 0;
  const paidPercent = purchase?.grand_total ? (purchase.paid_amount / purchase.grand_total) * 100 : 0;

  const handleAddPayment = async () => {
    setError("");
    
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      setError("សូមបញ្ចូលទឹកប្រាក់");
      return;
    }
    
    if (parseFloat(paymentAmount) > remaining) {
      setError(`ទឹកប្រាក់លើសពីចំនួនដែលនៅសល់ (នៅសល់: ${formatCurrency(remaining)})`);
      return;
    }
    
    const result = await addPayment(id, {
      amount: parseFloat(paymentAmount),
      payment_method: paymentMethod,
      payment_date: paymentDate,
      notes: paymentNotes
    });
    
    if (result.success) {
      setSuccessMsg(`កត់ត្រាការបង់ប្រាក់ចំនួន ${formatCurrency(parseFloat(paymentAmount))} ដោយជោគជ័យ`);
      setShowPaymentModal(false);
      setPaymentAmount("");
      setPaymentNotes("");
      fetchPayments();
      setTimeout(() => setSuccessMsg(""), 3000);
    } else {
      setError(result.message);
    }
  };

  if (purchaseLoading || paymentsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">កំពុងផ្ទុកទិន្នន័យ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <MdArrowBack size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">កត់ត្រាការបង់ប្រាក់</h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  វិក្កយបត្រ: {purchase?.purchase_code} - {purchase?.supplier?.company_name_kh || purchase?.supplier?.company_name_en}
                </p>
              </div>
            </div>
            <button
              onClick={fetchPayments}
              className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
            >
              <MdRefresh size={18} />
              ធ្វើឲ្យថ្មី
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="max-w-full mx-auto">
          
          {/* Success Message */}
          {successMsg && (
            <div className="mb-4 bg-green-100 text-green-700 p-3 rounded-lg flex items-center justify-between">
              <span>{successMsg}</span>
              <button onClick={() => setSuccessMsg("")} className="text-green-700">
                <MdClose size={18} />
              </button>
            </div>
          )}

          {/* Purchase Summary Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6 overflow-hidden">
            <div className="p-4 md:p-5 border-b border-gray-100 bg-gray-50">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <MdReceipt size={20} />
                ព័ត៌មានវិក្កយបត្រ
              </h2>
            </div>
            <div className="p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">លេខវិក្កយបត្រ</p>
                  <p className="font-medium">{purchase?.purchase_code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">អ្នកផ្គត់ផ្គង់</p>
                  <p className="font-medium">{purchase?.supplier?.company_name_kh || purchase?.supplier?.company_name_en}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">កាលបរិច្ឆេទទិញ</p>
                  <p className="font-medium">{formatDate(purchase?.purchase_date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ស្ថានភាព</p>
                  <div>{getStatusBadge(purchase?.payment_status)}</div>
                </div>
              </div>
              
              {/* Progress Bar & Amount Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mt-2">
                <div className="grid grid-cols-3 gap-4 mb-3 text-center">
                  <div>
                    <p className="text-xs text-gray-500">ទឹកប្រាក់សរុប</p>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(purchase?.grand_total)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">បានបង់រួច</p>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(purchase?.paid_amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">នៅសល់បង់</p>
                    <p className="text-lg font-bold text-orange-600">{formatCurrency(remaining)}</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-teal-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${paidPercent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  បានបង់ {paidPercent.toFixed(1)}% នៃទឹកប្រាក់សរុប
                </p>
              </div>
            </div>
          </div>

          {/* Add Payment Section */}
          {!isFullyPaid ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
              <div className="p-4 md:p-5 border-b border-gray-100 bg-gray-50">
                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                  <MdAttachMoney size={20} />
                  កត់ត្រាការបង់ប្រាក់បន្ថែម
                </h2>
              </div>
              <div className="p-4 md:p-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ទឹកប្រាក់ *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">កាលបរិច្ឆេទ *</label>
                    <input
                      type="date"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">វិធីបង់ប្រាក់</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="cash">🏦 សាច់ប្រាក់</option>
                      <option value="bank_transfer">🏧 ផ្ទេរធនាគារ</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={handleAddPayment}
                      disabled={addLoading}
                      className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {addLoading ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}
                    </button>
                  </div>
                  <div className="md:col-span-4">
                    <textarea
                      value={paymentNotes}
                      onChange={(e) => setPaymentNotes(e.target.value)}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="កំណត់ចំណាំ (ស្រេចចិត្ត)"
                    />
                  </div>
                </div>
                {error && (
                  <div className="mt-3 bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-green-50 rounded-xl border border-green-200 shadow-sm mb-6 p-4 text-center">
              <MdCheckCircle size={40} className="text-green-500 mx-auto mb-2" />
              <p className="text-green-700 font-medium">វិក្កយបត្រនេះបានបង់ប្រាក់អស់ហើយ!</p>
              <p className="text-green-600 text-sm">សរុបទឹកប្រាក់: {formatCurrency(purchase?.grand_total)} | បានបង់: {formatCurrency(purchase?.paid_amount)}</p>
            </div>
          )}

          {/* Payment History Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 md:px-5 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <MdHistory size={20} />
                ប្រវត្តិការបង់ប្រាក់
                {payments.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-200 rounded-full text-xs">
                    {payments.length} ដង
                  </span>
                )}
              </h2>
            </div>
            
            {payments.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MdAttachMoney className="text-gray-400 text-2xl" />
                </div>
                <p className="text-gray-500">មិនទាន់មានការបង់ប្រាក់នៅឡើយទេ</p>
                <p className="text-gray-400 text-sm">សូមកត់ត្រាការបង់ប្រាក់ខាងលើ</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">កាលបរិច្ឆេទ</th>
                      <th className="px-4 py-3 text-right font-semibold text-gray-700">ទឹកប្រាក់</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">វិធីបង់ប្រាក់</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">លេខយោង</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">កំណត់ចំណាំ</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">អ្នកកត់ត្រា</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">ពេលវេលា</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                          {formatDate(payment.payment_date)}
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap font-semibold text-green-600">
                          {formatCurrency(payment.amount)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {getPaymentMethodBadge(payment.payment_method)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-500 font-mono text-xs">
                          {payment.reference_no || "—"}
                        </td>
                        <td className="px-4 py-3 max-w-[200px] truncate text-gray-500">
                          {payment.notes || "—"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                          {payment.created_by?.name || "—"}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-400 text-xs">
                          {formatDateTime(payment.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 border-t border-gray-100">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-700">សរុប</td>
                      <td className="px-4 py-3 text-right font-bold text-green-700">
                        {formatCurrency(summary.total_paid)}
                      </td>
                      <td colSpan="5"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>

          {/* Back Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ត្រលប់ក្រោយ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePaymentManagement;