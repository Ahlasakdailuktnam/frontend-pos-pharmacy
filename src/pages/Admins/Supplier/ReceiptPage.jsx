import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdPrint,
  MdDownload,
  MdShare,
  MdCheckCircle,
  MdLocalShipping,
  MdPayment,
  MdCalendarToday,
  MdPerson,
  MdPhone,
  MdLocationOn,
  MdReceipt,
  MdQrCodeScanner,
  MdPending,
  MdCancel,
} from "react-icons/md";
import { FaBoxes, FaTruck, FaMoneyBillWave, FaStore } from "react-icons/fa";
import usePurchaseDetail from "../../../hook/purchase/usePurchaseDetail";

const ReceiptPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { purchase, loading } = usePurchaseDetail(id);
  const receiptRef = useRef(null);

  const getPaymentStatusText = (status) => {
    switch(status) {
      case "paid":
        return { text: "បានបង់រួច", color: "green" };
      case "partial":
        return { text: "បានបង់ខ្លះ", color: "yellow" };
      case "pending":
        return { text: "មិនទាន់បង់", color: "red" };
      default:
        return { text: status || "—", color: "gray" };
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
        return method || "—";
    }
  };

  const formatCurrency = (amount) => {
    const numAmount = parseFloat(amount) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(numAmount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString('km-KH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateSubtotal = () => {
    if (!purchase?.items) return 0;
    return purchase.items.reduce((sum, item) => sum + (item.qty * item.unit_cost), 0);
  };

  const calculateTotalDiscount = () => {
    if (!purchase?.items) return 0;
    return purchase.items.reduce((sum, item) => {
      const subtotal = item.qty * item.unit_cost;
      const discountAmount = (subtotal * (item.discount_percent || 0)) / 100;
      return sum + discountAmount;
    }, 0);
  };

  const calculateTotalTax = () => {
    if (!purchase?.items) return 0;
    return purchase.items.reduce((sum, item) => {
      const subtotal = item.qty * item.unit_cost;
      const discountAmount = (subtotal * (item.discount_percent || 0)) / 100;
      const taxAmount = ((subtotal - discountAmount) * (item.tax_percent || 0)) / 100;
      return sum + taxAmount;
    }, 0);
  };

  const handlePrint = () => {
    const printContent = receiptRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const handleBack = () => {
    navigate('/purchase-invoices');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">កំពុងផ្ទុកទិន្នន័យ...</p>
        </div>
      </div>
    );
  }

  if (!purchase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdCancel className="text-red-600 text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">មិនមានទិន្នន័យ</h3>
          <p className="text-gray-500">មិនឃើញមានព័ត៌មានបង្កាន់ដៃទេ</p>
          <button
            onClick={handleBack}
            className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
          >
            ត្រឡប់ក្រោយ
          </button>
        </div>
      </div>
    );
  }

  const paymentStatus = getPaymentStatusText(purchase.payment_status);
  const remainingAmount = (parseFloat(purchase.grand_total) || 0) - (parseFloat(purchase.paid_amount) || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-md">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <MdArrowBack size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <MdReceipt className="text-teal-600" />
                  បង្កាន់ដៃទទួលទំនិញ
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  ព័ត៌មានលម្អិតនៃការទទួលទំនិញពីអ្នកផ្គត់ផ្គង់
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all flex items-center gap-2 shadow-sm"
              >
                <MdPrint size={18} /> បោះពុម្ព
              </button>
              <button className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2">
                <MdDownload size={18} /> ទាញយក PDF
              </button>
              <button className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2">
                <MdShare size={18} /> ចែករំលែក
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Receipt Content */}
        <div ref={receiptRef} className="max-w-5xl mx-auto">
          {/* Main Receipt Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header with Logo */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-8 text-center">
              <div className="inline-block bg-white/20 rounded-full p-4 mb-4">
                <FaStore className="text-4xl" />
              </div>
              <h2 className="text-3xl font-bold">បង្កាន់ដៃទទួលទំនិញ</h2>
              <p className="text-teal-100 mt-2">ឱសថស្ថាន មិត្តភាព</p>
              <div className="mt-4 pt-4 border-t border-teal-500 inline-block">
                <p className="text-sm">លេខបង្កាន់ដៃ: <span className="font-mono font-bold">{purchase.purchase_code || purchase.invoice_number || "—"}</span></p>
                <p className="text-sm">លេខវិក្កយបត្រ: {purchase.invoice_number || "—"}</p>
              </div>
            </div>

            {/* Supplier & Receipt Info */}
            <div className="p-8 border-b border-gray-100">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-teal-50 rounded-lg">
                      <FaTruck className="text-teal-600" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">អ្នកផ្គត់ផ្គង់</p>
                      <p className="font-semibold text-gray-800 text-lg">
                        {purchase.supplier?.company_name_kh || purchase.supplier?.company_name_en || "—"}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <MdPhone size={14} />
                        <span>{purchase.supplier?.phone || "—"}</span>
                      </div>
                      <div className="flex items-start gap-2 mt-1 text-sm text-gray-600">
                        <MdLocationOn size={14} className="mt-0.5" />
                        <span>{purchase.supplier?.address || "—"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-teal-50 rounded-lg">
                      <MdReceipt className="text-teal-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">ព័ត៌មានទទួល</p>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div>
                          <p className="text-xs text-gray-500">ថ្ងៃទទួល</p>
                          <p className="text-sm font-medium">{formatDate(purchase.purchase_date)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">ថ្ងៃកំណត់</p>
                          <p className="text-sm font-medium">{formatDate(purchase.expected_date)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">វិធីទូទាត់</p>
                          <p className="text-sm font-medium">{getPaymentMethodText(purchase.payment_method)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">ស្ថានភាព</p>
                          <span className={`inline-block px-2 py-1 bg-${paymentStatus.color}-100 text-${paymentStatus.color}-700 rounded-full text-xs font-medium`}>
                            {paymentStatus.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaBoxes className="text-teal-600" />
                បញ្ជីទំនិញ
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">លេខ</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">ឈ្មោះផលិតផល</th>
                      <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">Barcode</th>
                      <th className="text-right py-3 px-2 text-sm font-semibold text-gray-600">បរិមាណ</th>
                      <th className="text-right py-3 px-2 text-sm font-semibold text-gray-600">តម្លៃដើម</th>
                      <th className="text-right py-3 px-2 text-sm font-semibold text-gray-600">បញ្ចុះតម្លៃ</th>
                      <th className="text-right py-3 px-2 text-sm font-semibold text-gray-600">ពន្ធ</th>
                      <th className="text-right py-3 px-2 text-sm font-semibold text-gray-600">សរុប</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchase.items?.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-2 text-sm text-gray-500">{index + 1}</td>
                        <td className="py-3 px-2">
                          <p className="font-medium text-gray-800">{item.product?.name || "—"}</p>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-xs font-mono text-gray-500">{item.product?.barcode || "—"}</span>
                        </td>
                        <td className="py-3 px-2 text-right text-sm font-medium">{item.qty}</td>
                        <td className="py-3 px-2 text-right text-sm">{formatCurrency(item.unit_cost)}</td>
                        <td className="py-3 px-2 text-right text-sm text-orange-600">{item.discount_percent || 0}%</td>
                        <td className="py-3 px-2 text-right text-sm text-blue-600">{item.tax_percent || 0}%</td>
                        <td className="py-3 px-2 text-right font-semibold text-teal-600">{formatCurrency(item.line_total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Section */}
              <div className="mt-8">
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6">
                  <div className="flex justify-end">
                    <div className="w-full md:w-80 space-y-3">
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">ទំហំទឹកប្រាក់សរុប:</span>
                        <span className="font-medium">{formatCurrency(calculateSubtotal())}</span>
                      </div>
                      <div className="flex justify-between py-2 border-t border-gray-200">
                        <span className="text-gray-600">បញ្ចុះតម្លៃសរុប:</span>
                        <span className="text-orange-600">- {formatCurrency(calculateTotalDiscount())}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">ពន្ធសរុប:</span>
                        <span className="text-blue-600">+ {formatCurrency(calculateTotalTax())}</span>
                      </div>
                      <div className="flex justify-between py-3 border-t-2 border-gray-300">
                        <span className="text-lg font-bold text-gray-800">សរុបទាំងអស់:</span>
                        <span className="text-2xl font-bold text-teal-600">{formatCurrency(purchase.grand_total)}</span>
                      </div>
                      {purchase.payment_status !== "paid" && (
                        <div className="flex justify-between py-2 border-t border-gray-200">
                          <span className="text-gray-600">នៅសល់បង់:</span>
                          <span className="text-lg font-bold text-orange-600">{formatCurrency(remainingAmount)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {purchase.note && (
                <div className="mt-8 bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                  <div className="flex items-start gap-2">
                    <div className="text-yellow-600 mt-0.5">
                      <MdReceipt size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-yellow-800 mb-1">កំណត់ចំណាំ</p>
                      <p className="text-sm text-yellow-700">{purchase.note}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-400">
                  បង្កាន់ដៃនេះត្រូវបានបង្កើតដោយប្រព័ន្ធគ្រប់គ្រងឱសថស្ថាន | អរគុណសម្រាប់ការជឿទុកចិត្ត
                </p>
                <div className="flex justify-center gap-4 mt-3">
                  <span className="text-xs text-gray-400">ទូរស័ព្ទ: 023 999 999</span>
                  <span className="text-xs text-gray-400">អ៊ីមែល: info@pharmacy.com</span>
                  <span className="text-xs text-gray-400">គេហទំព័រ: www.pharmacy.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Bottom */}
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={handleBack}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
            >
              ត្រឡប់ក្រោយ
            </button>
            <button 
              onClick={() => navigate('/add-purchase')}
              className="px-8 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-medium shadow-md"
            >
              បង្កើតបង្កាន់ដៃថ្មី
            </button>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .receipt-content, .receipt-content * {
            visibility: visible;
          }
          .receipt-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          button {
            display: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ReceiptPage;