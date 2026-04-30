import React, { useState } from "react";
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

const PurchaseInvoiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock purchase invoice data (buying from suppliers)
  const invoices = [
    {
      id: "PINV-2024-0001",
      supplier_name: "សហគ្រាសផ្គត់ផ្គង់ ម៉េង អ៊ី",
      supplier_phone: "012 345 678",
      supplier_address: "ភ្នំពេញ, កម្ពុជា",
      invoice_date: "2024-01-15",
      due_date: "2024-02-15",
      total_amount: 1250.00,
      paid_amount: 1250.00,
      status: "paid",
      payment_method: "bank_transfer",
      items_count: 5,
      warehouse: "ឃ្លាំងកណ្តាល",
      created_by: "admin",
    },
    {
      id: "PINV-2024-0002",
      supplier_name: "ក្រុមហ៊ុន សុខា សុីឈើ",
      supplier_phone: "023 456 789",
      supplier_address: "សៀមរាប, កម្ពុជា",
      invoice_date: "2024-01-20",
      due_date: "2024-02-20",
      total_amount: 3400.00,
      paid_amount: 2000.00,
      status: "partial",
      payment_method: "cash",
      items_count: 8,
      warehouse: "ឃ្លាំងថ្នាំកម្តៅ",
      created_by: "admin",
    },
    {
      id: "PINV-2024-0003",
      supplier_name: "ផ្គត់ផ្គង់ វឌ្ឍនា",
      supplier_phone: "016 789 012",
      supplier_address: "កំពង់ចាម, កម្ពុជា",
      invoice_date: "2024-01-25",
      due_date: "2024-02-25",
      total_amount: 890.00,
      paid_amount: 0.00,
      status: "unpaid",
      payment_method: "credit",
      items_count: 3,
      warehouse: "ឃ្លាំងបម្រុង",
      created_by: "admin",
    },
    {
      id: "PINV-2024-0004",
      supplier_name: "ក្រុមហ៊ុន សំណាង ទ្រីឌីង",
      supplier_phone: "011 234 567",
      supplier_address: "បាត់ដំបង, កម្ពុជា",
      invoice_date: "2024-02-01",
      due_date: "2024-03-01",
      total_amount: 5670.00,
      paid_amount: 5670.00,
      status: "paid",
      payment_method: "bank_transfer",
      items_count: 12,
      warehouse: "ឃ្លាំងកណ្តាល",
      created_by: "admin",
    },
    {
      id: "PINV-2024-0005",
      supplier_name: "ផ្គត់ផ្គង់ សុខា",
      supplier_phone: "097 123 456",
      supplier_address: "ពោធិ៍សាត់, កម្ពុជា",
      invoice_date: "2024-02-05",
      due_date: "2024-03-05",
      total_amount: 2300.00,
      paid_amount: 1000.00,
      status: "partial",
      payment_method: "cash",
      items_count: 6,
      warehouse: "ឃ្លាំងថ្នាំកម្តៅ",
      created_by: "admin",
    },
    {
      id: "PINV-2024-0006",
      supplier_name: "មជ្ឈមណ្ឌលផ្គត់ផ្គង់ វីស្មាល",
      supplier_phone: "015 678 901",
      supplier_address: "កំពង់ស្ពឺ, កម្ពុជា",
      invoice_date: "2024-02-10",
      due_date: "2024-03-10",
      total_amount: 1890.00,
      paid_amount: 0.00,
      status: "cancelled",
      payment_method: "credit",
      items_count: 4,
      warehouse: "ឃ្លាំងបម្រុង",
      created_by: "admin",
    },
    {
      id: "PINV-2024-0007",
      supplier_name: "ក្រុមហ៊ុន អាស៊ី ផ្គត់ផ្គង់",
      supplier_phone: "098 765 432",
      supplier_address: "តាកែវ, កម្ពុជា",
      invoice_date: "2024-02-15",
      due_date: "2024-03-15",
      total_amount: 4250.00,
      paid_amount: 2000.00,
      status: "partial",
      payment_method: "bank_transfer",
      items_count: 9,
      warehouse: "ឃ្លាំងកណ្តាល",
      created_by: "admin",
    },
    {
      id: "PINV-2024-0008",
      supplier_name: "ផ្គត់ផ្គង់ មករា",
      supplier_phone: "012 987 654",
      supplier_address: "កោះកុង, កម្ពុជា",
      invoice_date: "2024-02-20",
      due_date: "2024-03-20",
      total_amount: 3100.00,
      paid_amount: 3100.00,
      status: "paid",
      payment_method: "cash",
      items_count: 7,
      warehouse: "ឃ្លាំងថ្នាំកម្តៅ",
      created_by: "admin",
    },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
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
      case "unpaid":
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
        return null;
    }
  };

  const getPaymentMethodText = (method) => {
    switch(method) {
      case "cash":
        return "សាច់ប្រាក់";
      case "bank_transfer":
        return "ផ្ទេរធនាគារ";
      case "credit":
        return "បង់រំលស់";
      default:
        return method;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.supplier_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.supplier_phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate summary statistics
  const summary = {
    total: invoices.reduce((sum, inv) => sum + inv.total_amount, 0),
    paid: invoices.reduce((sum, inv) => sum + inv.paid_amount, 0),
    unpaid: invoices.reduce((sum, inv) => sum + (inv.total_amount - inv.paid_amount), 0),
    count: invoices.length,
    paidCount: invoices.filter(inv => inv.status === "paid").length,
    partialCount: invoices.filter(inv => inv.status === "partial").length,
    unpaidCount: invoices.filter(inv => inv.status === "unpaid").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
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
            <button className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm self-start sm:self-auto">
              <MdRefresh size={18} />
              ធ្វើឲ្យថ្មី
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="max-w-full mx-auto">
          {/* Stats Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">ចំនួនវិក្កយបត្រសរុប</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">{summary.count}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="text-xs text-green-600">បានបង់: {summary.paidCount}</span>
                    <span className="text-xs text-yellow-600">បង់ខ្លះ: {summary.partialCount}</span>
                    <span className="text-xs text-red-600">មិនទាន់: {summary.unpaidCount}</span>
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
                  <p className="text-gray-500 text-xs md:text-sm mb-1">ទឹកប្រាក់សរុប</p>
                  <p className="text-xl md:text-2xl font-bold text-blue-600">{formatCurrency(summary.total)}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FaDollarSign className="text-blue-600 text-xl md:text-2xl" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">បានបង់ប្រាក់</p>
                  <p className="text-xl md:text-2xl font-bold text-green-600">{formatCurrency(summary.paid)}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MdCheckCircle className="text-green-600 text-xl md:text-2xl" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs md:text-sm mb-1">នៅសល់បង់</p>
                  <p className="text-xl md:text-2xl font-bold text-orange-600">{formatCurrency(summary.unpaid)}</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <MdPending className="text-orange-600 text-xl md:text-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters - Responsive */}
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
                    <option value="unpaid">មិនទាន់បង់</option>
                    <option value="cancelled">បានបោះបង់</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Invoices Table - Responsive with Horizontal Scroll */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px] lg:min-w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">លេខវិក្កយបត្រ</th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">អ្នកផ្គត់ផ្គង់</th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">កាលបរិច្ឆេទ</th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">ថ្ងៃទូទាត់</th>
                    <th className="px-4 py-3 text-right text-xs md:text-sm font-semibold text-gray-700">ទឹកប្រាក់សរុប</th>
                    <th className="px-4 py-3 text-right text-xs md:text-sm font-semibold text-gray-700">បានបង់</th>
                    <th className="px-4 py-3 text-right text-xs md:text-sm font-semibold text-gray-700">នៅសល់</th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">វិធីបង់ប្រាក់</th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">ឃ្លាំង</th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-gray-700">ស្ថានភាព</th>
                    <th className="px-4 py-3 text-center text-xs md:text-sm font-semibold text-gray-700">សកម្មភាព</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{invoice.id}</p>
                          <p className="text-xs text-gray-500">{invoice.items_count} មុខ</p>
                        </div>
                       </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm text-gray-800 font-medium">{invoice.supplier_name}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <MdPhone size={11} />
                            {invoice.supplier_phone}
                          </p>
                        </div>
                       </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{invoice.invoice_date}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{invoice.due_date}</td>
                      <td className="px-4 py-3 text-right text-sm font-semibold text-gray-800">
                        {formatCurrency(invoice.total_amount)}
                       </td>
                      <td className="px-4 py-3 text-right text-sm text-green-600 font-semibold">
                        {formatCurrency(invoice.paid_amount)}
                       </td>
                      <td className="px-4 py-3 text-right text-sm text-orange-600 font-semibold">
                        {formatCurrency(invoice.total_amount - invoice.paid_amount)}
                       </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {getPaymentMethodText(invoice.payment_method)}
                       </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                          <FaBoxes size={10} />
                          {invoice.warehouse}
                        </span>
                       </td>
                      <td className="px-4 py-3">{getStatusBadge(invoice.status)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 justify-center">
                          <button
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="មើលព័ត៌មានលម្អិត"
                          >
                            <MdVisibility size={16} />
                          </button>
                          <button
                            className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                            title="កែប្រែ"
                          >
                            <MdEdit size={16} />
                          </button>
                          <button
                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="បោះពុម្ព"
                          >
                            <MdPrint size={16} />
                          </button>
                          <button
                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="ទាញយក"
                          >
                            <MdDownload size={16} />
                          </button>
                        </div>
                       </td>
                     </tr>
                  ))}
                </tbody>
               </table>
            </div>

            {/* Empty State */}
            {filteredInvoices.length === 0 && (
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

            {/* Pagination */}
            {filteredInvoices.length > 0 && (
              <div className="border-t border-gray-100 px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50">
                <div className="text-xs md:text-sm text-gray-500 order-2 sm:order-1">
                  បង្ហាញ {filteredInvoices.length} ក្នុងចំណោម {invoices.length} វិក្កយបត្រ
                </div>
                <div className="flex gap-2 order-1 sm:order-2">
                  <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-white transition-colors disabled:opacity-50" disabled>
                    មុន
                  </button>
                  <button className="px-3 py-1 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700 transition-colors">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-white transition-colors">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-white transition-colors">
                    3
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
    </div>
  );
};

export default PurchaseInvoiceManagement;