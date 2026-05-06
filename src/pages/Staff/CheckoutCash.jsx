// src/pages/Staff/CheckoutCash.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { createOrder, getCustomerByPhone } from "../../services/auth";

const CheckoutCash = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total, subtotal, cart } = location.state || { total: 0, subtotal: 0, cart: [] };
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [cashReceived, setCashReceived] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Discount states
  const [discountRate, setDiscountRate] = useState(0);
  const [customerTier, setCustomerTier] = useState("");
  const [isCheckingCustomer, setIsCheckingCustomer] = useState(false);
  
  // Calculate discount
  const discountAmount = (total * discountRate) / 100;
  const finalTotal = total - discountAmount;
  const change = cashReceived ? parseFloat(cashReceived) - finalTotal : 0;

  // Search customer by phone
  const searchCustomer = async (phone) => {
    if (!phone || phone.length < 6) {
      setDiscountRate(0);
      setCustomerTier("");
      setCustomerName("");
      return;
    }
    
    setIsCheckingCustomer(true);
    try {
      const response = await getCustomerByPhone(phone);
      const data = response?.data || response;
      
      if (data.exists) {
        setCustomerName(data.name || "");
        setDiscountRate(data.discount_rate);
        setCustomerTier(data.tier);
      } else {
        setDiscountRate(0);
        setCustomerTier("");
      }
    } catch (error) {
      console.error("Error checking customer:", error);
      setDiscountRate(0);
    } finally {
      setIsCheckingCustomer(false);
    }
  };

  // Auto search when phone changes
  useEffect(() => {
    const delay = setTimeout(() => {
      if (customerPhone) {
        searchCustomer(customerPhone);
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [customerPhone]);

  const handleSubmit = async () => {
    if (!customerPhone) {
      alert("សូមបញ្ចូលលេខទូរស័ព្ទ!");
      return;
    }

    if (!cashReceived || parseFloat(cashReceived) < finalTotal) {
      alert("ទឹកប្រាក់មិនគ្រប់!");
      return;
    }

    setIsProcessing(true);

    const orderItems = cart.map(item => ({
      product_id: item.id,
      product_name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: item.total
    }));

    const orderData = {
      payment_method: "cash",
      customer_name: customerName || null,
      customer_phone: customerPhone || null,
      cash_received: parseFloat(cashReceived),
      change_amount: change >= 0 ? change : 0,
      subtotal: total,
      discount: discountAmount,
      discount_percent: discountRate,
      total: finalTotal,
      items: orderItems
    };

    try {
      const response = await createOrder(orderData);
      if (response?.data?.order_id || response.status === 200) {
        navigate("/staff/check", { 
          state: { 
            orderSuccess: true, 
            total: finalTotal, 
            originalTotal: total,
            discount: discountAmount,
            discountRate: discountRate,
            change: change,
            paymentMethod: "cash",
            cart: cart,
            customerName: customerName,
            customerPhone: customerPhone
          } 
        });
      } else {
        alert(response?.message || "មានបញ្ហា!");
      }
    } catch (error) {
      alert(error.response?.data?.message || "មានបញ្ហា!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl grid grid-cols-2 overflow-hidden">
        {/* LEFT */}
        <div className="bg-gray-50 p-6">
          <h2 className="text-center font-bold text-teal-600 text-2xl">
            ទូទាត់ជាសាច់ប្រាក់
          </h2>

          {/* Customer Info Section */}
          <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
            <label className="text-xs text-gray-400">លេខទូរស័ព្ទ *</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg bg-gray-100 outline-none"
              placeholder="បញ្ចូលលេខទូរស័ព្ទ"
            />
            {isCheckingCustomer && (
              <p className="text-xs text-gray-400 mt-1">កំពុងស្វែងរក...</p>
            )}
            {customerTier && !isCheckingCustomer && (
              <p className="text-xs text-green-600 mt-1">
                {customerTier} - បញ្ចុះតម្លៃ {discountRate}%
              </p>
            )}

            <label className="text-xs text-gray-400 mt-3 block">ឈ្មោះអតិថិជន</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg bg-gray-100 outline-none"
              placeholder="បញ្ចូលឈ្មោះ"
            />

            {/* Discount Display */}
            {discountRate > 0 && (
              <div className="mt-3 p-2 bg-green-50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>តម្លៃដើម:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-red-500">
                  <span>បញ្ចុះតម្លៃ ({discountRate}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-1 border-t">
                  <span>សរុបត្រូវបង់:</span>
                  <span className="text-teal-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            )}

            <label className="text-xs text-gray-400 mt-3 block">បញ្ចូលប្រាក់ដែលទទួលបាន</label>
            <input
              type="number"
              step="0.01"
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
              className="w-full mt-2 p-3 rounded-lg bg-gray-100 outline-none text-lg font-semibold"
            />

            <div className="flex justify-between mt-3 text-sm">
              <span className="text-gray-400">ប្រាក់អាប់</span>
              <span className="text-teal-600 font-bold">
                ${change > 0 ? change.toFixed(2) : "0.00"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center justify-center p-10 text-center bg-gradient-to-br from-teal-50 to-white">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
            <FiCheck size={28} />
          </div>
          <h1 className="text-2xl font-bold">បញ្ជាក់ការបង់ប្រាក់</h1>
          <p className="text-gray-400 text-sm mt-2">សូមពិនិត្យមើលព័ត៌មានមុនពេលបញ្ជាក់</p>

          <div className="mt-6 bg-gray-50 rounded-xl p-5 w-full">
            <div className="flex justify-between text-sm">
              <span>សរុប</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>ទទួលបាន</span>
              <span>${cashReceived ? parseFloat(cashReceived).toFixed(2) : "0.00"}</span>
            </div>
            <div className="flex justify-between text-sm mt-2 pt-2 border-t">
              <span>ប្រាក់អាប់</span>
              <span className="text-teal-600 font-bold">
                ${change > 0 ? change.toFixed(2) : "0.00"}
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isProcessing || !customerPhone || !cashReceived}
            className="mt-6 w-full bg-teal-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? "កំពុងដំណើរការ..." : "បញ្ចប់ការលក់"} <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCash;