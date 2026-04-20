import React, { useState } from "react";
import {
  MdCategory,
  MdInventory,
  MdWarning,
  MdCheckCircle,
  MdCancel,
  MdTrendingUp,
  MdAccessTime,
  MdCalendarToday,
  MdLocalOffer,
} from "react-icons/md";
import { FaPills, FaBoxes, FaShoppingCart, FaChartLine, FaExclamationTriangle, FaClock } from "react-icons/fa";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";

const ProductDashboard = () => {
  // Product Data
  const products = [
    { id: 1, name: "ប៉ារ៉ាសេតាម៉ុល 500mg", category: "ថ្នាំបង្ការគ្រុន", stock: 245, expiry: "2025-12-31", sales: 1240 },
    { id: 2, name: "អាម៉ុកស៊ីលីន 500mg", category: "ថ្នាំអង់ទីប៊ីយ៉ូទិក", stock: 189, expiry: "2025-10-15", sales: 890 },
    { id: 3, name: "វីតាមីន C 1000mg", category: "វីតាមីន", stock: 320, expiry: "2026-06-30", sales: 2100 },
    { id: 4, name: "ថ្នាំបង្ការសម្ពាធឈាម", category: "ថ្នាំបេះដូង", stock: 156, expiry: "2025-05-20", sales: 567 },
    { id: 5, name: "ថ្នាំបេះដូង", category: "ថ្នាំបេះដូង", stock: 98, expiry: "2025-04-10", sales: 432 },
    { id: 6, name: "ថ្នាំផ្សះ", category: "ថ្នាំក្រពះ", stock: 210, expiry: "2025-11-25", sales: 876 },
    { id: 7, name: "ថ្នាំបំបាត់ការឈឺចាប់", category: "ថ្នាំបង្ការគ្រុន", stock: 45, expiry: "2025-12-01", sales: 1543 },
    { id: 8, name: "ស៊ីរ៉ូក្អក", category: "ថ្នាំក្អក", stock: 65, expiry: "2025-12-01", sales: 234 },
    { id: 9, name: "ថ្នាំលាបស្បែក", category: "ថ្នាំលាប", stock: 28, expiry: "2025-03-15", sales: 189 },
    { id: 10, name: "វីតាមីន B Complex", category: "វីតាមីន", stock: 145, expiry: "2026-03-15", sales: 678 },
    { id: 11, name: "ថ្នាំគ្រាប់កាល់ស្យូម", category: "វីតាមីន", stock: 32, expiry: "2025-06-10", sales: 345 },
    { id: 12, name: "ថ្នាំប៉ារ៉ាសេតាម៉ុល 250mg", category: "ថ្នាំបង្ការគ្រុន", stock: 0, expiry: "2025-12-20", sales: 890 },
  ];

  const today = new Date();
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(today.getMonth() + 3);

  // Statistics
  const stats = {
    totalProducts: products.length,
    totalStock: products.reduce((sum, p) => sum + p.stock, 0),
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 50).length,
    outOfStock: products.filter(p => p.stock === 0).length,
    expiringSoon: products.filter(p => {
      const expiry = new Date(p.expiry);
      return expiry >= today && expiry < threeMonthsLater;
    }).length,
    expired: products.filter(p => new Date(p.expiry) < today).length,
    topSelling: products.filter(p => p.sales > 1000).length,
  };

  // Category data
  const categories = ["ថ្នាំបង្ការគ្រុន", "ថ្នាំអង់ទីប៊ីយ៉ូទិក", "វីតាមីន", "ថ្នាំបេះដូង", "ថ្នាំក្រពះ", "ថ្នាំក្អក", "ថ្នាំលាប"];
  
  const categoryData = categories.map(cat => ({
    name: cat,
    stock: products.filter(p => p.category === cat).reduce((sum, p) => sum + p.stock, 0),
    count: products.filter(p => p.category === cat).length,
    lowStock: products.filter(p => p.category === cat && p.stock <= 50 && p.stock > 0).length,
  }));

  // Stock distribution for pie chart
  const stockDistribution = [
    { name: "ស្តុកល្អ (>100)", value: products.filter(p => p.stock > 100).length, color: "#10B981" },
    { name: "ស្តុកមធ្យម (51-100)", value: products.filter(p => p.stock >= 51 && p.stock <= 100).length, color: "#F59E0B" },
    { name: "ស្តុកជិតអស់ (1-50)", value: products.filter(p => p.stock >= 1 && p.stock <= 50).length, color: "#EF4444" },
    { name: "អស់ស្តុក (0)", value: products.filter(p => p.stock === 0).length, color: "#6B7280" },
  ];

  // Expiry distribution
  const expiryDistribution = [
    { name: "ល្អ", value: products.filter(p => new Date(p.expiry) >= threeMonthsLater).length, color: "#10B981" },
    { name: "ជិតផុតកំណត់", value: products.filter(p => {
      const expiry = new Date(p.expiry);
      return expiry >= today && expiry < threeMonthsLater;
    }).length, color: "#F59E0B" },
    { name: "ផុតកំណត់", value: products.filter(p => new Date(p.expiry) < today).length, color: "#EF4444" },
  ];

  // Top selling products
  const topSelling = [...products].sort((a, b) => b.sales - a.sales).slice(0, 5);
  
  // Low stock products (urgent)
  const urgentLowStock = products.filter(p => p.stock > 0 && p.stock <= 30).sort((a, b) => a.stock - b.stock);
  
  // Expiring soon products
  const expiringSoonProducts = products.filter(p => {
    const expiry = new Date(p.expiry);
    return expiry >= today && expiry < threeMonthsLater;
  }).sort((a, b) => new Date(a.expiry) - new Date(b.expiry));

  const StatCard = ({ title, value, icon: Icon, color, suffix = "", bgColor = "" }) => (
    <div className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 ${bgColor}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl bg-${color}-50`}>
          <Icon className={`text-${color}-600 text-xl`} />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value.toLocaleString()}{suffix}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ផលិតផល</h1>
              <p className="text-gray-500 text-sm mt-0.5">សង្ខេបរបាយការណ៍ និងស្ថិតិផលិតផលទាំងអស់</p>
            </div>
            <div className="flex gap-3">
              <a href="/products" className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all">
                <FaPills size={18} />
                <span>បញ្ជីផលិតផល</span>
              </a>
              <a href="/add-product" className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                <MdLocalOffer size={18} />
                <span>បន្ថែមផលិតផល</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard title="ផលិតផលសរុប" value={stats.totalProducts} icon={FaPills} color="teal" suffix="" />
          <StatCard title="ស្តុកសរុប" value={stats.totalStock} icon={FaBoxes} color="blue" suffix="" />
          <StatCard title="ស្តុកជិតអស់" value={stats.lowStock} icon={MdWarning} color="orange" suffix="" />
          <StatCard title="អស់ស្តុក" value={stats.outOfStock} icon={MdCancel} color="red" suffix="" />
          <StatCard title="ជិតផុតកំណត់" value={stats.expiringSoon} icon={FaClock} color="yellow" suffix="" />
          <StatCard title="ផុតកំណត់" value={stats.expired} icon={FaExclamationTriangle} color="red" suffix="" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Stock Status Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <MdInventory className="text-teal-600 text-lg" />
              <h3 className="font-semibold text-gray-800">ស្ថានភាពស្តុក</h3>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
              <ResponsiveContainer width="55%" height={250}>
                <PieChart>
                  <Pie
                    data={stockDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {stockDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {stockDistribution.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800">{item.value}</span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-gray-100 flex justify-between">
                  <span className="text-sm font-medium text-gray-700">សរុប</span>
                  <span className="font-bold text-teal-600">{stats.totalProducts}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expiry Status Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <MdCalendarToday className="text-teal-600 text-lg" />
              <h3 className="font-semibold text-gray-800">ស្ថានភាពថ្ងៃផុតកំណត់</h3>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
              <ResponsiveContainer width="55%" height={250}>
                <PieChart>
                  <Pie
                    data={expiryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {expiryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {expiryDistribution.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800">{item.value}</span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-gray-100 flex justify-between">
                  <span className="text-sm font-medium text-gray-700">សរុប</span>
                  <span className="font-bold text-teal-600">{stats.totalProducts}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Stock Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MdCategory className="text-teal-600 text-lg" />
            <h3 className="font-semibold text-gray-800">ស្តុកតាមប្រភេទ</h3>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={categoryData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, angle: -15, textAnchor: "end" }} height={60} interval={0} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" name="ស្តុកសរុប" fill="#0D9488" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lowStock" name="ស្តុកជិតអស់" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Low Stock Alert */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white rounded-t-xl">
              <div className="flex items-center gap-2">
                <MdWarning className="text-orange-500 text-lg" />
                <h3 className="font-semibold text-gray-800">ស្តុកជិតអស់ (បន្ទាន់)</h3>
                <span className="ml-auto text-xs text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">{urgentLowStock.length} មុខ</span>
              </div>
            </div>
            <div className="p-3 max-h-[300px] overflow-y-auto">
              {urgentLowStock.length > 0 ? (
                urgentLowStock.map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-orange-600">{product.stock}</p>
                      <p className="text-xs text-gray-400">នៅសល់</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <MdCheckCircle className="text-4xl mx-auto mb-2 text-green-500" />
                  <p>ស្តុកទាំងអស់ល្អប្រសើរ</p>
                </div>
              )}
            </div>
          </div>

          {/* Expiring Soon Alert */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-white rounded-t-xl">
              <div className="flex items-center gap-2">
                <FaClock className="text-yellow-500 text-lg" />
                <h3 className="font-semibold text-gray-800">ផលិតផលជិតផុតកំណត់</h3>
                <span className="ml-auto text-xs text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">{expiringSoonProducts.length} មុខ</span>
              </div>
            </div>
            <div className="p-3 max-h-[300px] overflow-y-auto">
              {expiringSoonProducts.length > 0 ? (
                expiringSoonProducts.map(product => {
                  const daysLeft = Math.ceil((new Date(product.expiry) - today) / (1000 * 60 * 60 * 24));
                  return (
                    <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                      <div>
                        <p className="font-medium text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-400">ផុតកំណត់: {product.expiry}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-yellow-600">{daysLeft} ថ្ងៃទៀត</p>
                        <p className="text-xs text-gray-400">នៅសល់ {product.stock}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <MdCheckCircle className="text-4xl mx-auto mb-2 text-green-500" />
                  <p>គ្មានផលិតផលជិតផុតកំណត់</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white rounded-t-xl">
            <div className="flex items-center gap-2">
              <FaShoppingCart className="text-teal-600 text-lg" />
              <h3 className="font-semibold text-gray-800">ផលិតផលលក់ដាច់បំផុត</h3>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {topSelling.map((product, idx) => (
                <div key={product.id} className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-2 font-bold">
                    {idx + 1}
                  </div>
                  <p className="font-medium text-gray-800 text-sm">{product.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{product.category}</p>
                  <p className="text-lg font-bold text-teal-600 mt-2">{product.sales.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">ដុំ</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;