// src/pages/Staff/CheckoutSuccess.jsx
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiArrowRight, FiPrinter, FiDownload } from "react-icons/fi";
import logo from "../../assets/logo.png";

const CheckoutSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef(null);
  const { 
    orderSuccess, 
    total, 
    change, 
    paymentMethod, 
    cart, 
    orderId,
    discount,        // 👈 ADD THIS
    discountRate,    // 👈 ADD THIS
    originalTotal    // 👈 ADD THIS
  } = location.state || {};

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-CA");
  const formattedTime = currentDate.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });

  // Generate random receipt number
  const receiptNumber = `INV-${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  // Format price safely
  const formatPrice = (price) => {
    const numPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
    return numPrice.toFixed(2);
  };

  const handlePrint = () => {
    const printContent = receiptRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  // Use originalTotal if available, otherwise calculate from cart
  const subtotal = originalTotal || (cart && cart.length > 0 
    ? cart.reduce((sum, item) => sum + (formatPrice(item.price) * (item.quantity || 1)), 0) 
    : total || 0);
  
  const discountAmount = discount || 0;
  const grandTotal = total || (subtotal - discountAmount);
  const discountPercent = discountRate || 0;

  // ប្រសិនបើគ្មាន orderSuccess
  if (!orderSuccess) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <FiCheckCircle className="text-4xl text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">គ្មានទិន្នន័យ</h1>
          <p className="text-gray-500 mt-2">សូមត្រលប់ទៅបញ្ចប់ការលក់</p>
          <button
            onClick={() => navigate("/staff")}
            className="mt-6 w-full bg-teal-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            ត្រលប់ទៅលក់ទំនិញ <FiArrowRight />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* LEFT SIDE - RECEIPT */}
          <div className="bg-white p-6 border-r border-gray-200">
            <div ref={receiptRef} className="max-w-sm mx-auto">
              {/* Receipt Header */}
              <div className="text-center border-b border-dashed border-gray-200 pb-4">
                <div className="flex justify-center mb-2">
                  <img src={logo} alt="Pharmacy Logo" className="w-16 h-16 object-contain" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">ឱសថស្ថាន អាឡាត្រឡោកបែក</h2>
                <p className="text-xs text-gray-500 mt-1">Pharmacy Alatrolok Bek</p>
                <p className="text-xs text-gray-400 mt-2">ផ្លូវ 217, ភ្នំពេញ, កម្ពុជា</p>
                <p className="text-xs text-gray-400">ទូរស័ព្ទ: 023 456 789 | 012 345 678</p>
              </div>

              {/* Receipt Info */}
              <div className="py-3 border-b border-dashed border-gray-200">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">លេខវិក្កយបត្រ:</span>
                  <span className="font-medium text-gray-700">{receiptNumber}</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-500">កាលបរិច្ឆេទ:</span>
                  <span className="font-medium text-gray-700">{formattedDate}</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-500">ម៉ោង:</span>
                  <span className="font-medium text-gray-700">{formattedTime}</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-500">អ្នកលក់:</span>
                  <span className="font-medium text-gray-700">Cashier</span>
                </div>
              </div>

              {/* Items Header */}
              <div className="py-2 border-b border-dashed border-gray-200">
                <div className="grid grid-cols-12 text-xs font-semibold text-gray-600">
                  <div className="col-span-6">ទំនិញ</div>
                  <div className="col-span-2 text-center">ចំនួន</div>
                  <div className="col-span-2 text-right">តម្លៃ</div>
                  <div className="col-span-2 text-right">សរុប</div>
                </div>
              </div>

              {/* Items List */}
              <div className="py-2 max-h-64 overflow-y-auto">
                {cart && cart.length > 0 ? (
                  cart.map((item, idx) => {
                    const itemPrice = formatPrice(item.price);
                    const itemTotal = formatPrice(item.price * (item.quantity || 1));
                    
                    return (
                      <div key={idx} className="grid grid-cols-12 text-xs py-1.5">
                        <div className="col-span-6 text-gray-700">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-[10px] text-gray-400">{item.unit || "ដុំ"}</p>
                        </div>
                        <div className="col-span-2 text-center text-gray-600">{item.quantity || 1}</div>
                        <div className="col-span-2 text-right text-gray-600">${itemPrice}</div>
                        <div className="col-span-2 text-right font-medium text-gray-800">${itemTotal}</div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-gray-400 text-xs py-4">គ្មានទិន្នន័យ</div>
                )}
              </div>

              {/* Totals with Discount */}
              <div className="pt-3 border-t border-dashed border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">សរុបរង:</span>
                  <span className="font-medium">${formatPrice(subtotal)}</span>
                </div>
                
                {/* Discount Section */}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">
                      បញ្ចុះតម្លៃ {discountPercent > 0 ? `(${discountPercent}%)` : ''}:
                    </span>
                    <span className="text-red-500">-${formatPrice(discountAmount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">ពន្ធ (0%):</span>
                  <span className="font-medium">$0.00</span>
                </div>
                
                <div className="flex justify-between text-base font-bold mt-2 pt-2 border-t border-gray-200">
                  <span>សរុបទឹកប្រាក់:</span>
                  <span className="text-teal-600">${formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="mt-3 pt-3 border-t border-dashed border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">វិធីបង់ប្រាក់:</span>
                  <span className="font-medium">
                    {paymentMethod === "cash" ? "សាច់ប្រាក់" : paymentMethod === "card" ? "ប័ណ្ណឥណទាន" : "ស្កេន QR"}
                  </span>
                </div>
                {paymentMethod === "cash" && (
                  <>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-500">ទទួលបាន:</span>
                      <span className="font-medium">${formatPrice((grandTotal || 0) + (change || 0))}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-500">ប្រាក់អាប់:</span>
                      <span className="font-bold text-green-600">${formatPrice(change || 0)}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="text-center mt-4 pt-3 border-t border-dashed border-gray-200">
                <p className="text-[10px] text-gray-400">សូមអរគុណចំពោះការទិញទំនិញ!</p>
                <p className="text-[10px] text-gray-400 mt-1">Thank you for your purchase!</p>
                <p className="text-[9px] text-gray-300 mt-2">** វិក្កយបត្រនេះជាភស្តុតាងសម្រាប់ការធានា **</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - SUCCESS MESSAGE */}
          <div className="flex flex-col items-center justify-center p-10 text-center bg-gradient-to-br from-teal-50 to-white">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4 shadow-md">
              <FiCheckCircle className="text-4xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">បញ្ចប់ការលក់ដោយជោគជ័យ!</h1>
            <p className="text-gray-500 text-sm mt-2">សូមអរគុណចំពោះការទិញទំនិញ</p>

            <div className="mt-6 bg-white rounded-xl p-5 w-full shadow-sm">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">សរុបរង</span>
                <span>${formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">បញ្ចុះតម្លៃ {discountPercent > 0 ? `(${discountPercent}%)` : ''}</span>
                  <span className="text-red-500">-${formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm mt-2 pt-2 border-t">
                <span className="text-gray-500">ទឹកប្រាក់សរុប</span>
                <span className="font-bold text-teal-600">${formatPrice(grandTotal)}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">វិធីបង់ប្រាក់</span>
                <span className="font-medium">
                  {paymentMethod === "cash" ? "សាច់ប្រាក់" : paymentMethod === "card" ? "ប័ណ្ណឥណទាន" : "ស្កេន QR"}
                </span>
              </div>
              {paymentMethod === "cash" && (
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">ប្រាក់អាប់</span>
                  <span className="font-bold text-green-600">${formatPrice(change || 0)}</span>
                </div>
              )}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">លេខវិក្កយបត្រ: {receiptNumber}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 w-full">
              <button
                onClick={handlePrint}
                className="flex-1 bg-white border-2 border-teal-600 text-teal-600 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-teal-50 transition"
              >
                <FiPrinter size={18} />
                បោះពុម្ព
              </button>
              <button
                onClick={() => navigate("/staff")}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-md"
              >
                ត្រលប់ទៅលក់ <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;