import React, { useState } from "react";
import {
  MdSearch,
  MdAdd,
  MdWarning,
  MdCheckCircle,
  MdDownload,
  MdPrint,
  MdTrendingUp,
  MdTrendingDown,
  MdCalendarToday,
  MdLocalShipping,
  MdCategory,
} from "react-icons/md";
import { FaBuilding, FaBoxes, FaTruck, FaMoneyBillWave, FaChartLine, FaWallet } from "react-icons/fa";
import {
  LineChart,
  Line,
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
  Area,
  ComposedChart,
} from "recharts";
import useSupplierDashboard from "../../../hook/supplier/useSupplierDashboard";

const Supplier = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { dashboardData, loading } = useSupplierDashboard(selectedYear, selectedMonth + 1);

  const months = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
  
  // Safe data extraction with fallbacks
  const suppliers = dashboardData?.suppliers || [];
  const summary = dashboardData?.summary || {
    total_expense: 0,
    current_month_expense: 0,
    trend: 0,
    total_suppliers: 0,
    total_products: 0
  };
  const monthlyTrend = dashboardData?.monthly_trend || [];
  const pieChartData = dashboardData?.pie_chart_data || [];
  const topSuppliers = dashboardData?.top_suppliers || [];

  // Use pieChartData from API for category cards and bar chart
  const categoryCards = pieChartData.length > 0 ? pieChartData : [];

  // Filter suppliers
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = (supplier.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (supplier.nameEn || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || supplier.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const uniqueCategories = [...new Set(suppliers.map(s => s.category).filter(Boolean))];

  const formatCurrency = (amount) => {
    const numAmount = parseFloat(amount) || 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(numAmount);
  };

  const getStatusBadge = (status) => {
    if (status === "active") {
      return <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-600"><MdCheckCircle size={10} /> សកម្ម</span>;
    }
    return <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-500"><MdWarning size={10} /> អសកម្ម</span>;
  };

  const StatCard = ({ title, value, icon: Icon, color, prefix = "$", suffix = "", trendValue = null }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl bg-${color}-50`}>
          <Icon className={`text-${color}-600 text-xl`} />
        </div>
        {trendValue !== null && (
          <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trendValue >= 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
            {trendValue >= 0 ? <MdTrendingUp size={12} /> : <MdTrendingDown size={12} />}
            {Math.abs(trendValue)}%
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{prefix}{(value || 0).toLocaleString()}{suffix}</p>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-800 mb-1">{label}</p>
          <p className="text-sm text-teal-600">{formatCurrency(payload[0].value || 0)}</p>
        </div>
      );
    }
    return null;
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
        <div className="px-6 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">អ្នកផ្គត់ផ្គង់</h1>
              <p className="text-gray-500 text-sm mt-0.5">គ្រប់គ្រង និងតាមដានព័ត៌មានអ្នកផ្គត់ផ្គង់ទាំងអស់</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
                >
                  {months.map((month, idx) => (
                    <option key={idx} value={idx}>{month} {selectedYear}</option>
                  ))}
                </select>
                <MdCalendarToday className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
              <a href="/add-supplier" className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                <MdAdd size={20} />
                <span>បន្ថែមអ្នកផ្គត់ផ្គង់ថ្មី</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard title="ចំណាយសរុប" value={summary.total_expense} icon={FaMoneyBillWave} color="teal" trendValue={12.5} />
          <StatCard title={`ចំណាយប្រចាំខែ (${months[selectedMonth]})`} value={summary.current_month_expense} icon={FaWallet} color="purple" trendValue={summary.trend} />
          <StatCard title="អ្នកផ្គត់ផ្គង់សរុប" value={summary.total_suppliers} icon={FaBuilding} color="blue" prefix="" />
          <StatCard title="ផលិតផលសរុប" value={summary.total_products} icon={FaBoxes} color="green" prefix="" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart - Monthly Expense Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FaChartLine className="text-teal-600 text-lg" />
                <h3 className="font-semibold text-gray-800">និន្នាការចំណាយប្រចាំខែ</h3>
              </div>
              <div className="text-xs text-gray-400">ឆ្នាំ {selectedYear}</div>
            </div>
            {monthlyTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={monthlyTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false}/>
                  <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} interval={2}/>
                  <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip />}/>
                  <Legend />
                  <Area type="monotone" dataKey="expense" name="ចំណាយ" stroke="#0D9488" strokeWidth={2} fill="url(#expenseGradient)" />
                  <Line type="monotone" dataKey="expense" name="ចំណាយ" stroke="#0D9488" strokeWidth={2} dot={{ fill: "#0D9488", r: 4 }} activeDot={{ r: 6 }}/>
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-400">
                <p>មិនមានទិន្នន័យសម្រាប់ឆ្នាំនេះទេ</p>
              </div>
            )}
          </div>

          {/* Pie Chart - Category Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MdCategory className="text-teal-600 text-lg" />
                <h3 className="font-semibold text-gray-800">ការចែកចាយចំណាយតាមប្រភេទ</h3>
              </div>
              <div className="text-xs text-gray-400">{months[selectedMonth]}</div>
            </div>
            {pieChartData.length > 0 ? (
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                <ResponsiveContainer width="60%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color || ["#0D9488", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][index % 5]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-2">
                  {pieChartData.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color || ["#0D9488", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][idx % 5] }} />
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-semibold text-gray-800">{formatCurrency(item.value || 0)}</span>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t border-gray-100 flex justify-between">
                    <span className="text-sm font-medium text-gray-700">សរុប</span>
                    <span className="font-bold text-teal-600">{formatCurrency(summary.current_month_expense || 0)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-400">
                <p>មិនមានទិន្នន័យសម្រាប់ខែនេះទេ</p>
              </div>
            )}
          </div>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart - Top 5 Suppliers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <FaTruck className="text-teal-600 text-lg" />
              <h3 className="font-semibold text-gray-800">អ្នកផ្គត់ផ្គង់កំពូលទាំង ៥</h3>
            </div>
            {topSuppliers.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={topSuppliers} layout="vertical" margin={{ left: 40, right: 20, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                  <XAxis type="number" tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} width={100} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="totalPurchased" name="ចំណាយសរុប" fill="#0D9488" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-400">
                <p>មិនមានទិន្នន័យអ្នកផ្គត់ផ្គង់</p>
              </div>
            )}
          </div>

          {/* Category Expense Bars */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <MdLocalShipping className="text-teal-600 text-lg" />
              <h3 className="font-semibold text-gray-800">ចំណាយតាមប្រភេទ (ប្រចាំខែ)</h3>
            </div>
            {categoryCards.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={categoryCards} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, angle: -15, textAnchor: "end" }} height={60} interval={0} />
                  <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="value" name="ចំណាយ" fill="#0D9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-400">
                <p>មិនមានទិន្នន័យសម្រាប់ខែនេះទេ</p>
              </div>
            )}
          </div>
        </div>

        {/* Category Expense Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {categoryCards.length > 0 ? (
            categoryCards.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">{item.name}</p>
                    <p className="text-lg font-bold text-teal-600">{formatCurrency(item.value || 0)}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color || "#0D9488"}20` }}>
                    <MdCategory style={{ color: item.color || "#0D9488" }} size={16} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-400">
              <p>មិនមានទិន្នន័យបង្ហាញ</p>
            </div>
          )}
        </div>

        {/* Supplier List Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="ស្វែងរកអ្នកផ្គត់ផ្គង់..."
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
                  <option value="all">ប្រភេទទាំងអស់</option>
                  {uniqueCategories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                  <MdDownload size={18} />
                  <span className="text-sm">ទាញយក</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                  <MdPrint size={18} />
                  <span className="text-sm">បោះពុម្ព</span>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-sm font-medium text-gray-500">
                  <th className="px-4 py-3">អ្នកផ្គត់ផ្គង់</th>
                  <th className="px-4 py-3">អ្នកទំនាក់ទំនង</th>
                  <th className="px-4 py-3">ប្រភេទ</th>
                  <th className="px-4 py-3">ទូរស័ព្ទ</th>
                  <th className="px-4 py-3">ចំណាយសរុប</th>
                  <th className="px-4 py-3">ចំណាយប្រចាំខែ</th>
                  <th className="px-4 py-3">ស្ថានភាព</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={supplier.avatar || "https://randomuser.me/api/portraits/men/1.jpg"} alt={supplier.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <span className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">{supplier.name}</span>
                          <p className="text-xs text-gray-400">{supplier.nameEn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{supplier.contactPerson || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-teal-50 text-teal-600">{supplier.category || "ផ្សេងៗ"}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{supplier.phone}</td>
                    <td className="px-4 py-3 text-sm font-medium text-teal-600">{formatCurrency(supplier.totalPurchased || 0)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{formatCurrency(supplier.currentMonthExpense || 0)}</td>
                    <td className="px-4 py-3">{getStatusBadge(supplier.status)}</td>
                    <td className="px-4 py-3">
                      <a href={`/supplier-detail/${supplier.id}`} className="text-teal-600 hover:text-teal-700 text-sm font-medium">មើលលម្អិត</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSuppliers.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <FaBuilding className="text-5xl mx-auto mb-3 opacity-30" />
              <p>មិនមានទិន្នន័យអ្នកផ្គត់ផ្គង់</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Supplier;