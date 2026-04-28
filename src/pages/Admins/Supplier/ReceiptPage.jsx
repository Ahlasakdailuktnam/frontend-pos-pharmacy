import React, { useState, useRef } from "react";
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
} from "react-icons/md";
import { FaBoxes, FaTruck, FaMoneyBillWave, FaStore } from "react-icons/fa";

const ReceiptPage = () => {
  const [showPrintSuccess, setShowPrintSuccess] = useState(false);
  const receiptRef = useRef(null);

  // Sample receipt data (would come from API/state)
  const [receipt] = useState({
    receiptNumber: "REC-2024-0042",
    purchaseOrderId: "PO-2024-0123",
    supplierName: "សហគ្រាសឱសថកម្ពុជា",
    supplierPhone: "023 456 789",
    supplierAddress: "ផ្លូវលេខ ២១៧, សង្កាត់ទឹកថ្លា, ខណ្ឌទួលគោក, ភ្នំពេញ",
    receivedDate: "2024-01-15",
    receivedBy: "សុខា ច័ន្ទ",
    paymentMethod: "សាច់ប្រាក់",
    paymentStatus: "បានបង់រួច",
    notes: "ទំនិញគុណភាពល្អ ដឹកជញ្ជូនទាន់ពេល",
    qualityCheck: "ឆ្លងកាត់",
    items: [
      {
        id: 1,
        productName: "ប៉ារ៉ាសេតាម៉ុល 500mg",
        barcode: "8901234567890",
        quantity: 100,
        unitPrice: 0.25,
        discount: 5,
        tax: 0,
        total: 23.75,
      },
      {
        id: 2,
        productName: "អាម៉ុកស៊ីស៊ីលីន 250mg",
        barcode: "8901234567891",
        quantity: 50,
        unitPrice: 0.45,
        discount: 0,
        tax: 10,
        total: 24.75,
      },
      {
        id: 3,
        productName: "វីតាមីន C 1000mg",
        barcode: "8901234567892",
        quantity: 200,
        unitPrice: 0.15,
        discount: 10,
        tax: 0,
        total: 27.00,
      },
      {
        id: 4,
        productName: "ថ្នាំបំបាត់ការឈឺចាប់",
        barcode: "8901234567893",
        quantity: 75,
        unitPrice: 0.30,
        discount: 0,
        tax: 5,
        total: 23.625,
      },
    ],
  });

  // Calculate totals
  const calculateSubtotal = () => {
    return receipt.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toFixed(2);
  };

  const calculateTotalDiscount = () => {
    return receipt.items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      const discountAmount = (subtotal * item.discount) / 100;
      return sum + discountAmount;
    }, 0).toFixed(2);
  };

  const calculateTotalTax = () => {
    return receipt.items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      const discountAmount = (subtotal * item.discount) / 100;
      const taxAmount = ((subtotal - discountAmount) * item.tax) / 100;
      return sum + taxAmount;
    }, 0).toFixed(2);
  };

  const calculateGrandTotal = () => {
    return receipt.items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  // Handle print
  const handlePrint = () => {
    const printContent = receiptRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
    
    setShowPrintSuccess(true);
    setTimeout(() => setShowPrintSuccess(false), 3000);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('km-KH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-md">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
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
        {/* Print Success Message */}
        {showPrintSuccess && (
          <div className="fixed top-24 right-6 z-50 animate-slide-in">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 shadow-lg">
              <MdCheckCircle className="text-green-600 text-2xl" />
              <div>
                <p className="font-semibold text-green-800">បោះពុម្ពជោគជ័យ!</p>
                <p className="text-sm text-green-600">បង្កាន់ដៃកំពុងបោះពុម្ព</p>
              </div>
            </div>
          </div>
        )}

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
                <p className="text-sm">លេខបង្កាន់ដៃ: <span className="font-mono font-bold">{receipt.receiptNumber}</span></p>
                <p className="text-sm">លេខលំដាប់ទិញ: {receipt.purchaseOrderId}</p>
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
                      <p className="font-semibold text-gray-800 text-lg">{receipt.supplierName}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <MdPhone size={14} />
                        <span>{receipt.supplierPhone}</span>
                      </div>
                      <div className="flex items-start gap-2 mt-1 text-sm text-gray-600">
                        <MdLocationOn size={14} className="mt-0.5" />
                        <span>{receipt.supplierAddress}</span>
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
                          <p className="text-sm font-medium">{formatDate(receipt.receivedDate)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">អ្នកទទួល</p>
                          <p className="text-sm font-medium">{receipt.receivedBy}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">វិធីទូទាត់</p>
                          <p className="text-sm font-medium">{receipt.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">ស្ថានភាព</p>
                          <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            {receipt.paymentStatus}
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
                    {receipt.items.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-2 text-sm text-gray-500">{index + 1}</td>
                        <td className="py-3 px-2">
                          <p className="font-medium text-gray-800">{item.productName}</p>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-xs font-mono text-gray-500">{item.barcode}</span>
                        </td>
                        <td className="py-3 px-2 text-right text-sm font-medium">{item.quantity}</td>
                        <td className="py-3 px-2 text-right text-sm">${item.unitPrice.toFixed(2)}</td>
                        <td className="py-3 px-2 text-right text-sm text-orange-600">{item.discount}%</td>
                        <td className="py-3 px-2 text-right text-sm text-blue-600">{item.tax}%</td>
                        <td className="py-3 px-2 text-right font-semibold text-teal-600">${item.total.toFixed(2)}</td>
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
                        <span className="font-medium">${calculateSubtotal()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-t border-gray-200">
                        <span className="text-gray-600">បញ្ចុះតម្លៃសរុប:</span>
                        <span className="text-orange-600">- ${calculateTotalDiscount()}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">ពន្ធសរុប:</span>
                        <span className="text-blue-600">+ ${calculateTotalTax()}</span>
                      </div>
                      <div className="flex justify-between py-3 border-t-2 border-gray-300">
                        <span className="text-lg font-bold text-gray-800">សរុបទាំងអស់:</span>
                        <span className="text-2xl font-bold text-teal-600">${calculateGrandTotal()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes & QR Code */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                  <div className="flex items-start gap-2">
                    <div className="text-yellow-600 mt-0.5">
                      <MdReceipt size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-yellow-800 mb-1">កំណត់ចំណាំ</p>
                      <p className="text-sm text-yellow-700">{receipt.notes}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex items-center justify-between">
                  <div className="flex items-start gap-2">
                    <div className="text-green-600 mt-0.5">
                      <MdCheckCircle size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-800 mb-1">ការត្រួតពិនិត្យគុណភាព</p>
                      <p className="text-sm text-green-700">
                        {receipt.qualityCheck === "ឆ្លងកាត់" ? "✓ ទំនិញឆ្លងកាត់ការត្រួតពិនិត្យ" : "⚠ ទំនិញត្រូវការត្រួតពិនិត្យបន្ថែម"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <MdQrCodeScanner size={60} className="text-gray-600" />
                    <p className="text-xs text-gray-500 mt-1">ស្កេន QR</p>
                  </div>
                </div>
              </div>

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
            <button className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium">
              ត្រឡប់ក្រោយ
            </button>
            <button className="px-8 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-medium shadow-md">
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

        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ReceiptPage;