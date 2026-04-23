// import React, { useState } from "react";
// import {
//   MdArrowBack,
//   MdSave,
//   MdClose,
//   MdBusiness,
//   MdPerson,
//   MdEmail,
//   MdPhone,
//   MdLocationOn,
//   MdCategory,
//   MdPayment,
//   MdDescription,
//   MdCloudUpload,
//   MdCheckCircle,
// } from "react-icons/md";
// import { FaBuilding, FaUserTie } from "react-icons/fa";

// const AddSupplier = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     nameEn: "",
//     contactPerson: "",
//     email: "",
//     phone: "",
//     address: "",
//     category: "ថ្នាំមានវេជ្ជបញ្ជា",
//     paymentTerms: "សាច់ប្រាក់",
//     notes: "",
//   });

//   const [previewLogo, setPreviewLogo] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const categories = [
//     "ថ្នាំមានវេជ្ជបញ្ជា",
//     "ថ្នាំបង្ការគ្រុន",
//     "ថ្នាំអង់ទីប៊ីយ៉ូទិក",
//     "វីតាមីន",
//     "ថ្នាំបេះដូង",
//     "ថ្នាំក្រពះ",
//     "ថ្នាំក្អក",
//     "ថ្នាំលាប",
//   ];

//   const paymentTermsList = ["សាច់ប្រាក់", "សាច់ប្រាក់ 15 ថ្ងៃ", "សាច់ប្រាក់ 30 ថ្ងៃ", "សាច់ប្រាក់ 45 ថ្ងៃ"];

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "logo" && files && files[0]) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewLogo(reader.result);
//       };
//       reader.readAsDataURL(files[0]);
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.phone) {
//       alert("សូមបំពេញព័ត៌មានចាំបាច់");
//       return;
//     }
//     setShowSuccess(true);
//     setTimeout(() => {
//       setShowSuccess(false);
//       // Reset form or redirect
//     }, 3000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
//         <div className="px-6 py-4">
//           <div className="flex items-center gap-4">
//             <a href="/supplier" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
//               <MdArrowBack size={20} className="text-gray-600" />
//             </a>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">បន្ថែមអ្នកផ្គត់ផ្គង់ថ្មី</h1>
//               <p className="text-gray-500 text-sm mt-0.5">បញ្ចូលព័ត៌មានអ្នកផ្គត់ផ្គង់ថ្មីក្នុងប្រព័ន្ធ</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Success Message */}
//       {showSuccess && (
//         <div className="fixed top-24 right-6 z-50 animate-slide-in">
//           <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 shadow-lg">
//             <MdCheckCircle className="text-green-600 text-2xl" />
//             <div>
//               <p className="font-semibold text-green-800">បញ្ចូលទិន្នន័យជោគជ័យ!</p>
//               <p className="text-sm text-green-600">អ្នកផ្គត់ផ្គង់ត្រូវបានបន្ថែមក្នុងប្រព័ន្ធ</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="p-6">
//         <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//             {/* Logo Upload Section */}
//             <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white">
//               <div className="flex items-center gap-6">
//                 <div className="relative">
//                   {previewLogo ? (
//                     <img src={previewLogo} alt="Logo Preview" className="w-20 h-20 rounded-xl object-cover border-2 border-teal-200" />
//                   ) : (
//                     <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
//                       <FaBuilding className="text-teal-600 text-3xl" />
//                     </div>
//                   )}
//                   <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-teal-700 transition-colors shadow-md">
//                     <MdCloudUpload size={14} className="text-white" />
//                     <input type="file" name="logo" accept="image/*" onChange={handleChange} className="hidden" />
//                   </label>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-800">ស្លាកសញ្ញាអ្នកផ្គត់ផ្គង់</h3>
//                   <p className="text-sm text-gray-500 mt-1">ទ្រង់ទ្រាយ JPG, PNG ទំហំមិនលើស 2MB</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6 space-y-6">
//               {/* Basic Information */}
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
//                   <MdBusiness className="text-teal-600" />
//                   ព័ត៌មានមូលដ្ឋាន
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       ឈ្មោះអ្នកផ្គត់ផ្គង់ <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
//                       placeholder="បញ្ចូលឈ្មោះអ្នកផ្គត់ផ្គង់"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះជាអង់គ្លេស</label>
//                     <input
//                       type="text"
//                       name="nameEn"
//                       value={formData.nameEn}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
//                       placeholder="English name"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Contact Information */}
//               <div className="pt-4 border-t border-gray-100">
//                 <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
//                   <MdPerson className="text-teal-600" />
//                   ព័ត៌មានទំនាក់ទំនង
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">អ្នកទំនាក់ទំនង</label>
//                     <input
//                       type="text"
//                       name="contactPerson"
//                       value={formData.contactPerson}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
//                       placeholder="ឈ្មោះអ្នកទំនាក់ទំនង"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       លេខទូរស័ព្ទ <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
//                       placeholder="012 345 678"
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">អ៊ីមែល</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
//                       placeholder="example@email.com"
//                     />
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">អាសយដ្ឋាន</label>
//                     <textarea
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       rows="3"
//                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
//                       placeholder="បញ្ចូលអាសយដ្ឋានលម្អិត"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Business Information */}
//               <div className="pt-4 border-t border-gray-100">
//                 <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
//                   <MdCategory className="text-teal-600" />
//                   ព័ត៌មានអាជីវកម្ម
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">ប្រភេទ</label>
//                     <select
//                       name="category"
//                       value={formData.category}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
//                     >
//                       {categories.map(cat => (
//                         <option key={cat} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">លក្ខខណ្ឌទូទាត់</label>
//                     <select
//                       name="paymentTerms"
//                       value={formData.paymentTerms}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
//                     >
//                       {paymentTermsList.map(term => (
//                         <option key={term} value={term}>{term}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Additional Notes */}
//               <div className="pt-4 border-t border-gray-100">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">កំណត់ចំណាំបន្ថែម</label>
//                 <textarea
//                   name="notes"
//                   value={formData.notes}
//                   onChange={handleChange}
//                   rows="3"
//                   className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
//                   placeholder="បញ្ចូលកំណត់ចំណាំផ្សេងៗ..."
//                 />
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
//               <a
//                 href="/supplier"
//                 className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
//               >
//                 <MdClose size={18} />
//                 បោះបង់
//               </a>
//               <button
//                 type="submit"
//                 className="px-6 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-2"
//               >
//                 <MdSave size={18} />
//                 រក្សាទុកអ្នកផ្គត់ផ្គង់
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>

//       <style jsx>{`
//         @keyframes slide-in {
//           from { transform: translateX(100%); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }
//         .animate-slide-in {
//           animation: slide-in 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AddSupplier;
import React, { useState } from "react";
import {
  MdArrowBack,
  MdSave,
  MdCancel,
  MdCheckCircle,
  MdAdd,
  MdDelete,
  MdEdit,
  MdLocalShipping,
  MdInventory,
  MdAttachMoney,
  MdDateRange,
  MdPerson,
  MdNote,
  MdReceipt,
  MdSearch,
  MdQrCodeScanner,
} from "react-icons/md";
import { FaBoxes, FaTruck, FaWarehouse, FaPercentage } from "react-icons/fa";

const AddPurchaseItem = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("purchase"); // purchase or receipt

  // Purchase Order Data
  const [purchaseData, setPurchaseData] = useState({
    supplierName: "",
    supplierPhone: "",
    invoiceNumber: "",
    purchaseDate: new Date().toISOString().split("T")[0],
    expectedDeliveryDate: "",
    warehouse: "main",
    paymentMethod: "cash",
    paymentStatus: "pending",
    notes: "",
  });

  // Receipt (Goods Received) Data
  const [receiptData, setReceiptData] = useState({
    receiptNumber: "",
    purchaseOrderId: "",
    receivedDate: new Date().toISOString().split("T")[0],
    receivedBy: "",
    qualityCheck: "passed",
    damagedItems: false,
    notes: "",
  });

  // Items List
  const [items, setItems] = useState([
    {
      id: 1,
      productName: "",
      barcode: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      tax: 0,
      total: 0,
    },
  ]);

  const [errors, setErrors] = useState({});
  const [searchSupplier, setSearchSupplier] = useState("");

  // Sample suppliers data
  const suppliers = [
    { id: 1, name: "សហគ្រាសឱសថកម្ពុជា", phone: "023 456 789", address: "ភ្នំពេញ" },
    { id: 2, name: "មជ្ឈមណ្ឌលឱសថថៃ", phone: "012 345 678", address: "បាត់ដំបង" },
    { id: 3, name: "ក្រុមហ៊ុនឱសថវៀតណាម", phone: "096 123 456", address: "សៀមរាប" },
  ];

  // Filtered suppliers
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchSupplier.toLowerCase())
  );

  // Calculate item total
  const calculateItemTotal = (quantity, unitPrice, discount, tax) => {
    const subtotal = quantity * unitPrice;
    const discountAmount = (subtotal * discount) / 100;
    const taxAmount = ((subtotal - discountAmount) * tax) / 100;
    return (subtotal - discountAmount + taxAmount).toFixed(2);
  };

  // Handle item change
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "quantity" || field === "unitPrice" || field === "discount" || field === "tax") {
      updatedItems[index].total = calculateItemTotal(
        updatedItems[index].quantity,
        updatedItems[index].unitPrice,
        updatedItems[index].discount,
        updatedItems[index].tax
      );
    }

    setItems(updatedItems);
  };

  // Add new item
  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        productName: "",
        barcode: "",
        quantity: 1,
        unitPrice: 0,
        discount: 0,
        tax: 0,
        total: 0,
      },
    ]);
  };

  // Remove item
  const removeItem = (index) => {
    if (items.length > 1) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
    }
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + parseFloat(item.total || 0), 0).toFixed(2);
  };

  // Handle purchase form change
  const handlePurchaseChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData({ ...purchaseData, [name]: value });
  };

  // Handle receipt form change
  const handleReceiptChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReceiptData({
      ...receiptData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Validate purchase form
  const validatePurchaseForm = () => {
    const newErrors = {};
    if (!purchaseData.supplierName) newErrors.supplierName = "សូមជ្រើសរើសអ្នកផ្គត់ផ្គង់";
    if (!purchaseData.invoiceNumber) newErrors.invoiceNumber = "សូមបញ្ចូលលេខវិក័យប័ត្រ";
    if (items.some(item => !item.productName)) newErrors.items = "សូមបញ្ចូលឈ្មោះផលិតផល";
    if (items.some(item => item.quantity <= 0)) newErrors.items = "សូមបញ្ចូលបរិមាណត្រឹមត្រូវ";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit purchase order
  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    if (validatePurchaseForm()) {
      console.log("Purchase Order Data:", { ...purchaseData, items });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  // Submit receipt
  const handleReceiptSubmit = (e) => {
    e.preventDefault();
    console.log("Receipt Data:", receiptData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <MdArrowBack size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  ការគ្រប់គ្រងការទិញទំនិញ
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  បង្កើតលំដាប់ទិញ និងបញ្ជាក់ការទទួលទំនិញ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex gap-3 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("purchase")}
              className={`px-6 py-3 font-medium transition-all duration-200 relative ${
                activeTab === "purchase"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FaTruck className="inline mr-2" size={18} />
              បង្កើតលំដាប់ទិញ
            </button>
            <button
              onClick={() => setActiveTab("receipt")}
              className={`px-6 py-3 font-medium transition-all duration-200 relative ${
                activeTab === "receipt"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <MdReceipt className="inline mr-2" size={18} />
              បញ្ជាក់ការទទួលទំនិញ
            </button>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-24 right-6 z-50 animate-slide-in">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 shadow-lg">
              <MdCheckCircle className="text-green-600 text-2xl" />
              <div>
                <p className="font-semibold text-green-800">ប្រតិបត្តិការជោគជ័យ!</p>
                <p className="text-sm text-green-600">ទិន្នន័យត្រូវបានរក្សាទុកក្នុងប្រព័ន្ធ</p>
              </div>
            </div>
          </div>
        )}

        {/* Purchase Order Form */}
        {activeTab === "purchase" && (
          <form onSubmit={handlePurchaseSubmit} className="max-w-7xl mx-auto">
            <div className="space-y-6">
              {/* Supplier Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaTruck className="text-teal-600" />
                    ព័ត៌មានអ្នកផ្គត់ផ្គង់
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ឈ្មោះអ្នកផ្គត់ផ្គង់ <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="supplierName"
                          value={purchaseData.supplierName}
                          onChange={handlePurchaseChange}
                          onFocus={() => setSearchSupplier("")}
                          className={`w-full pl-10 pr-4 py-2.5 border ${errors.supplierName ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500`}
                          placeholder="ស្វែងរកឬបញ្ចូលឈ្មោះអ្នកផ្គត់ផ្គង់"
                        />
                      </div>
                      {searchSupplier === "" && purchaseData.supplierName && (
                        <div className="absolute z-10 mt-1 w-full md:w-96 bg-white border border-gray-200 rounded-xl shadow-lg">
                          {filteredSuppliers.map(supplier => (
                            <div
                              key={supplier.id}
                              className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                              onClick={() => {
                                setPurchaseData({ ...purchaseData, supplierName: supplier.name, supplierPhone: supplier.phone });
                                setSearchSupplier("");
                              }}
                            >
                              <p className="font-medium">{supplier.name}</p>
                              <p className="text-sm text-gray-500">{supplier.phone}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {errors.supplierName && <p className="text-xs text-red-500 mt-1">{errors.supplierName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">លេខទូរស័ព្ទ</label>
                      <input
                        type="tel"
                        name="supplierPhone"
                        value={purchaseData.supplierPhone}
                        onChange={handlePurchaseChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                        placeholder="012 345 678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        លេខវិក័យប័ត្រ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="invoiceNumber"
                        value={purchaseData.invoiceNumber}
                        onChange={handlePurchaseChange}
                        className={`w-full px-4 py-2.5 border ${errors.invoiceNumber ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20`}
                        placeholder="INV-2024-001"
                      />
                      {errors.invoiceNumber && <p className="text-xs text-red-500 mt-1">{errors.invoiceNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">វិធីសាស្រ្តទូទាត់</label>
                      <select
                        name="paymentMethod"
                        value={purchaseData.paymentMethod}
                        onChange={handlePurchaseChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      >
                        <option value="cash">សាច់ប្រាក់</option>
                        <option value="bank_transfer">ផ្ទេរតាមធនាគារ</option>
                        <option value="credit">បង់រំលស់</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaBoxes className="text-teal-600" />
                    បញ្ជីទំនិញ
                  </h2>
                  <button
                    type="button"
                    onClick={addItem}
                    className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all flex items-center gap-2"
                  >
                    <MdAdd size={18} /> បន្ថែមទំនិញ
                  </button>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr className="text-left text-sm font-semibold text-gray-600">
                          <th className="px-3 py-3">លេខ</th>
                          <th className="px-3 py-3">ឈ្មោះផលិតផល <span className="text-red-500">*</span></th>
                          <th className="px-3 py-3">Barcode</th>
                          <th className="px-3 py-3">បរិមាណ</th>
                          <th className="px-3 py-3">តម្លៃដើម ($)</th>
                          <th className="px-3 py-3">បញ្ចុះតម្លៃ (%)</th>
                          <th className="px-3 py-3">ពន្ធ (%)</th>
                          <th className="px-3 py-3">សរុប ($)</th>
                          <th className="px-3 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={item.id} className="border-b">
                            <td className="px-3 py-3 text-gray-500">{index + 1}</td>
                            <td className="px-3 py-3">
                              <input
                                type="text"
                                value={item.productName}
                                onChange={(e) => handleItemChange(index, "productName", e.target.value)}
                                className="w-48 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                placeholder="ឈ្មោះផលិតផល"
                              />
                            </td>
                            <td className="px-3 py-3">
                              <input
                                type="text"
                                value={item.barcode}
                                onChange={(e) => handleItemChange(index, "barcode", e.target.value)}
                                className="w-32 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                placeholder="Barcode"
                              />
                            </td>
                            <td className="px-3 py-3">
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 0)}
                                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                min="1"
                              />
                            </td>
                            <td className="px-3 py-3">
                              <input
                                type="number"
                                value={item.unitPrice}
                                onChange={(e) => handleItemChange(index, "unitPrice", parseFloat(e.target.value) || 0)}
                                className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                step="0.01"
                              />
                            </td>
                            <td className="px-3 py-3">
                              <input
                                type="number"
                                value={item.discount}
                                onChange={(e) => handleItemChange(index, "discount", parseFloat(e.target.value) || 0)}
                                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                step="0.01"
                              />
                            </td>
                            <td className="px-3 py-3">
                              <input
                                type="number"
                                value={item.tax}
                                onChange={(e) => handleItemChange(index, "tax", parseFloat(e.target.value) || 0)}
                                className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                                step="0.01"
                              />
                            </td>
                            <td className="px-3 py-3 font-medium text-teal-600">${item.total}</td>
                            <td className="px-3 py-3">
                              <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <MdDelete size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan="7" className="px-3 py-4 text-right font-semibold text-gray-700">
                            សរុបទាំងអស់:
                          </td>
                          <td className="px-3 py-4 font-bold text-xl text-teal-600">${calculateGrandTotal()}</td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  {errors.items && <p className="text-xs text-red-500 mt-3">{errors.items}</p>}
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <MdNote className="text-teal-600" />
                    ព័ត៌មានបន្ថែម
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">កាលបរិច្ឆេទទិញ</label>
                      <input
                        type="date"
                        name="purchaseDate"
                        value={purchaseData.purchaseDate}
                        onChange={handlePurchaseChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">កាលបរិច្ឆេទប្រគល់ជូន</label>
                      <input
                        type="date"
                        name="expectedDeliveryDate"
                        value={purchaseData.expectedDeliveryDate}
                        onChange={handlePurchaseChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">កំណត់ចំណាំ</label>
                      <textarea
                        name="notes"
                        value={purchaseData.notes}
                        onChange={handlePurchaseChange}
                        rows="3"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                        placeholder="បញ្ចូលកំណត់ចំណាំបន្ថែម..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2"
                >
                  <MdCancel size={18} /> បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all flex items-center gap-2"
                >
                  <MdSave size={18} /> រក្សាទុកលំដាប់ទិញ
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Receipt Form (Goods Received) */}
        {activeTab === "receipt" && (
          <form onSubmit={handleReceiptSubmit} className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MdReceipt className="text-teal-600" />
                  បញ្ជាក់ការទទួលទំនិញ
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      លេខបង្កាន់ដៃ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="receiptNumber"
                      value={receiptData.receiptNumber}
                      onChange={handleReceiptChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      placeholder="REC-2024-001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      លេខលំដាប់ទិញ
                    </label>
                    <input
                      type="text"
                      name="purchaseOrderId"
                      value={receiptData.purchaseOrderId}
                      onChange={handleReceiptChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      placeholder="PO-2024-001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      កាលបរិច្ឆេទទទួល
                    </label>
                    <input
                      type="date"
                      name="receivedDate"
                      value={receiptData.receivedDate}
                      onChange={handleReceiptChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      អ្នកទទួលទំនិញ
                    </label>
                    <input
                      type="text"
                      name="receivedBy"
                      value={receiptData.receivedBy}
                      onChange={handleReceiptChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      placeholder="ឈ្មោះអ្នកទទួល"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ការត្រួតពិនិត្យគុណភាព
                    </label>
                    <select
                      name="qualityCheck"
                      value={receiptData.qualityCheck}
                      onChange={handleReceiptChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="passed">ឆ្លងកាត់</option>
                      <option value="partial">ឆ្លងកាត់ខ្លះ</option>
                      <option value="failed">មិនឆ្លងកាត់</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="damagedItems"
                        checked={receiptData.damagedItems}
                        onChange={handleReceiptChange}
                        className="w-4 h-4 text-teal-600 focus:ring-teal-500 rounded"
                      />
                      <span className="text-sm text-gray-700">មានទំនិញខូចខាត</span>
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">កំណត់ចំណាំ</label>
                    <textarea
                      name="notes"
                      value={receiptData.notes}
                      onChange={handleReceiptChange}
                      rows="3"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      placeholder="បញ្ចូលកំណត់ចំណាំបន្ថែម..."
                    />
                  </div>
                </div>

                {/* Summary Card */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-5 mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">សរុបទំនិញ</p>
                      <p className="text-2xl font-bold text-gray-800">{items.length} មុខ</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">បរិមាណសរុប</p>
                      <p className="text-2xl font-bold text-gray-800">{items.reduce((sum, i) => sum + i.quantity, 0)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">តម្លៃសរុប</p>
                      <p className="text-2xl font-bold text-teal-600">${calculateGrandTotal()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">ស្ថានភាព</p>
                      <p className="text-sm font-medium text-green-600 bg-green-100 inline-block px-3 py-1 rounded-full">កំពុងដំណើរការ</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button
                  type="button"
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2"
                >
                  <MdCancel size={18} /> បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all flex items-center gap-2"
                >
                  <MdCheckCircle size={18} /> បញ្ជាក់ការទទួល
                </button>
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
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddPurchaseItem;