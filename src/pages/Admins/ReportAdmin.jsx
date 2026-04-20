import React, { useState } from "react";
import {
  MdDownload,
  MdPrint,
  MdDateRange,
  MdCategory,
  MdAttachMoney,
  MdInventory,
  MdPeople,
  MdLocalShipping,
  MdShoppingCart,
  MdTrendingUp,
  MdTrendingDown,
  MdFileDownload,
  MdWarning,
  MdPictureAsPdf,
  MdTableChart,
  MdEmail,
  MdShare,
  MdFilterList,
  MdCalendarToday,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { FaMoneyBillWave, FaChartLine, FaBoxes, FaUserMd, FaTruck, FaPills } from "react-icons/fa";
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

const ReportAdmin = () => {
  const [reportType, setReportType] = useState("sales");
  const [dateRange, setDateRange] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");
  const [showExportMenu, setShowExportMenu] = useState(false);

  const months = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
  const quarters = ["ត្រីមាសទី១", "ត្រីមាសទី២", "ត្រីមាសទី៣", "ត្រីមាសទី៤"];

  // Sample Data
  const salesData = {
    monthly: {
      labels: months,
      revenue: [12500, 13800, 14200, 15800, 16500, 17200, 18900, 19500, 20100, 21800, 23500, 25200],
      expenses: [6200, 6800, 7100, 7900, 8200, 8600, 9400, 9700, 10000, 10900, 11700, 12600],
      profit: [6300, 7000, 7100, 7900, 8300, 8600, 9500, 9800, 10100, 10900, 11800, 12600],
    },
    quarterly: {
      labels: quarters,
      revenue: [42500, 49500, 58500, 70500],
      expenses: [20100, 24700, 29100, 35200],
      profit: [22400, 24800, 29400, 35300],
    },
    yearly: {
      labels: ["2022", "2023", "2024"],
      revenue: [185000, 225000, 268000],
      expenses: [92000, 112000, 134000],
      profit: [93000, 113000, 134000],
    },
  };

  // Product sales data
  const topProducts = [
    { name: "ប៉ារ៉ាសេតាម៉ុល 500mg", sales: 1240, revenue: 620, percentage: 18 },
    { name: "វីតាមីន C 1000mg", sales: 2100, revenue: 1680, percentage: 25 },
    { name: "អាម៉ុកស៊ីលីន 500mg", sales: 890, revenue: 1068, percentage: 15 },
    { name: "ថ្នាំបំបាត់ការឈឺចាប់", sales: 1543, revenue: 1080, percentage: 16 },
    { name: "ថ្នាំបេះដូង", sales: 432, revenue: 777, percentage: 12 },
  ];

  // Category sales data
  const categorySales = [
    { name: "ថ្នាំបង្ការគ្រុន", revenue: 4250, percentage: 28 },
    { name: "វីតាមីន", revenue: 3850, percentage: 25 },
    { name: "ថ្នាំអង់ទីប៊ីយ៉ូទិក", revenue: 2950, percentage: 19 },
    { name: "ថ្នាំបេះដូង", revenue: 2150, percentage: 14 },
    { name: "ថ្នាំក្រពះ", revenue: 1250, percentage: 8 },
    { name: "ផ្សេងៗ", revenue: 950, percentage: 6 },
  ];

  // Staff performance data
  const staffPerformance = [
    { name: "ស្រី សុខា", sales: 245000, prescriptions: 1240, attendance: 96 },
    { name: "ច័ន្ទ សុផល", sales: 198000, prescriptions: 980, attendance: 94 },
    { name: "ជា រតនា", sales: 312000, prescriptions: 560, attendance: 98 },
    { name: "លី ហុង", sales: 145000, prescriptions: 890, attendance: 91 },
    { name: "ព្រំ វិចិត្រា", sales: 289000, prescriptions: 890, attendance: 97 },
  ];

  // Inventory data
  const inventoryData = [
    { name: "ស្តុកល្អ", value: 45, color: "#10B981" },
    { name: "ស្តុកមធ្យម", value: 25, color: "#F59E0B" },
    { name: "ស្តុកជិតអស់", value: 20, color: "#EF4444" },
    { name: "អស់ស្តុក", value: 10, color: "#6B7280" },
  ];

  // Supplier data
  const supplierData = [
    { name: "ភ្នំពេញ ឱសថការី", purchases: 125000, products: 245 },
    { name: "ឯកទេស ឱសថ", purchases: 156000, products: 234 },
    { name: "មេគង្គ ឱសថ", purchases: 89000, products: 156 },
    { name: "អង្គរ ឱសថស្ថាន", purchases: 45000, products: 89 },
  ];

  const currentData = salesData[dateRange === "monthly" ? "monthly" : dateRange === "quarterly" ? "quarterly" : "yearly"];
  
  const totalRevenue = currentData.revenue.reduce((a, b) => a + b, 0);
  const totalExpenses = currentData.expenses.reduce((a, b) => a + b, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = (totalProfit / totalRevenue * 100).toFixed(1);

  const reportTypes = [
    { id: "sales", name: "របាយការណ៍លក់", icon: FaChartLine, color: "teal" },
    { id: "product", name: "របាយការណ៍ផលិតផល", icon: FaPills, color: "blue" },
    { id: "staff", name: "របាយការណ៍បុគ្គលិក", icon: FaUserMd, color: "green" },
    { id: "inventory", name: "របាយការណ៍ស្តុក", icon: FaBoxes, color: "orange" },
    { id: "supplier", name: "របាយការណ៍អ្នកផ្គត់ផ្គង់", icon: FaTruck, color: "purple" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-800 mb-1">{label}</p>
          {payload.map((entry, idx) => (
            <p key={idx} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const StatCard = ({ title, value, icon: Icon, color, prefix = "$", suffix = "", subtitle = "" }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl bg-${color}-50`}>
          <Icon className={`text-${color}-600 text-xl`} />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{prefix}{value.toLocaleString()}{suffix}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );

  const renderSalesReport = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="ចំណូលសរុប" value={totalRevenue} icon={FaMoneyBillWave} color="teal" />
        <StatCard title="ចំណាយសរុប" value={totalExpenses} icon={MdAttachMoney} color="red" />
        <StatCard title="ប្រាក់ចំណេញសរុប" value={totalProfit} icon={MdTrendingUp} color="green" />
        <StatCard title="រឹមប្រាក់ចំណេញ" value={profitMargin} icon={FaChartLine} color="purple" suffix="%" />
      </div>

      {/* Revenue & Profit Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FaChartLine className="text-teal-600 text-lg" />
            <h3 className="font-semibold text-gray-800">ចំណូល ចំណាយ និងប្រាក់ចំណេញ</h3>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-teal-500" /><span className="text-gray-500">ចំណូល</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /><span className="text-gray-500">ចំណាយ</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500" /><span className="text-gray-500">ប្រាក់ចំណេញ</span></div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={currentData.labels.map((label, idx) => ({
            name: label,
            revenue: currentData.revenue[idx],
            expenses: currentData.expenses[idx],
            profit: currentData.profit[idx],
          }))} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="revenue" name="ចំណូល" fill="#0D9488" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" name="ចំណាយ" fill="#EF4444" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="profit" name="ប្រាក់ចំណេញ" stroke="#10B981" strokeWidth={2} dot={{ r: 4, fill: "#10B981" }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products & Category Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Selling Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <MdShoppingCart className="text-teal-600 text-lg" />
            <h3 className="font-semibold text-gray-800">ផលិតផលលក់ដាច់បំផុត</h3>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm font-bold">{idx + 1}</div>
                  <div>
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.sales.toLocaleString()} ដុំ</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-teal-600">${product.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{product.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Sales Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <MdCategory className="text-teal-600 text-lg" />
            <h3 className="font-semibold text-gray-800">ការលក់តាមប្រភេទ</h3>
          </div>
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={categorySales} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="revenue" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {categorySales.map((entry, idx) => (
                    <Cell key={idx} fill={["#0D9488", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"][idx]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {categorySales.map((cat, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ["#0D9488", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"][idx] }} />
                  <span className="text-xs text-gray-500">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderProductReport = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="ផលិតផលសរុប" value={156} icon={FaPills} color="teal" prefix="" />
        <StatCard title="ស្តុកសរុប" value={12450} icon={FaBoxes} color="blue" prefix="" />
        <StatCard title="ស្តុកជិតអស់" value={23} icon={MdInventory} color="orange" prefix="" />
        <StatCard title="អស់ស្តុក" value={8} icon={MdInventory} color="red" prefix="" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Stock Status Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">ស្ថានភាពស្តុក</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={inventoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                {inventoryData.map((entry, idx) => (<Cell key={idx} fill={entry.color} />))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">ផលិតផលលក់ដាច់</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-100">
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-2">ផលិតផល</th>
                  <th className="pb-2 text-right">លក់បាន</th>
                  <th className="pb-2 text-right">ចំណូល</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, idx) => (
                  <tr key={idx} className="border-b border-gray-50">
                    <td className="py-2 text-sm text-gray-700">{product.name}</td>
                    <td className="py-2 text-sm text-right">{product.sales.toLocaleString()}</td>
                    <td className="py-2 text-sm text-right font-medium text-teal-600">${product.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  const renderStaffReport = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="បុគ្គលិកសរុប" value={24} icon={FaUserMd} color="teal" prefix="" />
        <StatCard title="វត្តមានមធ្យម" value={94.5} icon={MdPeople} color="green" suffix="%" />
        <StatCard title="ការលក់សរុប" value={1528000} icon={MdAttachMoney} color="blue" />
        <StatCard title="វិក្កយបត្រសរុប" value={12450} icon={MdShoppingCart} color="purple" prefix="" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">ដំណើរការបុគ្គលិក</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100">
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-3">បុគ្គលិក</th>
                <th className="pb-3 text-right">ការលក់</th>
                <th className="pb-3 text-right">វិក្កយបត្រ</th>
                <th className="pb-3 text-right">វត្តមាន</th>
                <th className="pb-3 text-right">ដំណើរការ</th>
              </tr>
            </thead>
            <tbody>
              {staffPerformance.map((staff, idx) => (
                <tr key={idx} className="border-b border-gray-50">
                  <td className="py-3 text-sm font-medium text-gray-800">{staff.name}</td>
                  <td className="py-3 text-sm text-right">${staff.sales.toLocaleString()}</td>
                  <td className="py-3 text-sm text-right">{staff.prescriptions.toLocaleString()}</td>
                  <td className="py-3 text-sm text-right">{staff.attendance}%</td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${staff.attendance}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{staff.attendance}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderInventoryReport = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="ផលិតផលសរុប" value={156} icon={FaPills} color="teal" prefix="" />
        <StatCard title="តម្លៃស្តុកសរុប" value={45200} icon={MdAttachMoney} color="blue" />
        <StatCard title="ស្តុកជិតអស់" value={23} icon={MdWarning} color="orange" prefix="" />
        <StatCard title="ផុតកំណត់" value={5} icon={MdDateRange} color="red" prefix="" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">ស្តុកតាមប្រភេទ</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categorySales} layout="vertical" margin={{ left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickFormatter={(v) => `${v}`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={100} />
              <Tooltip />
              <Bar dataKey="revenue" name="ស្តុក" fill="#0D9488" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">ផលិតផលត្រូវការបញ្ជាទិញបន្ទាន់</h3>
          <div className="space-y-3">
            {topProducts.slice(0, 5).map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-500">ស្តុកនៅសល់: {Math.floor(Math.random() * 30)} គ្រាប់</p>
                </div>
                <button className="px-3 py-1 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700">បញ្ជាទិញ</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderSupplierReport = () => (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="អ្នកផ្គត់ផ្គង់សរុប" value={18} icon={FaTruck} color="teal" prefix="" />
        <StatCard title="ទិញសរុប" value={425000} icon={MdAttachMoney} color="blue" />
        <StatCard title="ផលិតផលសរុប" value={1240} icon={FaPills} color="green" prefix="" />
        <StatCard title="ការបញ្ជាទិញ" value={156} icon={MdShoppingCart} color="purple" prefix="" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">ប្រវត្តិការទិញពីអ្នកផ្គត់ផ្គង់</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100">
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-3">អ្នកផ្គត់ផ្គង់</th>
                <th className="pb-3 text-right">ទិញសរុប</th>
                <th className="pb-3 text-right">ផលិតផល</th>
                <th className="pb-3 text-right">ការបញ្ជាទិញចុងក្រោយ</th>
              </tr>
            </thead>
            <tbody>
              {supplierData.map((supplier, idx) => (
                <tr key={idx} className="border-b border-gray-50">
                  <td className="py-3 text-sm font-medium text-gray-800">{supplier.name}</td>
                  <td className="py-3 text-sm text-right">${supplier.purchases.toLocaleString()}</td>
                  <td className="py-3 text-sm text-right">{supplier.products}</td>
                  <td className="py-3 text-sm text-right text-gray-500">2024-12-{15 + idx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const currentReport = () => {
    switch(reportType) {
      case "sales": return renderSalesReport();
      case "product": return renderProductReport();
      case "staff": return renderStaffReport();
      case "inventory": return renderInventoryReport();
      case "supplier": return renderSupplierReport();
      default: return renderSalesReport();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">របាយការណ៍</h1>
              <p className="text-gray-500 text-sm mt-0.5">មើល និងទាញយករបាយការណ៍គ្រប់ប្រភេទ</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <MdDownload size={18} />
                  <span>ទាញយករបាយការណ៍</span>
                </button>
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-10">
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 rounded-t-xl flex items-center gap-2">
                      <MdPictureAsPdf className="text-red-500" /> PDF
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                      <MdTableChart className="text-green-500" /> Excel
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 rounded-b-xl flex items-center gap-2">
                      <MdPrint className="text-gray-500" /> បោះពុម្ព
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Report Type Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-6">
          <div className="flex flex-wrap gap-1">
            {reportTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setReportType(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    reportType === type.id
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={16} />
                  {type.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setDateRange("monthly")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    dateRange === "monthly" ? "bg-teal-600 text-white" : "text-gray-600"
                  }`}
                >
                  ប្រចាំខែ
                </button>
                <button
                  onClick={() => setDateRange("quarterly")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    dateRange === "quarterly" ? "bg-teal-600 text-white" : "text-gray-600"
                  }`}
                >
                  ត្រីមាស
                </button>
                <button
                  onClick={() => setDateRange("yearly")}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    dateRange === "yearly" ? "bg-teal-600 text-white" : "text-gray-600"
                  }`}
                >
                  ប្រចាំឆ្នាំ
                </button>
              </div>
              {dateRange === "monthly" && (
                <div className="flex items-center gap-2">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <MdChevronLeft size={18} />
                  </button>
                  <span className="text-sm font-medium text-gray-700">{months[selectedMonth]} {selectedYear}</span>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                    <MdChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MdDateRange size={16} />
              <span>ចាប់ពី {startDate} ដល់ {endDate}</span>
            </div>
          </div>
        </div>

        {/* Report Content */}
        {currentReport()}
      </div>
    </div>
  );
};

export default ReportAdmin;