import React, { useState, useEffect } from "react";
import {
  MdArrowBack,
  MdSave,
  MdCancel,
  MdCheckCircle,
  MdAdd,
  MdDelete,
  MdAttachMoney,
  MdDateRange,
  MdPerson,
  MdNote,
  MdReceipt,
  MdPrint,
  MdCreditCard,
  MdKeyboardArrowDown,
  MdOutlineWarehouse,
  MdOutlinePendingActions,
  MdOutlineVerified,
  MdInfoOutline,
  MdPayment,
  MdEmail,
} from "react-icons/md";
import { FaBoxes, FaTruck, FaWarehouse, FaRegCalendarAlt, FaRegBuilding, FaPhoneAlt, FaMapMarkerAlt, FaPlusCircle, FaMinusCircle, FaBarcode } from "react-icons/fa";
import useSupplierSearch from "../../../hook/useSupplierSearch";
import useProducts from "../../../hook/useProducts";
import useCreatePurchase from "../../../hook/useCreatePurchase";
import useWarehouses from "../../../hook/useWarehouse";

const AddPurchaseItem = () => {
  // Use the hooks
  const { keyword, setKeyword, results: suppliers, loading: loadingSuppliers } = useSupplierSearch();
  const { products, loading: loadingProducts, fetchProducts } = useProducts();
  const { handleCreatePurchase, loading: savingPurchase, error: purchaseError, success: purchaseSuccess, setSuccess: setPurchaseSuccess } = useCreatePurchase();
  const { warehouses, loadingWarehouse } = useWarehouses();

  // UI State
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Form state matching backend structure
  const [formData, setFormData] = useState({
    supplier_id: "",
    warehouse_id: "",
    purchase_date: new Date().toISOString().split("T")[0],
    expected_date: "",
    invoice_number: "",
    payment_method: "cash",
    payment_status: "pending",
    paid_amount: 0,
    subtotal: 0,
    discount_total: 0,
    tax_total: 0,
    grand_total: 0,
    note: "",
    items: [],
  });

  // Supplier search state
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Product search state for each row
  const [productSearchTerms, setProductSearchTerms] = useState({});
  const [showProductDropdowns, setShowProductDropdowns] = useState({});

  // Product items state
  const [items, setItems] = useState([
    { 
      product_id: "", 
      product_name: "", 
      product_code: "",
      barcode: "",
      qty: 1, 
      unit_cost: 0, 
      discount_percent: 0, 
      tax_percent: 0, 
      line_total: 0 
    },
  ]);

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Monitor purchase success from hook
  useEffect(() => {
    if (purchaseSuccess) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setPurchaseSuccess(false);
        resetForm();
      }, 3000);
    }
  }, [purchaseSuccess]);

  // Monitor purchase error from hook
  useEffect(() => {
    if (purchaseError) {
      setErrorMessage(purchaseError);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  }, [purchaseError]);

  // Handle supplier selection
  const handleSupplierSelect = (supplier) => {
    setSelectedSupplier(supplier);
    setFormData(prev => ({
      ...prev,
      supplier_id: supplier.id,
    }));
    setKeyword(supplier.company_name_kh || supplier.company_name_en || "");
    setShowSupplierDropdown(false);
  };

  // Helper function to safely parse number values
  const safeParseNumber = (value, defaultValue = 0) => {
    if (value === null || value === undefined) return defaultValue;
    const num = parseFloat(value);
    return isNaN(num) ? defaultValue : num;
  };

  // Filter products based on search term for specific row
  const getFilteredProducts = (searchTerm) => {
    if (!searchTerm) return [];
    return products.filter(product =>
      (product.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (product.name_en?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (product.product_code?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (product.barcode || "").includes(searchTerm)
    );
  };

  // Handle product selection for a row
  const handleProductSelect = (index, product) => {
    const productCost = safeParseNumber(product.cost);
    
    const updatedItems = [...items];
    updatedItems[index].product_id = product.id;
    updatedItems[index].product_name = product.name;
    updatedItems[index].product_code = product.product_code;
    updatedItems[index].barcode = product.barcode;
    updatedItems[index].unit_cost = productCost;
    updatedItems[index].qty = 1;
    updatedItems[index].discount_percent = 0;
    updatedItems[index].tax_percent = 0;
    updatedItems[index].line_total = productCost;
    setItems(updatedItems);
    
    setProductSearchTerms({
      ...productSearchTerms,
      [index]: product.name
    });
    
    setShowProductDropdowns({
      ...showProductDropdowns,
      [index]: false
    });
    
    calculateLineTotal(index, 1, productCost, 0, 0);
  };

  // Handle product search input change
  const handleProductSearchChange = (index, value) => {
    setProductSearchTerms({
      ...productSearchTerms,
      [index]: value
    });
    setShowProductDropdowns({
      ...showProductDropdowns,
      [index]: true
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate line total for an item
  const calculateLineTotal = (index, qty, unitCost, discountPercent, taxPercent) => {
    const subtotal = qty * unitCost;
    const discountAmount = (subtotal * discountPercent) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * taxPercent) / 100;
    const lineTotal = Number((taxableAmount + taxAmount).toFixed(2));
    
    const updatedItems = [...items];
    updatedItems[index].line_total = lineTotal;
    setItems(updatedItems);
    
    calculateTotals();
  };

  // Handle item field changes
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    const numValue = safeParseNumber(value);
    updatedItems[index][field] = numValue;
    setItems(updatedItems);
    
    if (['qty', 'unit_cost', 'discount_percent', 'tax_percent'].includes(field)) {
      calculateLineTotal(
        index,
        updatedItems[index].qty,
        updatedItems[index].unit_cost,
        updatedItems[index].discount_percent,
        updatedItems[index].tax_percent
      );
    }
  };

  // Calculate all totals
  const calculateTotals = () => {
    let subtotal = 0;
    let discountTotal = 0;
    let taxTotal = 0;
    
    items.forEach(item => {
      const itemSubtotal = item.qty * item.unit_cost;
      subtotal += itemSubtotal;
      
      const discountAmount = (itemSubtotal * item.discount_percent) / 100;
      discountTotal += discountAmount;
      
      const taxableAmount = itemSubtotal - discountAmount;
      const taxAmount = (taxableAmount * item.tax_percent) / 100;
      taxTotal += taxAmount;
    });
    
    const grandTotal = subtotal - discountTotal + taxTotal;
    
    setFormData(prev => ({
      ...prev,
      subtotal: Number(subtotal.toFixed(2)),
      discount_total: Number(discountTotal.toFixed(2)),
      tax_total: Number(taxTotal.toFixed(2)),
      grand_total: Number(grandTotal.toFixed(2)),
    }));
  };

  // Add new item row
  const addItem = () => {
    setItems([
      ...items,
      { 
        product_id: "", 
        product_name: "", 
        product_code: "",
        barcode: "",
        qty: 1, 
        unit_cost: 0, 
        discount_percent: 0, 
        tax_percent: 0, 
        line_total: 0 
      },
    ]);
  };

  // Remove item row
  const removeItem = (index) => {
    if (items.length > 1) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
      const newSearchTerms = { ...productSearchTerms };
      const newDropdowns = { ...showProductDropdowns };
      delete newSearchTerms[index];
      delete newDropdowns[index];
      setProductSearchTerms(newSearchTerms);
      setShowProductDropdowns(newDropdowns);
      setTimeout(() => calculateTotals(), 0);
    }
  };

  // Calculate remaining amount
  const getRemainingAmount = () => {
    return formData.grand_total - formData.paid_amount;
  };

  // Prepare data for backend submission
  const prepareSubmitData = () => {
    return {
      supplier_id: parseInt(formData.supplier_id),
      warehouse_id: parseInt(formData.warehouse_id),
      purchase_date: formData.purchase_date,
      expected_date: formData.expected_date || null,
      invoice_number: formData.invoice_number,
      payment_method: formData.payment_method,
      payment_status: formData.payment_status,
      paid_amount: safeParseNumber(formData.paid_amount),
      subtotal: safeParseNumber(formData.subtotal),
      discount_total: safeParseNumber(formData.discount_total),
      tax_total: safeParseNumber(formData.tax_total),
      grand_total: safeParseNumber(formData.grand_total),
      note: formData.note,
      items: items.map(item => ({
        product_id: parseInt(item.product_id),
        qty: parseInt(item.qty),
        unit_cost: safeParseNumber(item.unit_cost),
        discount_percent: safeParseNumber(item.discount_percent),
        tax_percent: safeParseNumber(item.tax_percent),
        line_total: safeParseNumber(item.line_total),
      })),
    };
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      supplier_id: "",
      warehouse_id: "",
      purchase_date: new Date().toISOString().split("T")[0],
      expected_date: "",
      invoice_number: "",
      payment_method: "cash",
      payment_status: "pending",
      paid_amount: 0,
      subtotal: 0,
      discount_total: 0,
      tax_total: 0,
      grand_total: 0,
      note: "",
      items: [],
    });
    setItems([{ 
      product_id: "", 
      product_name: "", 
      product_code: "",
      barcode: "",
      qty: 1, 
      unit_cost: 0, 
      discount_percent: 0, 
      tax_percent: 0, 
      line_total: 0 
    }]);
    setSelectedSupplier(null);
    setKeyword("");
    setProductSearchTerms({});
    setShowProductDropdowns({});
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.supplier_id) {
      setErrorMessage("សូមជ្រើសរើសអ្នកផ្គត់ផ្គង់");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    if (!formData.warehouse_id) {
      setErrorMessage("សូមជ្រើសរើសឃ្លាំង");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    if (items.some(item => !item.product_id)) {
      setErrorMessage("សូមបំពេញព័ត៌មានផលិតផលឱ្យបានពេញលេញ");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    if (items.some(item => item.qty <= 0)) {
      setErrorMessage("បរិមាណទំនិញត្រូវតែធំជាង 0");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    if (formData.payment_status === "partial" && formData.paid_amount <= 0) {
      setErrorMessage("សូមបញ្ចូលចំនួនទឹកប្រាក់ដែលបានបង់");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    if (formData.payment_status === "partial" && formData.paid_amount > formData.grand_total) {
      setErrorMessage("ចំនួនទឹកប្រាក់ដែលបានបង់មិនអាចលើសពីចំនួនសរុបបានទេ");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    
    const submitData = prepareSubmitData();
    const result = await handleCreatePurchase(submitData);
    
    if (!result.success) {
      setErrorMessage(result.message || "មានបញ្ហាក្នុងការរក្សាទុកទិន្នន័យ");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const formatCurrency = (amount) => {
    const numAmount = safeParseNumber(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(numAmount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/80">
      {/* Success/Error Notifications */}
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
            <div className="flex items-center gap-3 bg-white rounded-2xl shadow-xl border-l-4 border-red-500 p-4 min-w-[320px]">
              <div className="bg-red-100 rounded-full p-2">
                <MdCancel className="text-red-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">កំហុស!</p>
                <p className="text-sm text-slate-500">{errorMessage}</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
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
                  <span className="text-slate-800 font-medium">បង្កើតការទិញថ្មី</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">បង្កើតការទិញថ្មី</h1>
                <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-1">
                  <MdReceipt className="text-teal-500" />
                  បំពេញព័ត៌មានលម្អិតនៃការបញ្ជាទិញទំនិញ
                </p>
              </div>
            </div>
            <button className="px-4 py-2 text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all flex items-center gap-2 text-sm font-medium">
              <MdPrint size={18} /> បោះពុម្ព
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Supplier Information Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm  hover:shadow-md transition-shadow duration-300">
                <div className="px-6 py-4 bg-gradient-to-r from-teal-50/50 to-white border-b border-slate-100 flex items-center gap-2">
                  <div className="p-1.5 bg-teal-100 rounded-lg">
                    <FaTruck className="text-teal-600" size={16} />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800">ព័ត៌មានអ្នកផ្គត់ផ្គង់</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="relative">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        អ្នកផ្គត់ផ្គង់ <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="text"
                          value={keyword}
                          onChange={(e) => {
                            setKeyword(e.target.value);
                            setShowSupplierDropdown(true);
                            setSelectedSupplier(null);
                          }}
                          onFocus={() => setShowSupplierDropdown(true)}
                          className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-white"
                          placeholder="ស្វែងរកតាមឈ្មោះ កូដ ឬ លេខទូរស័ព្ទ..."
                          autoComplete="off"
                        />
                        <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                      
                      {/* Supplier Dropdown */}
                      {showSupplierDropdown && keyword && (
                        <div className="absolute z-100 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                          {loadingSuppliers ? (
                            <div className="p-4 text-center text-slate-400">
                              <div className="animate-spin w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                              កំពុងផ្ទុក...
                            </div>
                          ) : suppliers.length > 0 ? (
                            suppliers.map(supplier => (
                              <div
                                key={supplier.id}
                                onClick={() => handleSupplierSelect(supplier)}
                                className="p-3 hover:bg-teal-50 cursor-pointer transition-colors border-b border-slate-100 last:border-0"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium text-slate-800">{supplier.company_name_kh || supplier.company_name_en}</p>
                                    <p className="text-xs text-slate-500">{supplier.supplier_code}</p>
                                  </div>
                                  <p className="text-xs text-slate-500">{supplier.phone}</p>
                                </div>
                                <p className="text-xs text-slate-400 mt-1 truncate">{supplier.address}</p>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-center text-slate-400">មិនឃើញមានទិន្នន័យអ្នកផ្គត់ផ្គង់</div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Auto-filled supplier information */}
                    {selectedSupplier && (
                      <div className="bg-teal-50/30 rounded-xl p-4 border border-teal-100">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 bg-teal-100 rounded-lg">
                            <FaRegBuilding className="text-teal-600" size={18} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 text-lg">{selectedSupplier.company_name_kh || selectedSupplier.company_name_en}</h3>
                            <p className="text-sm text-teal-600">{selectedSupplier.supplier_code}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          <div className="flex items-start gap-2">
                            <FaPhoneAlt className="text-teal-500 mt-0.5" size={14} />
                            <div>
                              <p className="text-xs text-slate-500">ទូរស័ព្ទ</p>
                              <p className="text-sm text-slate-700 font-medium">{selectedSupplier.phone || "—"}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MdPerson className="text-teal-500 mt-0.5" size={14} />
                            <div>
                              <p className="text-xs text-slate-500">អ្នកទំនាក់ទំនង</p>
                              <p className="text-sm text-slate-700 font-medium">{selectedSupplier.contact_person || "—"}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 md:col-span-2">
                            <FaMapMarkerAlt className="text-teal-500 mt-0.5" size={14} />
                            <div>
                              <p className="text-xs text-slate-500">អាសយដ្ឋាន</p>
                              <p className="text-sm text-slate-700">{selectedSupplier.address || "—"}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 md:col-span-2">
                            <MdEmail className="text-teal-500 mt-0.5" size={14} />
                            <div>
                              <p className="text-xs text-slate-500">អ៊ីមែល</p>
                              <p className="text-sm text-slate-700">{selectedSupplier.email || "—"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
                        លេខវិក្កយបត្រ
                      </label>
                      <input
                        type="text"
                        name="invoice_number"
                        value={formData.invoice_number}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                        placeholder="INV-2024-001"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        ឃ្លាំង <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MdOutlineWarehouse className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                          name="warehouse_id"
                          value={formData.warehouse_id}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                          required
                        >
                          <option value="">ជ្រើសរើសឃ្លាំង</option>
                          {warehouses.map(warehouse => (
                            <option key={warehouse.id} value={warehouse.id}>
                              {warehouse.name} {warehouse.location ? `- ${warehouse.location}` : ''}
                            </option>
                          ))}
                        </select>
                        <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        កាលបរិច្ឆេទទិញ <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaRegCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          type="date"
                          name="purchase_date"
                          value={formData.purchase_date}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">កាលបរិច្ឆេទប្រគល់ជូន</label>
                      <div className="relative">
                        <FaRegCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          type="date"
                          name="expected_date"
                          value={formData.expected_date}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">វិធីបង់ប្រាក់</label>
                      <div className="relative">
                        <MdCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                          name="payment_method"
                          value={formData.payment_method}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                        >
                          <option value="cash">សាច់ប្រាក់</option>
                          <option value="bank_transfer">ផ្ទេរធនាគារ</option>
                          <option value="credit">បង់រំលស់</option>
                        </select>
                        <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">ស្ថានភាពបង់ប្រាក់</label>
                      <div className="relative">
                        <MdOutlinePendingActions className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                          name="payment_status"
                          value={formData.payment_status}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                        >
                          <option value="pending">កំពុងរង់ចាំ (មិនទាន់បង់)</option>
                          <option value="partial">បានបង់ខ្លះ</option>
                          <option value="paid">បានបង់រួចរាល់</option>
                        </select>
                        <MdKeyboardArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                    </div>
                    
                    {/* Partial Payment Input */}
                    {formData.payment_status === "partial" && (
                      <div className="md:col-span-2 animate-fade-in">
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                          ចំនួនទឹកប្រាក់ដែលបានបង់ <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <MdPayment className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input
                            type="number"
                            name="paid_amount"
                            value={formData.paid_amount}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                            max={formData.grand_total}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                            placeholder="បញ្ចូលចំនួនទឹកប្រាក់ដែលបានបង់"
                          />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <span className="text-slate-500">ទឹកប្រាក់សរុប: {formatCurrency(formData.grand_total)}</span>
                          <span className="text-orange-600">នៅសល់បង់: {formatCurrency(getRemainingAmount())}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Products Table Card */}
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
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-all flex items-center gap-2 shadow-sm text-sm font-medium"
                  >
                    <MdAdd size={18} /> បន្ថែមទំនិញ
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">ស្វែងរកផលិតផល <span className="text-red-500">*</span></th>
                        <th className="px-4 py-3">លេខកូដ</th>
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
                        <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-4 py-3 text-slate-500 text-sm">{index + 1}</td>
                          <td className="px-4 py-3 relative">
                            <div className="relative">
                              <input
                                type="text"
                                value={productSearchTerms[index] || ""}
                                onChange={(e) => handleProductSearchChange(index, e.target.value)}
                                onFocus={() => setShowProductDropdowns({ ...showProductDropdowns, [index]: true })}
                                className="w-64 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm bg-white"
                                placeholder="បញ្ចូលឈ្មោះ កូដ ឬ Barcode..."
                                autoComplete="off"
                              />
                              {showProductDropdowns[index] && productSearchTerms[index] && (
                                <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                  {loadingProducts ? (
                                    <div className="p-3 text-center text-slate-400 text-sm">កំពុងផ្ទុក...</div>
                                  ) : getFilteredProducts(productSearchTerms[index]).length > 0 ? (
                                    getFilteredProducts(productSearchTerms[index]).map(product => (
                                      <div
                                        key={product.id}
                                        onClick={() => handleProductSelect(index, product)}
                                        className="p-2 hover:bg-teal-50 cursor-pointer border-b border-slate-100 last:border-0"
                                      >
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <p className="font-medium text-slate-800 text-sm">{product.name}</p>
                                            <div className="flex gap-2 text-xs text-slate-500 mt-0.5">
                                              <span>កូដ: {product.product_code}</span>
                                              {product.barcode && <span>Barcode: {product.barcode}</span>}
                                            </div>
                                          </div>
                                          <p className="text-teal-600 font-medium text-sm">
                                            ${safeParseNumber(product.cost).toFixed(2)}
                                          </p>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="p-3 text-center text-slate-400 text-sm">រកមិនឃើញផលិតផល</div>
                                  )}
                                </div>
                              )}
                            </div>
                            {item.product_name && (
                              <div className="text-xs text-slate-500 mt-1 truncate max-w-[250px]">
                                {item.product_name}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-slate-600">{item.product_code || "—"}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              {item.barcode ? (
                                <>
                                  <FaBarcode className="text-slate-400" size={14} />
                                  <span className="text-xs text-slate-500">{item.barcode}</span>
                                </>
                              ) : (
                                <span className="text-xs text-slate-400">—</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleItemChange(index, "qty", Math.max(1, item.qty - 1))}
                                className="p-1 rounded-md hover:bg-slate-100 text-slate-500"
                              >
                                <FaMinusCircle size={14} />
                              </button>
                              <input
                                type="number"
                                value={item.qty}
                                onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                                className="w-20 px-2 py-2 text-center border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
                                min="1"
                              />
                              <button
                                type="button"
                                onClick={() => handleItemChange(index, "qty", item.qty + 1)}
                                className="p-1 rounded-md hover:bg-slate-100 text-slate-500"
                              >
                                <FaPlusCircle size={14} />
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={item.unit_cost}
                              onChange={(e) => handleItemChange(index, "unit_cost", e.target.value)}
                              className="w-28 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
                              step="0.01"
                              placeholder="0.00"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={item.discount_percent}
                              onChange={(e) => handleItemChange(index, "discount_percent", e.target.value)}
                              className="w-20 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
                              step="0.1"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={item.tax_percent}
                              onChange={(e) => handleItemChange(index, "tax_percent", e.target.value)}
                              className="w-20 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm"
                              step="0.1"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-4 py-3 font-semibold text-teal-600">
                            ${safeParseNumber(item.line_total).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              disabled={items.length === 1}
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
                  បញ្ចូលឈ្មោះផលិតផល លេខកូដ ឬ Barcode ព័ត៌មានផ្សេងៗនឹងត្រូវបំពេញដោយស្វ័យប្រវត្តិ
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
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
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
                    <span className="font-medium text-slate-800">{formatCurrency(formData.subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">បញ្ចុះតម្លៃសរុប</span>
                    <span className="font-medium text-emerald-600">-{formatCurrency(formData.discount_total)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">ពន្ធសរុប</span>
                    <span className="font-medium text-slate-800">{formatCurrency(formData.tax_total)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-teal-50/50 rounded-xl px-3 -mx-1">
                    <span className="font-bold text-slate-800">សរុបទាំងអស់</span>
                    <span className="font-bold text-2xl text-teal-600">{formatCurrency(formData.grand_total)}</span>
                  </div>
                  
                  {/* Payment Summary for Partial Payment */}
                  {formData.payment_status === "partial" && formData.paid_amount > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600">បានបង់ប្រាក់</span>
                        <span className="font-medium text-green-600">{formatCurrency(formData.paid_amount)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-600">នៅសល់បង់</span>
                        <span className="font-bold text-orange-600">{formatCurrency(getRemainingAmount())}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={savingPurchase}
                    className={`w-full py-3 bg-teal-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${savingPurchase ? 'opacity-75 cursor-not-allowed' : 'hover:bg-teal-700 hover:shadow-lg'}`}
                  >
                    {savingPurchase ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <MdSave size={18} />
                    )}
                    {savingPurchase ? 'កំពុងរក្សាទុក...' : 'រក្សាទុកលំដាប់ទិញ'}
                  </button>
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="w-full py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    <MdCancel size={18} /> បោះបង់
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
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
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default AddPurchaseItem;