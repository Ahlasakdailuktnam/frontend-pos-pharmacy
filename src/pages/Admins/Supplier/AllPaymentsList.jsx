// src/pages/Admins/Supplier/AllPaymentsList.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdSearch,
  MdFilterList,
  MdReceipt,
  MdAttachMoney,
  MdVisibility,
  MdCheckCircle,
  MdCancel,
  MdPending,
  MdRefresh,
  MdPerson,
  MdDateRange,
  MdPrint,
  MdDownload,
  MdAccountBalance,
  MdMoney,
} from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import useAllPayments from "../../../hook/purchase/useAllPayments";

const AllPaymentsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");
  const { payments, loading, fetchPayments } = useAllPayments();

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

  const getPurchaseStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 flex items-center gap-1"><MdCheckCircle size={10} /> បានបង់អស់</span>;
      case "partial":
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700 flex items-center gap-1"><MdPending size={10} /> បង់ខ្លះ</span>;
      case "pending":
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700 flex items-center gap-1"><MdCancel size={10} /> មិនទាន់បង់</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100">{status}</span>;
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      (payment.purchase_code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.supplier_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.reference_no || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMethod = methodFilter === "all" || payment.payment_method === methodFilter;
    
    return matchesSearch && matchesMethod;
  });

  const summary = {
    total: filteredPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0),
    count: filteredPayments.length,
    cash: filteredPayments.filter(p => p.payment_method === "cash").reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0),
    bank: filteredPayments.filter(p => p.payment_method === "bank_transfer").reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0),
  };

  if (loading) {
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
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">ប្រវត្តិការបង់ប្រាក់ទាំងអស់</h1>
                <p className="text-gray-500 text-sm mt-0.5">គ្រប់គ្រងរាល់ការបង់ប្រាក់ទិញទំនិញពីអ្នកផ្គត់ផ្គង់</p>
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
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">ចំនួនដង</p>
                  <p className="text-2xl font-bold text-gray-800">{summary.count}</p>
                </div>
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                  <MdReceipt className="text-teal-600 text-xl" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">ទឹកប្រាក់សរុប</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(summary.total)}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FaDollarSign className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">សាច់ប្រាក់</p>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(summary.cash)}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <MdMoney className="text-green-600 text-xl" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">ផ្ទេរធនាគារ</p>
                  <p className="text-lg font-bold text-orange-600">{formatCurrency(summary.bank)}</p>
                </div>
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <MdAccountBalance className="text-orange-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
            <div className="p-4 md:p-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="ស្វែងរកតាមលេខវិក្កយបត្រ ឈ្មោះអ្នកផ្គត់ផ្គង់ ឬ លេខយោង..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="relative sm:w-64">
                  <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <select
                    value={methodFilter}
                    onChange={(e) => setMethodFilter(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 appearance-none bg-white text-sm"
                  >
                    <option value="all">វិធីបង់ប្រាក់ទាំងអស់</option>
                    <option value="cash">សាច់ប្រាក់</option>
                    <option value="bank_transfer">ផ្ទេរធនាគារ</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">លេខវិក្កយបត្រ</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">អ្នកផ្គត់ផ្គង់</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">កាលបរិច្ឆេទបង់</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-700">ទឹកប្រាក់</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">វិធីបង់ប្រាក់</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">លេខយោង</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">ស្ថានភាពវិក្កយបត្រ</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">អ្នកកត់ត្រា</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">ពេលវេលា</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">សកម្មភាព</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/admin/supplier/purchase-receipt/${payment.purchase_id}`)}
                          className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {payment.purchase_code || "—"}
                        </button>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <MdPerson className="text-gray-400" />
                          <span className="text-gray-800">{payment.supplier_name || "—"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <MdDateRange className="text-gray-400" />
                          <span className="text-gray-600">{formatDate(payment.payment_date)}</span>
                        </div>
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
                      <td className="px-4 py-3 whitespace-nowrap">
                        {getPurchaseStatusBadge(payment.purchase_status)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                        {payment.created_by_name || "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-400 text-xs">
                        {formatDateTime(payment.created_at)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/supplier/purchase-receipt/${payment.purchase_id}`)}
                            className="p-1.5 hover:bg-blue-50 rounded transition-colors"
                            title="មើលវិក្កយបត្រ"
                          >
                            <MdVisibility size={18} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => window.print()}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                            title="បោះពុម្ព"
                          >
                            <MdPrint size={18} className="text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredPayments.length === 0 && (
            <div className="p-12 text-center bg-white rounded-xl border">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdAttachMoney className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {searchTerm || methodFilter !== "all" ? "មិនមានលទ្ធផល" : "មិនទាន់មានការបង់ប្រាក់"}
              </h3>
              <p className="text-gray-500">
                {searchTerm || methodFilter !== "all" ? "សូមប្តូរលក្ខណៈវិនិច្ឆ័យស្វែងរក" : "សូមកត់ត្រាការបង់ប្រាក់ជាមុនសិន"}
              </p>
            </div>
          )}

          {filteredPayments.length > 0 && (
            <div className="border-t border-gray-100 px-4 py-4 bg-gray-50 rounded-b-xl">
              <div className="text-sm text-gray-500">
                បង្ហាញ {filteredPayments.length} ក្នុងចំណោម {payments.length} កំណត់ត្រាបង់ប្រាក់
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPaymentsList;