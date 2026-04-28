import React, { useState } from "react";
import {
  MdArrowBack,
  MdSave,
  MdCancel,
  MdCheckCircle,
  MdAdd,
  MdDelete,
  MdLocalShipping,
  MdInventory,
  MdAttachMoney,
  MdDateRange,
  MdPerson,
  MdNote,
  MdReceipt,
  MdSearch,
  MdQrCodeScanner,
  MdPrint,
  MdErrorOutline,
  MdCreditCard,
  MdAccountBalance,
  MdStore,
  MdKeyboardArrowDown,
  MdMoreVert,
  MdShoppingCart,
  MdCheckBox,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
  MdDoneAll,
  MdOutlineWarehouse,
  MdOutlineLocalOffer,
  MdOutlinePercent,
  MdOutlineAttachMoney,
  MdOutlineReceiptLong,
  MdOutlineFactCheck,
  MdOutlinePendingActions,
  MdOutlineInventory,
  MdOutlineAssignment,
  MdOutlineVerified,
  MdOutlineWarning,
} from "react-icons/md";
import { FaBoxes, FaTruck, FaWarehouse, FaPercentage, FaRegCalendarAlt, FaRegBuilding, FaPhoneAlt, FaMapMarkerAlt, FaRegMoneyBillAlt, FaRegCreditCard, FaExchangeAlt, FaPlusCircle, FaMinusCircle, FaBarcode } from "react-icons/fa";

const AddPurchaseItem = () => {
  // UI State
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [activeTab, setActiveTab] = useState("purchase");
  
  // Form state placeholders (ready for backend)
  const [supplierSearchTerm, setSupplierSearchTerm] = useState("");
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [purchaseData, setPurchaseData] = useState({
    supplierId: "",
    supplierName: "",
    supplierPhone: "",
    supplierAddress: "",
    supplierCode: "",
    invoiceNumber: "",
    purchaseDate: new Date().toISOString().split("T")[0],
    expectedDeliveryDate: "",
    warehouse: "main",
    paymentMethod: "cash",
    paymentStatus: "pending",
    notes: "",
  });
  
  const [receiptData, setReceiptData] = useState({
    receiptNumber: "",
    purchaseOrderId: "",
    receivedDate: new Date().toISOString().split("T")[0],
    receivedBy: "",
    qualityCheck: "passed",
    damagedItems: false,
    notes: "",
  });
  
  // Product items with product ID field
  const [items, setItems] = useState([
    { id: 1, productId: "", productName: "", barcode: "", quantity: 1, unitPrice: 0, discount: 0, tax: 0, total: 0 },
  ]);
  
  const [errors, setErrors] = useState({});
  
  // Auto-filled product data (mock - will come from API)
  const handleProductIdBlur = (index, productId) => {
    // This simulates auto-fill from backend
    // In real implementation, fetch product details by ID
    if (productId) {
      const updatedItems = [...items];
      updatedItems[index].productName = `ផលិតផល ${productId}`; // Auto-filled
      updatedItems[index].barcode = `BAR${productId}`; // Auto-filled
      setItems(updatedItems);
    }
  };
  
  const handleSupplierSelect = (supplier) => {
    setSelectedSupplier(supplier);
    setPurchaseData({
      ...purchaseData,
      supplierId: supplier.id,
      supplierName: supplier.name,
      supplierPhone: supplier.phone,
      supplierAddress: supplier.address,
      supplierCode: supplier.code,
    });
    setSupplierSearchTerm(supplier.name);
    setShowSupplierDropdown(false);
  };
  
  const calculateItemTotal = (quantity, unitPrice, discount, tax) => {
    const subtotal = quantity * unitPrice;
    const discountAmount = (subtotal * discount) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * tax) / 100;
    return Number((taxableAmount + taxAmount).toFixed(2));
  };
  
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    const numValue = field === "productId" || field === "productName" || field === "barcode" ? value : parseFloat(value) || 0;
    updatedItems[index][field] = numValue;
    
    if (["quantity", "unitPrice", "discount", "tax"].includes(field)) {
      updatedItems[index].total = calculateItemTotal(
        updatedItems[index].quantity,
        updatedItems[index].unitPrice,
        updatedItems[index].discount,
        updatedItems[index].tax
      );
    }
    setItems(updatedItems);
  };
  
  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), productId: "", productName: "", barcode: "", quantity: 1, unitPrice: 0, discount: 0, tax: 0, total: 0 },
    ]);
  };
  
  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };
  
  const calculateSummary = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const discountTotal = items.reduce((sum, item) => sum + ((item.quantity * item.unitPrice) * (item.discount / 100)), 0);
    const taxableTotal = subtotal - discountTotal;
    const taxTotal = items.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.unitPrice;
      const itemDiscount = (itemSubtotal * item.discount) / 100;
      const taxable = itemSubtotal - itemDiscount;
      return sum + (taxable * item.tax / 100);
    }, 0);
    const grandTotal = taxableTotal + taxTotal;
    return { subtotal, discountTotal, taxTotal, grandTotal };
  };
  
  const summary = calculateSummary();
  
  const handlePurchaseChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData({ ...purchaseData, [name]: value });
  };
  
  const handleReceiptChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReceiptData({
      ...receiptData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  
  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    setLoadingSave(true);
    setTimeout(() => {
      setLoadingSave(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };
  
  const handleReceiptSubmit = (e) => {
    e.preventDefault();
    setLoadingSave(true);
    setTimeout(() => {
      setLoadingSave(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/80 ">
      {/* Global Notifications */}
      {(showSuccess || showError) && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          {showSuccess && (
            <div className="flex items-center gap-3 bg-white rounded-2xl shadow-xl border-l-4 border-teal-500 p-4 min-w-[320px]">
              <div className="bg-teal-100 rounded-full p-2">
                <MdCheckCircle className="text-teal-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">ប្រតិបត្តិការជោគជ័យ!</p>
                <p className="text-sm text-slate-500">ទិន្នន័យត្រូវបានរក្សាទុកក្នុងប្រព័ន្ធ</p>
              </div>
            </div>
          )}
          {showError && (
            <div className="flex items-center gap-3 bg-white rounded-2xl shadow-xl border-l-4 border-rose-500 p-4 min-w-[320px]">
              <div className="bg-rose-100 rounded-full p-2">
                <MdErrorOutline className="text-rose-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">កំហុសក្នុងការផ្ទៀងផ្ទាត់</p>
                <p className="text-sm text-slate-500">សូមពិនិត្យមើលវាលដែលត្រូវការ</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm backdrop-blur-sm ">
        <div className="px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button className="group p-2 hover:bg-slate-100 rounded-xl transition-all duration-200">
                <MdArrowBack size={20} className="text-slate-500 group-hover:text-slate-700" />
              </button>
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                  <span className="hover:text-teal-600 cursor-pointer transition">ផ្ទាំងគ្រប់គ្រង</span>
                  <span>/</span>
                  <span className="hover:text-teal-600 cursor-pointer transition">ការទិញ</span>
                  <span>/</span>
                  <span className="text-slate-800 font-medium">ការគ្រប់គ្រងការទិញ</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">ការគ្រប់គ្រងការទិញ</h1>
                <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-1">
                  <MdReceipt className="text-teal-500" />
                  បង្កើតលំដាប់ទិញ និងបញ្ជាក់ការទទួលទំនិញ
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2 text-sm font-medium">
                <MdPrint size={18} /> បោះពុម្ព
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
        {/* Modern Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab("purchase")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                activeTab === "purchase"
                  ? "bg-teal-600 text-white shadow-md shadow-teal-500/20"
                  : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
              }`}
            >
              <MdShoppingCart size={18} />
              លំដាប់ទិញ
            </button>
            <button
              onClick={() => setActiveTab("receipt")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                activeTab === "receipt"
                  ? "bg-teal-600 text-white shadow-md shadow-teal-500/20"
                  : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
              }`}
            >
              <MdOutlineReceiptLong size={18} />
              បញ្ជាក់ការទទួលទំនិញ
            </button>
          </div>
        </div>
        
        {/* Purchase Order Tab */}
        {activeTab === "purchase" && (
          <form onSubmit={handlePurchaseSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Supplier Information Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="px-6 py-4 bg-gradient-to-r from-teal-50/50 to-white border-b border-slate-100 flex items-center gap-2">
                    <div className="p-1.5 bg-teal-100 rounded-lg">
                      <FaTruck className="text-teal-600" size={16} />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-800">ព័ត៌មានអ្នកផ្គត់ផ្គង់</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          អ្នកផ្គត់ផ្គង់ <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type="text"
                            value={supplierSearchTerm}
                            onChange={(e) => {
                              setSupplierSearchTerm(e.target.value);
                              setShowSupplierDropdown(true);
                            }}
                            onFocus={() => setShowSupplierDropdown(true)}
                            className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                            placeholder="ស្វែងរកតាមឈ្មោះ ឬកូដ..."
                          />
                          <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        </div>
                        {showSupplierDropdown && (
                          <div className="absolute z-20 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                            <div className="p-3 text-slate-400 text-sm text-center">បញ្ចូលព័ត៌មានអ្នកផ្គត់ផ្គង់</div>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">កូដអ្នកផ្គត់ផ្គង់</label>
                        <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-200">
                          <MdOutlineLocalOffer className="text-slate-400" size={16} />
                          <span className="text-slate-600 text-sm">{purchaseData.supplierCode || "—"}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">ទូរស័ព្ទ</label>
                        <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-200">
                          <FaPhoneAlt className="text-slate-400" size={14} />
                          <span className="text-slate-600 text-sm">{purchaseData.supplierPhone || "—"}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">អាសយដ្ឋាន</label>
                        <div className="flex items-start gap-2 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-200 min-h-[42px]">
                          <FaMapMarkerAlt className="text-slate-400 mt-0.5" size={14} />
                          <span className="text-slate-600 text-sm flex-1">{purchaseData.supplierAddress || "—"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Purchase Details Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="px-6 py-4 bg-gradient-to-r from-teal-50/50 to-white border-b border-slate-100 flex items-center gap-2">
                    <div className="p-1.5 bg-teal-100 rounded-lg">
                      <MdReceipt className="text-teal-600" size={16} />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-800">ព័ត៌មានលម្អិតនៃការទិញ</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          លេខវិក្កយបត្រ <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="invoiceNumber"
                          value={purchaseData.invoiceNumber}
                          onChange={handlePurchaseChange}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                          placeholder="INV-2024-001"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">កាលបរិច្ឆេទទិញ</label>
                        <div className="relative">
                          <FaRegCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input
                            type="date"
                            name="purchaseDate"
                            value={purchaseData.purchaseDate}
                            onChange={handlePurchaseChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">កាលបរិច្ឆេទប្រគល់ជូន</label>
                        <div className="relative">
                          <FaRegCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input
                            type="date"
                            name="expectedDeliveryDate"
                            value={purchaseData.expectedDeliveryDate}
                            onChange={handlePurchaseChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">ឃ្លាំង</label>
                        <div className="relative">
                          <MdOutlineWarehouse className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <select
                            name="warehouse"
                            value={purchaseData.warehouse}
                            onChange={handlePurchaseChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                          >
                            <option value="main">ឃ្លាំងកណ្តាល - ភ្នំពេញ</option>
                            <option value="north">ឃ្លាំងភាគខាងជើង</option>
                            <option value="south">មជ្ឈមណ្ឌលចែកចាយភាគខាងត្បូង</option>
                          </select>
                          <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Products Table Card with Product ID Field */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="px-6 py-4 bg-gradient-to-r from-teal-50/50 to-white border-b border-slate-100 flex justify-between items-center flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-teal-100 rounded-lg">
                        <FaBoxes className="text-teal-600" size={16} />
                      </div>
                      <h2 className="text-lg font-semibold text-slate-800">បញ្ជីទំនិញ</h2>
                    </div>
                    <button
                      type="button"
                      onClick={addItem}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-all flex items-center gap-2 shadow-sm shadow-teal-200 text-sm font-medium"
                    >
                      <MdAdd size={18} /> បន្ថែមទំនិញ
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          <th className="px-4 py-3">#</th>
                          <th className="px-4 py-3">លេខកូដផលិតផល <span className="text-red-500">*</span></th>
                          <th className="px-4 py-3">ឈ្មោះផលិតផល</th>
                          <th className="px-4 py-3">Barcode</th>
                          <th className="px-4 py-3">បរិមាណ</th>
                          <th className="px-4 py-3">តម្លៃដើម ($)</th>
                          <th className="px-4 py-3">បញ្ចុះតម្លៃ (%)</th>
                          <th className="px-4 py-3">ពន្ធ (%)</th>
                          <th className="px-4 py-3">សរុប ($)</th>
                          <th className="px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {items.map((item, index) => (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-4 py-3 text-slate-500 text-sm">{index + 1}</td>
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={item.productId}
                                onChange={(e) => handleItemChange(index, "productId", e.target.value)}
                                onBlur={(e) => handleProductIdBlur(index, e.target.value)}
                                className="w-36 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm"
                                placeholder="បញ្ចូលលេខកូដ"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={item.productName}
                                onChange={(e) => handleItemChange(index, "productName", e.target.value)}
                                className="w-40 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm bg-slate-50"
                                placeholder="ឈ្មោះផលិតផល (ស្វ័យប្រវត្តិ)"
                                readOnly
                              />
                            </td>
                            <td className="px-4 py-3">
                              <div className="relative">
                                <input
                                  type="text"
                                  value={item.barcode}
                                  onChange={(e) => handleItemChange(index, "barcode", e.target.value)}
                                  className="w-32 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm pl-8 bg-slate-50"
                                  placeholder="Barcode"
                                  readOnly
                                />
                                <FaBarcode className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                <button type="button" onClick={() => handleItemChange(index, "quantity", Math.max(1, item.quantity - 1))} className="p-1 rounded-md hover:bg-slate-100 text-slate-500"><FaMinusCircle size={14} /></button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                  className="w-16 px-2 py-2 text-center border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
                                  min="1"
                                />
                                <button type="button" onClick={() => handleItemChange(index, "quantity", item.quantity + 1)} className="p-1 rounded-md hover:bg-slate-100 text-slate-500"><FaPlusCircle size={14} /></button>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                value={item.unitPrice}
                                onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                                className="w-24 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
                                step="0.01"
                                placeholder="0.00"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                value={item.discount}
                                onChange={(e) => handleItemChange(index, "discount", e.target.value)}
                                className="w-20 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
                                step="0.1"
                                placeholder="0"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                value={item.tax}
                                onChange={(e) => handleItemChange(index, "tax", e.target.value)}
                                className="w-20 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
                                step="0.1"
                                placeholder="0"
                              />
                            </td>
                            <td className="px-4 py-3 font-semibold text-teal-600">${item.total.toFixed(2)}</td>
                            <td className="px-4 py-3 text-center">
                              <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                              >
                                <MdDelete size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-3 text-xs text-slate-400 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                    <MdOutlineVerified size={14} className="text-teal-500" />
                    បញ្ចូលលេខកូដផលិតផល ព័ត៌មានផ្សេងៗនឹងត្រូវបំពេញដោយស្វ័យប្រវត្តិ
                  </div>
                </div>
                
                {/* Notes Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 bg-gradient-to-r from-teal-50/50 to-white border-b border-slate-100 flex items-center gap-2">
                    <MdNote className="text-teal-600" size={18} />
                    <h2 className="text-lg font-semibold text-slate-800">កំណត់ចំណាំបន្ថែម</h2>
                  </div>
                  <div className="p-6">
                    <textarea
                      name="notes"
                      value={purchaseData.notes}
                      onChange={handlePurchaseChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
                      placeholder="បញ្ចូលកំណត់ចំណាំបន្ថែម..."
                    />
                  </div>
                </div>
              </div>
              
              {/* Right Column - Summary Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-24 overflow-hidden">
                  <div className="px-6 py-4 bg-gradient-to-r from-teal-50/50 to-white border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                      <MdAttachMoney className="text-teal-600" size={20} />
                      សង្ខេបការបញ្ជាទិញ
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-600">សរុបរង</span>
                      <span className="font-medium text-slate-800">${summary.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-600">បញ្ចុះតម្លៃសរុប</span>
                      <span className="font-medium text-emerald-600">-${summary.discountTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-600">ពន្ធសរុប</span>
                      <span className="font-medium text-slate-800">${summary.taxTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-teal-50/50 rounded-xl px-3 -mx-1">
                      <span className="font-bold text-slate-800">សរុបទាំងអស់</span>
                      <span className="font-bold text-2xl text-teal-600">${summary.grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={loadingSave}
                      className={`w-full py-3 bg-teal-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${loadingSave ? 'opacity-75 cursor-not-allowed' : 'hover:bg-teal-700 hover:shadow-lg'}`}
                    >
                      {loadingSave ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <MdSave size={18} />
                      )}
                      {loadingSave ? 'កំពុងរក្សាទុក...' : 'រក្សាទុកលំដាប់ទិញ'}
                    </button>
                    <button type="button" className="w-full py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                      <MdCancel size={18} /> បោះបង់
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
        
        {/* Goods Receipt Tab */}
        {activeTab === "receipt" && (
          <form onSubmit={handleReceiptSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 bg-gradient-to-r from-teal-50/50 to-white border-b border-slate-100 flex items-center gap-2">
                    <MdOutlineFactCheck className="text-teal-600" size={18} />
                    <h2 className="text-lg font-semibold text-slate-800">ព័ត៌មានទទួលទំនិញ</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          លេខបង្កាន់ដៃ <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="receiptNumber"
                          value={receiptData.receiptNumber}
                          onChange={handleReceiptChange}
                          className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                          placeholder="GR-2024-001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">លេខលំដាប់ទិញ</label>
                        <div className="relative">
                          <MdOutlineAssignment className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <select
                            name="purchaseOrderId"
                            value={receiptData.purchaseOrderId}
                            onChange={handleReceiptChange}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 appearance-none bg-white"
                          >
                            <option value="">ជ្រើសរើសលំដាប់ទិញ...</option>
                            <option value="PO-001">PO-001 - អ្នកផ្គត់ផ្គង់ A</option>
                            <option value="PO-002">PO-002 - អ្នកផ្គត់ផ្គង់ B</option>
                          </select>
                          <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">កាលបរិច្ឆេទទទួល</label>
                        <div className="relative">
                          <FaRegCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input type="date" name="receivedDate" value={receiptData.receivedDate} onChange={handleReceiptChange} className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">អ្នកទទួលទំនិញ</label>
                        <div className="relative">
                          <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input type="text" name="receivedBy" value={receiptData.receivedBy} onChange={handleReceiptChange} className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl" placeholder="ឈ្មោះអ្នកទទួល" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">ការត្រួតពិនិត្យគុណភាព</label>
                        <select name="qualityCheck" value={receiptData.qualityCheck} onChange={handleReceiptChange} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl appearance-none bg-white">
                          <option value="passed">✓ ឆ្លងកាត់ - ទំនិញទាំងអស់អាចទទួលយកបាន</option>
                          <option value="partial">⚠ ឆ្លងកាត់ខ្លះ - ទំនិញខ្លះមិនអាចទទួលយកបាន</option>
                          <option value="failed">✗ មិនឆ្លងកាត់ - ប្រគល់ជូនអ្នកផ្គត់ផ្គង់វិញ</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-3 pt-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" name="damagedItems" checked={receiptData.damagedItems} onChange={handleReceiptChange} className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" />
                          <span className="text-sm text-slate-700">មានទំនិញខូចខាត / ខូចគុណភាព</span>
                        </label>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">កំណត់ចំណាំត្រួតពិនិត្យ</label>
                        <textarea name="notes" value={receiptData.notes} onChange={handleReceiptChange} rows="3" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl resize-none" placeholder="ពិពណ៌នាអំពីបញ្ហាគុណភាព ទំនិញបាត់ ឬភាពខុសគ្នា..." />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Supplier Auto Info Card - Displays when PO is selected */}
                {receiptData.purchaseOrderId && (
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-100 p-5 transition-all animate-fade-in">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-xl shadow-sm"><FaRegBuilding className="text-teal-600" size={20} /></div>
                      <div className="flex-1">
                        <p className="text-xs text-teal-600 uppercase font-semibold">ព័ត៌មានអ្នកផ្គត់ផ្គង់ពីលំដាប់ទិញ</p>
                        <p className="font-semibold text-slate-800 text-lg mt-1">ឈ្មោះអ្នកផ្គត់ផ្គង់</p>
                        <div className="flex gap-4 mt-2 text-sm text-slate-600">
                          <span className="flex items-center gap-1"><FaPhoneAlt size={12} /> 012 345 678</span>
                          <span className="flex items-center gap-1"><FaMapMarkerAlt size={12} /> ភ្នំពេញ</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">កាលបរិច្ឆេទប្រគល់ជូន: 15 មេសា 2025</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Receipt Summary Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
                  <div className="px-6 py-4 bg-gradient-to-r from-teal-50/50 to-white border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                      <MdOutlineInventory size={20} className="text-teal-600" />
                      សង្ខេបការទទួល
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-5 mb-6">
                      <div className="bg-slate-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-slate-500">ចំនួនមុខទំនិញ</p>
                        <p className="text-2xl font-bold text-slate-800">{items.length}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-slate-500">បរិមាណសរុប</p>
                        <p className="text-2xl font-bold text-slate-800">{items.reduce((s, i) => s + i.quantity, 0)}</p>
                      </div>
                      <div className="col-span-2 bg-teal-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-slate-500">តម្លៃសរុប</p>
                        <p className="text-2xl font-bold text-teal-600">${summary.grandTotal.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex justify-center mb-6">
                      <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium flex items-center gap-1">
                        <MdOutlinePendingActions size={14} /> កំពុងរង់ចាំការអនុម័ត
                      </span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <button type="submit" disabled={loadingSave} className="w-full py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
                        {loadingSave ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <MdCheckCircle size={18} />}
                        {loadingSave ? 'កំពុងដំណើរការ...' : 'បញ្ជាក់ការទទួល'}
                      </button>
                      <button type="button" className="w-full py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                        <MdCancel size={18} /> បោះបង់
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
      
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default AddPurchaseItem;