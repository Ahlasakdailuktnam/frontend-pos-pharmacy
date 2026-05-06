// src/pages/Staff/InvoiceHistory.jsx
import React, { useState } from "react";
import { useTodaySales } from "../../hook/order/useSales";
import { 
  MdReceipt, 
  MdAttachMoney, 
  MdShoppingBag, 
  MdLocalOffer,
  MdPrint,
  MdVisibility,
  MdClose
} from "react-icons/md";
import { FaMoneyBillWave, FaCreditCard, FaQrcode } from "react-icons/fa";

const InvoiceHistory = () => {
  const { orders, summary, loading, fetchSales } = useTodaySales();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const formatPrice = (price) => {
    const numPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
    return numPrice.toFixed(2);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-CA", {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'cash': return <FaMoneyBillWave className="text-green-600" />;
      case 'card': return <FaCreditCard className="text-blue-600" />;
      case 'qr': return <FaQrcode className="text-purple-600" />;
      default: return <MdReceipt />;
    }
  };

  const getPaymentText = (method) => {
    switch (method) {
      case 'cash': return 'សាច់ប្រាក់';
      case 'card': return 'ប័ណ្ណឥណទាន';
      case 'qr': return 'ស្កេន QR';
      default: return method;
    }
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
          <div>
            <h1 className="text-2xl font-bold text-gray-800">ប្រវត្តិការលក់</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              បង្ហាញការលក់ទាំងអស់ក្នុងថ្ងៃនេះ ({new Date().toLocaleDateString('en-CA')})
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">ការបញ្ជាទិញសរុប</p>
                <p className="text-2xl font-bold text-gray-800">{summary.total_orders}</p>
              </div>
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                <MdReceipt className="text-teal-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">ចំណូលសរុប</p>
                <p className="text-2xl font-bold text-teal-600">${formatPrice(summary.total_sales)}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <MdAttachMoney className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">ផលិតផលសរុប</p>
                <p className="text-2xl font-bold text-gray-800">{summary.total_items}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <MdShoppingBag className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">បញ្ចុះតម្លៃសរុប</p>
                <p className="text-2xl font-bold text-red-600">${formatPrice(summary.total_discount)}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <MdLocalOffer className="text-red-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-sm font-semibold text-gray-600">
                  <th className="px-6 py-4">លេខវិក្កយបត្រ</th>
                  <th className="px-6 py-4">អតិថិជន</th>
                  <th className="px-6 py-4">កាលបរិច្ឆេទ</th>
                  <th className="px-6 py-4 text-right">សរុប</th>
                  <th className="px-6 py-4 text-center">វិធីបង់ប្រាក់</th>
                  <th className="px-6 py-4 text-center">សកម្មភាព</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium text-gray-800">
                        {order.order_number}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-gray-800">{order.customer_name || "មិនមាន"}</p>
                        <p className="text-xs text-gray-400">{order.customer_phone || "—"}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(order.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-teal-600">${formatPrice(order.total)}</span>
                      {order.discount > 0 && (
                        <p className="text-xs text-red-500">បញ្ចុះ {formatPrice(order.discount)}</p>
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
                      >
                        <MdVisibility size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdReceipt className="text-4xl text-gray-400" />
              </div>
              <p className="text-gray-500">មិនមានការលក់ក្នុងថ្ងៃនេះទេ</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {showDetail && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetail(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold">ព័ត៌មានលម្អិតវិក្កយបត្រ</h2>
              <button onClick={() => setShowDetail(false)} className="text-gray-400 hover:text-gray-600">
                <MdClose size={24} />
              </button>
            </div>
            <div className="p-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4 mb-6 pb-4 border-b">
                <div>
                  <p className="text-xs text-gray-400">លេខវិក្កយបត្រ</p>
                  <p className="font-mono font-medium">{selectedOrder.order_number}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">កាលបរិច្ឆេទ</p>
                  <p className="font-medium">{formatDate(selectedOrder.created_at)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">អតិថិជន</p>
                  <p className="font-medium">{selectedOrder.customer_name || "មិនមាន"}</p>
                  <p className="text-xs text-gray-400">{selectedOrder.customer_phone || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">វិធីបង់ប្រាក់</p>
                  <p className="font-medium">{getPaymentText(selectedOrder.payment_method)}</p>
                </div>
              </div>

              {/* Items Table */}
              <h3 className="font-semibold mb-3">ទំនិញដែលបានទិញ</h3>
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
                        <td className="px-4 py-2">{item.product_name}</td>
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

              {/* Print Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg flex items-center gap-2 hover:bg-teal-700"
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

export default InvoiceHistory;