// src/pages/Staff/CheckoutQR.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheck, FiArrowRight, FiCopy, FiSmartphone } from "react-icons/fi";
import { FaQrcode } from "react-icons/fa";
import { createOrder, getCustomerByPhone } from "../../services/auth";

const CheckoutQR = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total, subtotal, cart } = location.state || { total: 0, subtotal: 0, cart: [] };
  
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedBank, setSelectedBank] = useState("aba");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Discount states
  const [discountRate, setDiscountRate] = useState(0);
  const [customerTier, setCustomerTier] = useState("");
  const [isCheckingCustomer, setIsCheckingCustomer] = useState(false);
  
  const discountAmount = (total * discountRate) / 100;
  const finalTotal = total - discountAmount;

  const qrAccounts = {
    aba: { name: "ABA Bank", account: "001 234 567", color: "#0D9488" },
    acleda: { name: "ACLEDA Bank", account: "999 888 777", color: "#0D9488" },
    wing: { name: "Wing Money", account: "098 765 432", color: "#0D9488" },
    true_money: { name: "True Money", account: "087 654 321", color: "#0D9488" }
  };

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

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(qrAccounts[selectedBank].account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!customerPhone) {
      alert("សូមបញ្ចូលលេខទូរស័ព្ទ!");
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
      payment_method: "qr",
      customer_name: customerName || null,
      customer_phone: customerPhone || null,
      bank_name: qrAccounts[selectedBank].name,
      payment_phone: qrAccounts[selectedBank].account,
      reference_no: "QR-" + Date.now(),
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
            paymentMethod: "qr",
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
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <FaQrcode className="text-xl text-teal-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">ស្កេន QR បង់ប្រាក់</h2>
          </div>

          {/* Customer Info */}
          <div className="mb-4">
            <label className="text-xs text-gray-500">លេខទូរស័ព្ទ *</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg bg-white border border-gray-200 outline-none"
              placeholder="បញ្ចូលលេខទូរស័ព្ទ"
            />
            {isCheckingCustomer && <p className="text-xs text-gray-400 mt-1">កំពុងស្វែងរក...</p>}
            {customerTier && !isCheckingCustomer && (
              <p className="text-xs text-green-600 mt-1">{customerTier} - បញ្ចុះតម្លៃ {discountRate}%</p>
            )}
          </div>

          {discountRate > 0 && (
            <div className="bg-green-50 rounded-lg p-3 mb-4">
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

          {/* Bank Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {Object.entries(qrAccounts).map(([key, account]) => (
              <button
                key={key}
                onClick={() => setSelectedBank(key)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedBank === key
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200 bg-white hover:border-teal-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: account.color }} />
                  <span className="text-sm font-medium">{account.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* QR Display */}
          <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl flex items-center justify-center">
              <FaQrcode className="text-6xl text-teal-600 mx-auto" />
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500">លេខគណនី</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <p className="font-mono font-semibold text-lg text-teal-600">{qrAccounts[selectedBank].account}</p>
                <button onClick={handleCopyAccount} className="p-1.5 rounded-lg bg-gray-100 hover:bg-teal-100 transition">
                  <FiCopy size={14} className="text-gray-500" />
                </button>
              </div>
              {copied && <span className="text-xs text-green-600 mt-1 inline-block">ចម្លងរួចរាល់!</span>}
            </div>
          </div>

          {/* Total Amount */}
          {!discountRate && (
            <div className="bg-teal-50 rounded-lg p-3 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ទឹកប្រាក់សរុប</span>
                <span className="font-bold text-teal-600">${total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center justify-center p-10 text-center bg-gradient-to-br from-teal-50 to-white">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
            <FiSmartphone size={28} />
          </div>
          <h1 className="text-2xl font-bold">ស្កេន QR Code</h1>
          <p className="text-gray-400 text-sm mt-2">បើកកម្មវិធីបង់ប្រាក់ ហើយស្កេន QR Code</p>

          <div className="mt-6 space-y-3 w-full text-left">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold">1</div>
              <span>ជ្រើសរើសធនាគារ ឬ កម្មវិធីបង់ប្រាក់</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold">2</div>
              <span>ស្កេន QR Code ខាងឆ្វេង</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold">3</div>
              <span>បញ្ចូលទឹកប្រាក់ ${finalTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold">4</div>
              <span>ចុចបញ្ជាក់ការបង់ប្រាក់</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isProcessing || !customerPhone}
            className="mt-6 w-full bg-teal-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? "កំពុងដំណើរការ..." : "បញ្ជាក់ការបង់ប្រាក់"} <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutQR;