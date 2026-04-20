import React, { useState } from "react";
import {
  MdSearch,
  MdAdd,
  MdDelete,
  MdEdit,
  MdMoreVert,
  MdCategory,
  MdWarning,
  MdCheckCircle,
  MdCancel,
  MdAccessTime,
  MdLocalOffer,
  MdStar,
  MdStarBorder,
} from "react-icons/md";
import { FaPills, FaBoxes, FaShoppingCart } from "react-icons/fa";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Product Data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "ប៉ារ៉ាសេតាម៉ុល 500mg",
      nameEn: "Paracetamol 500mg",
      category: "ថ្នាំបង្ការគ្រុន",
      price: 0.50,
      stock: 245,
      unit: "គ្រាប់",
      expiry: "2025-12-31",
      prescription: false,
      status: "active",
      sales: 1240,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "អាម៉ុកស៊ីលីន 500mg",
      nameEn: "Amoxicillin 500mg",
      category: "ថ្នាំអង់ទីប៊ីយ៉ូទិក",
      price: 1.20,
      stock: 189,
      unit: "គ្រាប់",
      expiry: "2025-10-15",
      prescription: true,
      status: "active",
      sales: 890,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "វីតាមីន C 1000mg",
      nameEn: "Vitamin C 1000mg",
      category: "វីតាមីន",
      price: 0.80,
      stock: 320,
      unit: "គ្រាប់",
      expiry: "2026-06-30",
      prescription: false,
      status: "active",
      sales: 2100,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1616675784282-9e0d6e7b7b7b?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      name: "ថ្នាំបង្ការសម្ពាធឈាម",
      nameEn: "Amlodipine 5mg",
      category: "ថ្នាំបេះដូង",
      price: 1.50,
      stock: 156,
      unit: "គ្រាប់",
      expiry: "2025-05-20",
      prescription: true,
      status: "active",
      sales: 567,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop",
    },
    {
      id: 5,
      name: "ថ្នាំបេះដូង",
      nameEn: "Losartan 50mg",
      category: "ថ្នាំបេះដូង",
      price: 1.80,
      stock: 98,
      unit: "គ្រាប់",
      expiry: "2025-04-10",
      prescription: true,
      status: "low_stock",
      sales: 432,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=100&h=100&fit=crop",
    },
    {
      id: 6,
      name: "ថ្នាំផ្សះ",
      nameEn: "Omeprazole 20mg",
      category: "ថ្នាំក្រពះ",
      price: 0.90,
      stock: 210,
      unit: "គ្រាប់",
      expiry: "2025-11-25",
      prescription: false,
      status: "active",
      sales: 876,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1616675784282-9e0d6e7b7b7b?w=100&h=100&fit=crop",
    },
    {
      id: 7,
      name: "ថ្នាំបំបាត់ការឈឺចាប់",
      nameEn: "Ibuprofen 400mg",
      category: "ថ្នាំបង្ការគ្រុន",
      price: 0.70,
      stock: 45,
      unit: "គ្រាប់",
      expiry: "2025-12-01",
      prescription: false,
      status: "low_stock",
      sales: 1543,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop",
    },
    {
      id: 8,
      name: "ស៊ីរ៉ូក្អក",
      nameEn: "Cough Syrup",
      category: "ថ្នាំក្អក",
      price: 3.50,
      stock: 65,
      unit: "ដប",
      expiry: "2025-12-01",
      prescription: false,
      status: "low_stock",
      sales: 234,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1616675784282-9e0d6e7b7b7b?w=100&h=100&fit=crop",
    },
  ]);

  const categories = ["ទាំងអស់", "ថ្នាំបង្ការគ្រុន", "ថ្នាំអង់ទីប៊ីយ៉ូទិក", "វីតាមីន", "ថ្នាំបេះដូង", "ថ្នាំក្រពះ", "ថ្នាំក្អក"];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (stock) => {
    if (stock <= 0) return { color: "text-red-500", bg: "bg-red-50", text: "អស់ស្តុក", icon: <MdCancel size={14} /> };
    if (stock <= 50) return { color: "text-orange-500", bg: "bg-orange-50", text: "ជិតអស់", icon: <MdWarning size={14} /> };
    return { color: "text-green-500", bg: "bg-green-50", text: "មានស្តុក", icon: <MdCheckCircle size={14} /> };
  };

  const getPrescriptionBadge = (prescription) => {
    if (prescription) {
      return <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600">ត្រូវការវេជ្ជបញ្ជា</span>;
    }
    return <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600">OTC</span>;
  };

  const handleDelete = () => {
    setProducts(products.filter(p => p.id !== selectedProduct.id));
    setShowDeleteConfirm(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">បញ្ជីផលិតផល</h1>
              <p className="text-gray-500 text-sm mt-0.5">គ្រប់គ្រង និងតាមដានព័ត៌មានផលិតផលទាំងអស់</p>
            </div>
            <a href="/add-product" className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
              <MdAdd size={20} />
              <span>បន្ថែមផលិតផលថ្មី</span>
            </a>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="ស្វែងរកផលិតផល..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat === "ទាំងអស់" ? "all" : cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Product List View (Table Only) */}
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-100">
                    <th className="px-4 py-3">ផលិតផល</th>
                    <th className="px-4 py-3">ប្រភេទ</th>
                    <th className="px-4 py-3">តម្លៃ</th>
                    <th className="px-4 py-3">ស្តុក</th>
                    <th className="px-4 py-3">លក់បាន</th>
                    <th className="px-4 py-3">ថ្ងៃផុតកំណត់</th>
                    <th className="px-4 py-3">ស្ថានភាព</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock);
                    return (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                              <FaPills className="text-teal-600" size={14} />
                            </div>
                            <div>
                              <span className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">
                                {product.name}
                              </span>
                              <p className="text-xs text-gray-400">{product.nameEn}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs px-2 py-1 rounded-full bg-teal-50 text-teal-600">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-teal-600">${product.price.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <span className={`text-sm font-medium ${stockStatus.color}`}>
                            {product.stock} {product.unit}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{product.sales.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{product.expiry}</td>
                        <td className="px-4 py-3">
                          <div className={`flex items-center gap-1 ${stockStatus.bg} px-2 py-1 rounded-full w-fit`}>
                            {stockStatus.icon}
                            <span className={`text-xs ${stockStatus.color}`}>{stockStatus.text}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <a href={`/edit-product/${product.id}`} className="p-1 text-gray-400 hover:text-teal-600 transition-colors">
                              <MdEdit size={16} />
                            </a>
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowDeleteConfirm(true);
                              }}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <MdDelete size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <FaPills className="text-5xl mx-auto mb-3 opacity-30" />
              <p>មិនមានទិន្នន័យផលិតផល</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdDelete className="text-red-600 text-3xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">លុបផលិតផល</h2>
              <p className="text-gray-500 mb-6">
                តើអ្នកច្បាស់ជាចង់លុបផលិតផល <span className="font-semibold text-gray-800">{selectedProduct.name}</span> មែនទេ?<br />
                សកម្មភាពនេះមិនអាចស្តារឡើងវិញបានទេ។
              </p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  បោះបង់
                </button>
                <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                  លុប
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;