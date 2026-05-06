// src/pages/Admins/AllReceipts.jsx
import React, { useState } from "react";
import { useAllSales } from "../../../hook/order/useAdminSales";
import { useNavigate } from "react-router-dom";
import {
  MdReceipt,
  MdPrint,
  MdVisibility,
  MdClose,
  MdArrowBack,
  MdSearch,
  MdFilterList,
} from "react-icons/md";
import { FaMoneyBillWave, FaCreditCard, FaQrcode } from "react-icons/fa";

const AllReceipts = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    user_id: "",
    payment_method: "",
    search: "",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const { orders, summary, staffs, loading, fetchSales } = useAllSales(filters);

  const formatPrice = (price) => {
    const numPrice = typeof price === "number" ? price : parseFloat(price) || 0;
    return numPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPaymentIcon = (method) => {
    switch (method) {
      case "cash":
        return <FaMoneyBillWave className="text-green-600" />;
      case "card":
        return <FaCreditCard className="text-blue-600" />;
      case "qr":
        return <FaQrcode className="text-purple-600" />;
      default:
        return <MdReceipt />;
    }
  };

  const getPaymentText = (method) => {
    switch (method) {
      case "cash":
        return "សាច់ប្រាក់";
      case "card":
        return "ប័ណ្ណឥណទាន";
      case "qr":
        return "ស្កេន QR";
      default:
        return method;
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const applyFilters = () => {
    fetchSales(filters);
    setShowFilter(false);
  };

  const resetFilters = () => {
    setFilters({ start_date: "", end_date: "", user_id: "", payment_method: "", search: "" });
    fetchSales({});
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
        <div className="px-6 py-5">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/sales')}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <MdArrowBack size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">វិក្កយបត្រទាំងអស់</h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  បង្ហាញវិក្កយបត្រទាំងអស់ {summary.total_orders > 0 && `(${summary.total_orders} វិក្កយបត្រ)`}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
              >
                <MdFilterList size={18} />
                <span>តម្រង</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all"
              >
                <MdPrint size={18} />
                <span>បោះពុម្ពទាំងអស់</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4">
            <div className="relative">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ស្វែងរកតាមលេខវិក្កយបត្រ ឬ ឈ្មោះអតិថិជន..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Bar */}
          {showFilter && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs text-gray-500">កាលបរិច្ឆេទចាប់ផ្ដើម</label>
                  <input
                    type="date"
                    value={filters.start_date}
                    onChange={(e) => handleFilterChange("start_date", e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">កាលបរិច្ឆេទបញ្ចប់</label>
                  <input
                    type="date"
                    value={filters.end_date}
                    onChange={(e) => handleFilterChange("end_date", e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">បុគ្គលិក</label>
                  <select
                    value={filters.user_id}
                    onChange={(e) => handleFilterChange("user_id", e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg"
                  >
                    <option value="">ទាំងអស់</option>
                    {staffs?.map((staff) => (
                      <option key={staff.id} value={staff.id}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500">វិធីបង់ប្រាក់</label>
                  <select
                    value={filters.payment_method}
                    onChange={(e) => handleFilterChange("payment_method", e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg"
                  >
                    <option value="">ទាំងអស់</option>
                    <option value="cash">សាច់ប្រាក់</option>
                    <option value="card">ប័ណ្ណឥណទាន</option>
                    <option value="qr">ស្កេន QR</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={applyFilters} className="px-4 py-2 bg-teal-600 text-white rounded-lg">
                  អនុវត្ត
                </button>
                <button onClick={resetFilters} className="px-4 py-2 border border-gray-300 rounded-lg">
                  កំណត់ឡើងវិញ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">វិក្កយបត្រសរុប</p>
            <p className="text-2xl font-bold text-gray-800">{summary.total_orders || 0}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">ចំណូលសរុប</p>
            <p className="text-2xl font-bold text-teal-600">${formatPrice(summary.total_sales)}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">បញ្ចុះតម្លៃសរុប</p>
            <p className="text-2xl font-bold text-red-600">${formatPrice(summary.total_discount)}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">ផលិតផលសរុប</p>
            <p className="text-2xl font-bold text-gray-800">{summary.total_items || 0}</p>
          </div>
        </div>

        {/* All Receipts Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100 sticky top-0">
                <tr className="text-left text-sm font-semibold text-gray-600">
                  <th className="px-6 py-4">លេខវិក្កយបត្រ</th>
                  <th className="px-6 py-4">អតិថិជន</th>
                  <th className="px-6 py-4">បុគ្គលិក</th>
                  <th className="px-6 py-4">កាលបរិច្ឆេទ</th>
                  <th className="px-6 py-4 text-right">សរុប</th>
                  <th className="px-6 py-4 text-center">វិធីបង់ប្រាក់</th>
                  <th className="px-6 py-4 text-center">សកម្មភាព</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders?.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium text-gray-800">
                        {order.order_number}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-800">{order.customer_name || "មិនមាន"}</p>
                      <p className="text-xs text-gray-400">{order.customer_phone || "—"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{order.user?.name || "—"}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-teal-600">${formatPrice(order.total)}</span>
                      {order.discount > 0 && (
                        <p className="text-xs text-red-500">បញ្ចុះ ${formatPrice(order.discount)}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {getPaymentIcon(order.payment_method)}
                        <span className="text-xs text-gray-500">{getPaymentText(order.payment_method)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowDetail(true);
                        }}
                        className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition"
                        title="មើលវិក្កយបត្រ"
                      >
                        <MdVisibility size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders?.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdReceipt className="text-4xl text-gray-400" />
              </div>
              <p className="text-gray-500">មិនមានវិក្កយបត្រទេ</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50"
              >
                កំណត់តម្រងឡើងវិញ
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {showDetail && selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDetail(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="text-center flex-1">
                  <h2 className="text-xl font-bold text-gray-800">ឱសថស្ថាន អាឡាត្រឡោកបែក</h2>
                  <p className="text-xs text-gray-500 mt-1">វិក្កយបត្រលក់ទំនិញ</p>
                  <div className="mt-2 pt-2 border-t border-dashed border-gray-200">
                    <p className="text-xs text-gray-400">
                      លេខវិក្កយបត្រ: <span className="font-mono font-medium">{selectedOrder.order_number}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      កាលបរិច្ឆេទ: {formatDate(selectedOrder.created_at)}
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowDetail(false)} className="text-gray-400 hover:text-gray-600">
                  <MdClose size={24} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6 pb-4 border-b border-dashed border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">ព័ត៌មានអតិថិជន</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-400">ឈ្មោះ</p>
                    <p className="font-medium">{selectedOrder.customer_name || "មិនមាន"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">លេខទូរស័ព្ទ</p>
                    <p className="font-medium">{selectedOrder.customer_phone || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">បុគ្គលិកលក់</p>
                    <p className="font-medium">{selectedOrder.user?.name || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">វិធីបង់ប្រាក់</p>
                    <p className="font-medium flex items-center gap-1">
                      {getPaymentIcon(selectedOrder.payment_method)}
                      {getPaymentText(selectedOrder.payment_method)}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-sm mb-3">ទំនិញដែលបានទិញ</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">ទំនិញ</th>
                      <th className="px-4 py-2 text-center">ចំនួន</th>
                      <th className="px-4 py-2 text-right">តម្លៃ</th>
                      <th className="px-4 py-2 text-right">សរុប</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {selectedOrder.items?.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 text-sm">{item.product_name}</td>
                        <td className="px-4 py-2 text-center">{item.quantity}</td>
                        <td className="px-4 py-2 text-right">${formatPrice(item.price)}</td>
                        <td className="px-4 py-2 text-right font-medium">${formatPrice(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan="3" className="px-4 py-2 text-right font-semibold">សរុបរង:</td>
                      <td className="px-4 py-2 text-right">${formatPrice(selectedOrder.subtotal)}</td>
                    </tr>
                    {selectedOrder.discount > 0 && (
                      <tr>
                        <td colSpan="3" className="px-4 py-2 text-right text-red-500">បញ្ចុះតម្លៃ:</td>
                        <td className="px-4 py-2 text-right text-red-500">-${formatPrice(selectedOrder.discount)}</td>
                      </tr>
                    )}
                    <tr className="border-t">
                      <td colSpan="3" className="px-4 py-2 text-right font-bold">សរុប:</td>
                      <td className="px-4 py-2 text-right font-bold text-teal-600">${formatPrice(selectedOrder.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-6 pt-4 border-t border-dashed border-gray-200 text-center">
                <p className="text-xs text-gray-400">សូមអរគុណសម្រាប់ការទិញទំនិញ!</p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg flex items-center gap-2 hover:bg-teal-700 transition"
                >
                  <MdPrint size={16} />
                  បោះពុម្ព
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReceipts;