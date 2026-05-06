// src/pages/Staff/CheckoutCard.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheck, FiArrowRight, FiCreditCard } from "react-icons/fi";
import { createOrder, getCustomerByPhone } from "../../services/auth";

const CheckoutCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total, subtotal, cart } = location.state || { total: 0, subtotal: 0, cart: [] };
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Discount states
  const [discountRate, setDiscountRate] = useState(0);
  const [customerTier, setCustomerTier] = useState("");
  const [isCheckingCustomer, setIsCheckingCustomer] = useState(false);
  
  const discountAmount = (total * discountRate) / 100;
  const finalTotal = total - discountAmount;

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

    if (!bankName || !accountNumber) {
      alert("សូមបញ្ចូលព័ត៌មានធនាគារ!");
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
      payment_method: "card",
      customer_name: customerName || null,
      customer_phone: customerPhone || null,
      bank_name: bankName,
      payment_phone: accountNumber,
      reference_no: referenceNo,
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
            paymentMethod: "card",
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
          <div className="flex items-center gap-3 mb-6">
            <FiCreditCard className="text-2xl text-teal-500" />
            <h2 className="text-xl font-bold text-gray-800">ទូទាត់តាមប័ណ្ណឥណទាន</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500">លេខទូរស័ព្ទ *</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="បញ្ចូលលេខទូរស័ព្ទ"
              />
              {isCheckingCustomer && <p className="text-xs text-gray-400 mt-1">កំពុងស្វែងរក...</p>}
              {customerTier && !isCheckingCustomer && (
                <p className="text-xs text-green-600 mt-1">{customerTier} - បញ្ចុះតម្លៃ {discountRate}%</p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-500">ឈ្មោះអតិថិជន</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg bg-white border border-gray-200 outline-none"
              />
            </div>

            {discountRate > 0 && (
              <div className="bg-green-50 rounded-lg p-3">
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

            <div>
              <label className="text-xs text-gray-500">ឈ្មោះធនាគារ</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="ABA / ACLEDA / WING..."
                className="w-full mt-1 p-3 rounded-lg bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">លេខគណនី / លេខកាត</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg bg-white border border-gray-200 outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">លេខយោង (ស្រេចចិត្ត)</label>
              <input
                type="text"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
                className="w-full mt-1 p-3 rounded-lg bg-white border border-gray-200 outline-none"
              />
            </div>

            {!discountRate && (
              <div className="bg-teal-50 rounded-lg p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ទឹកប្រាក់សរុប</span>
                  <span className="font-bold text-teal-500">${total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center justify-center p-10 text-center bg-gradient-to-br from-teal-50 to-white">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-teal-100 text-teal-500 mb-4">
            <FiCreditCard size={28} />
          </div>
          <h1 className="text-2xl font-bold">បញ្ជាក់ការបង់ប្រាក់</h1>
          <p className="text-gray-400 text-sm mt-2">សូមពិនិត្យមើលព័ត៌មានមុនពេលបញ្ជាក់</p>

          <div className="mt-6 bg-white rounded-xl p-5 w-full shadow-sm">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">ធនាគារ</span>
              <span className="font-medium">{bankName || "—"}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">លេខគណនី</span>
              <span className="font-medium">{accountNumber ? "•••• " + accountNumber.slice(-4) : "—"}</span>
            </div>
            <div className="flex justify-between text-sm mt-2 pt-2 border-t">
              <span className="text-gray-500">ទឹកប្រាក់</span>
              <span className="font-bold text-teal-500">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isProcessing || !customerPhone || !bankName || !accountNumber}
            className="mt-6 w-full bg-teal-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? "កំពុងដំណើរការ..." : "បញ្ចប់ការលក់"} <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;