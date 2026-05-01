import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdSearch,
  MdFilterList,
  MdReceipt,
  MdPerson,
  MdAttachMoney,
  MdVisibility,
  MdEdit,
  MdPrint,
  MdDownload,
  MdCheckCircle,
  MdCancel,
  MdPending,
  MdRefresh,
  MdLocalShipping,
  MdDateRange,
  MdPhone,
  MdLocationOn,
} from "react-icons/md";
import { FaDollarSign, FaBuilding, FaBoxes } from "react-icons/fa";
import usePurchases from "../../../hook/purchase/usePurchase";

const PurchaseInvoiceManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { purchases, loading, fetchPurchases } = usePurchases();

  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <MdCheckCircle size={12} />
            បានបង់ប្រាក់
          </span>
        );
      case "partial":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <MdPending size={12} />
            បានបង់ខ្លះ
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <MdCancel size={12} />
            មិនទាន់បង់
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            <MdCancel size={12} />
            បានបោះបង់
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case "cash":
        return "សាច់ប្រាក់";
      case "bank_transfer":
        return "ផ្ទេរធនាគារ";
      case "credit":
        return "បង់រំលស់";
      default:
        return method || "—";
    }
  };

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

  const handleViewDetails = (purchaseId) => {
    navigate(`/admin/supplier/purchase-receipt/${purchaseId}`);
  };

  const handlePrint = (purchase) => {
    // You can implement print logic here
    console.log("Print purchase:", purchase);
  };

  const handleDownload = (purchase) => {
    // You can implement download PDF logic here
    console.log("Download purchase:", purchase);
  };

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch =
      (purchase.purchase_code || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (purchase.invoice_number || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (purchase.supplier?.company_name_kh || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (purchase.supplier?.phone || "").includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || purchase.payment_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const summary = {
    total: purchases.reduce(
      (sum, inv) => sum + (parseFloat(inv.grand_total) || 0),
      0,
    ),
    paid: purchases.reduce(
      (sum, inv) => sum + (parseFloat(inv.paid_amount) || 0),
      0,
    ),
    unpaid: purchases.reduce(
      (sum, inv) =>
        sum +
        ((parseFloat(inv.grand_total) || 0) -
          (parseFloat(inv.paid_amount) || 0)),
      0,
    ),
    count: purchases.length,
    paidCount: purchases.filter((inv) => inv.payment_status === "paid").length,
    partialCount: purchases.filter((inv) => inv.payment_status === "partial")
      .length,
    unpaidCount: purchases.filter((inv) => inv.payment_status === "pending")
      .length,
  };

  const handleRefresh = () => {
    fetchPurchases();
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
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <a
                href="/dashboard"
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <MdArrowBack size={20} className="text-gray-600" />
              </a>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  វិក្កយបត្រទិញទំនិញ
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  គ្រប់គ្រងវិក្កយបត្រទិញពីអ្នកផ្គត់ផ្គង់
                </p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm self-start sm:self-auto"
            >
              <MdRefresh size={18} />
              ធ្វើឲ្យថ្មី
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">
                    ចំនួនវិក្កយបត្រសរុប
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">
                    {summary.count}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="text-xs text-green-600">
                      បានបង់: {summary.paidCount}
                    </span>
                    <span className="text-xs text-yellow-600">
                      បង់ខ្លះ: {summary.partialCount}
                    </span>
                    <span className="text-xs text-red-600">
                      មិនទាន់: {summary.unpaidCount}
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <MdReceipt className="text-teal-600 text-xl md:text-2xl" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">
                    ទឹកប្រាក់សរុប
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-blue-600">
                    {formatCurrency(summary.total)}
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FaDollarSign className="text-blue-600 text-xl md:text-2xl" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">
                    បានបង់ប្រាក់
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">
                    {formatCurrency(summary.paid)}
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MdCheckCircle className="text-green-600 text-xl md:text-2xl" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">
                    នៅសល់បង់
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-orange-600">
                    {formatCurrency(summary.unpaid)}
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <MdPending className="text-orange-600 text-xl md:text-2xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
            <div className="p-4 md:p-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="ស្វែងរកតាមលេខវិក្កយបត្រ ឈ្មោះអ្នកផ្គត់ផ្គង់ ឬ លេខទូរស័ព្ទ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm"
                  />
                </div>
                <div className="relative sm:w-64">
                  <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 appearance-none bg-white text-sm"
                  >
                    <option value="all">ស្ថានភាពទាំងអស់</option>
                    <option value="paid">បានបង់ប្រាក់</option>
                    <option value="partial">បានបង់ខ្លះ</option>
                    <option value="pending">មិនទាន់បង់</option>
                    <option value="cancelled">បានបោះបង់</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-sm">
                {/* HEADER */}
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left whitespace-nowrap font-semibold text-gray-700">
                      លេខវិក្កយបត្រ
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap font-semibold text-gray-700">
                      អ្នកផ្គត់ផ្គង់
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap font-semibold text-gray-700">
                      កាលបរិច្ឆេទ
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap font-semibold text-gray-700">
                      ថ្ងៃទូទាត់
                    </th>
                    <th className="px-4 py-3 text-right whitespace-nowrap font-semibold text-gray-700">
                      ទឹកប្រាក់សរុប
                    </th>
                    <th className="px-4 py-3 text-right whitespace-nowrap font-semibold text-gray-700">
                      បានបង់
                    </th>
                    <th className="px-4 py-3 text-right whitespace-nowrap font-semibold text-gray-700">
                      នៅសល់
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap font-semibold text-gray-700">
                      វិធីបង់ប្រាក់
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap font-semibold text-gray-700">
                      ឃ្លាំង
                    </th>
                    <th className="px-4 py-3 text-left whitespace-nowrap font-semibold text-gray-700">
                      ស្ថានភាព
                    </th>
                    <th className="px-4 py-3 text-center whitespace-nowrap font-semibold text-gray-700">
                      សកម្មភាព
                    </th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody className="divide-y divide-gray-100">
                  {filteredPurchases.map((purchase) => (
                    <tr
                      key={purchase.id}
                      className="hover:bg-gray-50 transition"
                    >
                      {/* CODE */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="font-medium text-gray-800">
                          {purchase.purchase_code || "—"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {purchase.items?.length || 0} មុខ
                        </p>
                      </td>

                      {/* SUPPLIER */}
                      <td className="px-4 py-3 max-w-[200px]">
                        <p className="truncate font-medium text-gray-800">
                          {purchase.supplier?.company_name_kh ||
                            purchase.supplier?.company_name_en ||
                            "—"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {purchase.supplier?.phone || "—"}
                        </p>
                      </td>

                      {/* DATES */}
                      <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                        {formatDate(purchase.purchase_date)}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                        {formatDate(purchase.expected_date)}
                      </td>

                      {/* MONEY */}
                      <td className="px-4 py-3 text-right whitespace-nowrap font-semibold">
                        {formatCurrency(purchase.grand_total)}
                      </td>

                      <td className="px-4 py-3 text-right whitespace-nowrap text-green-600 font-semibold">
                        {formatCurrency(purchase.paid_amount)}
                      </td>

                      <td className="px-4 py-3 text-right whitespace-nowrap text-orange-600 font-semibold">
                        {formatCurrency(
                          (parseFloat(purchase.grand_total) || 0) -
                            (parseFloat(purchase.paid_amount) || 0),
                        )}
                      </td>

                      {/* PAYMENT */}
                      <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                        {getPaymentMethodText(purchase.payment_method)}
                      </td>

                      {/* WAREHOUSE */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {purchase.warehouse?.name || "—"}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {getStatusBadge(purchase.payment_status)}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleViewDetails(purchase.id)}
                            className="p-1.5 hover:bg-blue-50 rounded transition-colors"
                            title="មើលព័ត៌មានលម្អិត"
                          >
                            <MdVisibility size={18} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handlePrint(purchase)}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                            title="បោះពុម្ព"
                          >
                            <MdPrint size={18} className="text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDownload(purchase)}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                            title="ទាញយក"
                          >
                            <MdDownload size={18} className="text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {filteredPurchases.length === 0 && (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdReceipt className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {searchTerm || statusFilter !== "all"
                  ? "មិនមានលទ្ធផល"
                  : "មិនមានទិន្នន័យវិក្កយបត្រទិញ"}
              </h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all"
                  ? "សូមប្តូរលក្ខណៈវិនិច្ឆ័យស្វែងរក"
                  : "មិនទាន់មានការបង្កើតវិក្កយបត្រទិញនៅឡើយទេ"}
              </p>
            </div>
          )}

          {filteredPurchases.length > 0 && (
            <div className="border-t border-gray-100 px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50">
              <div className="text-xs md:text-sm text-gray-500 order-2 sm:order-1">
                បង្ហាញ {filteredPurchases.length} ក្នុងចំណោម {purchases.length}{" "}
                វិក្កយបត្រ
              </div>
              <div className="flex gap-2 order-1 sm:order-2">
                <button
                  className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-white transition-colors disabled:opacity-50"
                  disabled
                >
                  មុន
                </button>
                <button className="px-3 py-1 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-colors">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-white transition-colors">
                  បន្ទាប់
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseInvoiceManagement;
