import { useState, useEffect } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Area,
  ComposedChart,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Calendar,
  TrendingUp,
  Package,
  FileText,
  DollarSign,
  CreditCard,
  Pill,
  Smartphone,
  Banknote,
  Landmark,
  QrCode,
} from "lucide-react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { getSalesStats } from "../../services/auth";

const salesData = [
  {
    month: "មករា",
    prescriptions: 1240,
    revenue: 998400,
    expense: 499200,
    otc: 890,
  },
  {
    month: "កុម្ភៈ",
    prescriptions: 1380,
    revenue: 1120000,
    expense: 560000,
    otc: 950,
  },
  {
    month: "មីនា",
    prescriptions: 1420,
    revenue: 1250000,
    expense: 625000,
    otc: 1020,
  },
  {
    month: "មេសា",
    prescriptions: 1580,
    revenue: 1380000,
    expense: 690000,
    otc: 1150,
  },
  {
    month: "ឧសភា",
    prescriptions: 1650,
    revenue: 1520000,
    expense: 760000,
    otc: 1280,
  },
  {
    month: "មិថុនា",
    prescriptions: 1720,
    revenue: 1680000,
    expense: 840000,
    otc: 1350,
  },
  {
    month: "កក្កដា",
    prescriptions: 1890,
    revenue: 180000,
    expense: 925000,
    otc: 1490,
  },
  {
    month: "សីហា",
    prescriptions: 1950,
    revenue: 2000000,
    expense: 1000000,
    otc: 1620,
  },
  {
    month: "កញ្ញា",
    prescriptions: 2010,
    revenue: 2150000,
    expense: 1075000,
    otc: 1750,
  },
  {
    month: "តុលា",
    prescriptions: 2180,
    revenue: 2300000,
    expense: 1150000,
    otc: 1910,
  },
  {
    month: "វិច្ឆិកា",
    prescriptions: 2350,
    revenue: 2500000,
    expense: 1250000,
    otc: 2080,
  },
  {
    month: "ធ្នូ",
    prescriptions: 2520,
    revenue: 2750000,
    expense: 1375000,
    otc: 2290,
  },
];

const COLORS = {
  cash: "#10B981",
  card: "#3B82F6",
  qr: "#8B5CF6",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}:{" "}
            {(entry.name === "ប្រាក់ចំណូល" || entry.name === "ចំណាយ")
              ? `$${entry.value.toLocaleString()}`
              : entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Dashboard = ({ isAnimationActive = true }) => {
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [paymentStats, setPaymentStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch payment stats from API
  useEffect(() => {
    const fetchPaymentStats = async () => {
      try {
        const res = await getSalesStats();
        const data = res?.data?.data || res?.data || res;
        setPaymentStats(data?.payment_methods || null);
      } catch (error) {
        console.error("Error fetching payment stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentStats();
  }, []);

  const metrics = [
    { key: "revenue", label: "ប្រាក់ចំណូលនិងចំណាយ", icon: FaMoneyBillTrendUp },
    { key: "units", label: "ប្រាក់ចំណេញសរុប", icon: Package },
    { key: "otc", label: "ចំនួនវិក្កយបត្រ", icon: TrendingUp },
  ];

  const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <div
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${color}10` }}
        >
          <Icon className="text-xl" style={{ color: color }} />
        </div>
        {trend && (
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            +{trend}%
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">
        {title.includes("ប្រាក់") ? "$" : ""}
        {value.toLocaleString()}
      </p>
    </div>
  );

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpense = salesData.reduce((sum, item) => sum + item.expense, 0);
  const totalPrescriptions = salesData.reduce(
    (sum, item) => sum + item.prescriptions,
    0,
  );
  const avgGrowth = 12.5;
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Prepare pie chart data
  const pieChartData = paymentStats
    ? [
        { name: "សាច់ប្រាក់", value: paymentStats.cash || 0, color: COLORS.cash, icon: <Banknote size={16} /> },
        { name: "ប័ណ្ណឥណទាន", value: paymentStats.card || 0, color: COLORS.card, icon: <CreditCard size={16} /> },
        { name: "ស្កេន QR", value: paymentStats.qr || 0, color: COLORS.qr, icon: <Smartphone size={16} /> },
      ]
    : [];

  const totalPaymentValue = paymentStats
    ? (paymentStats.cash || 0) + (paymentStats.card || 0) + (paymentStats.qr || 0)
    : 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="ប្រាក់ចំណូលសរុប"
          value={totalRevenue}
          icon={FaMoneyBillTrendUp}
          trend={avgGrowth}
          color="#0D9488"
        />

        <StatCard
          title="ប្រាក់ចំណាយសរុប"
          value={totalExpense}
          icon={CreditCard}
          trend={avgGrowth - 2}
          color="#EF4444"
        />

        <StatCard
          title="ចំនួនវិក្កយបត្រសរុប"
          value={totalPrescriptions}
          icon={FileText}
          trend={avgGrowth - 2}
          color="#0D9488"
        />

        <StatCard
          title="ប្រាក់ចំណេញសរុប"
          value={totalRevenue - totalExpense}
          icon={DollarSign}
          trend={avgGrowth + 3}
          color="#10B981"
        />
      </div>

      {/* Payment Methods Distribution - NEW SECTION */}
      {!loading && paymentStats && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">ការចែកចាយតាមវិធីបង់ប្រាក់</h2>
              <p className="text-sm text-gray-500 mt-1">សរុបទឹកប្រាក់ដែលបានបង់តាមវិធីនីមួយៗ</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Landmark size={14} />
                <span>ទិន្នន័យពីការលក់ទាំងអស់</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-500 mt-2">សរុបទឹកប្រាក់: <span className="font-bold text-teal-600">${totalPaymentValue.toLocaleString()}</span></p>
            </div>

            {/* Legend with values */}
            <div className="flex flex-col justify-center space-y-4">
              {pieChartData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800" style={{ color: item.color }}>
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {((item.value / totalPaymentValue) * 100).toFixed(1)}% នៃការលក់សរុប
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">${item.value.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">ទឹកប្រាក់សរុប</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chart Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              {metrics.map((metric) => (
                <button
                  key={metric.key}
                  onClick={() => setSelectedMetric(metric.key)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedMetric === metric.key
                      ? "bg-[#0D9488] shadow-sm text-white"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {metric.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-teal-500 cursor-pointer"
            >
              <option value="all">ប្រចាំថ្ងៃ</option>
              <option value="OTC">ប្រចាំខែ</option>
              <option value="Others">ផ្សេងៗ</option>
            </select>
            <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Chart */}
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <ComposedChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
                tickFormatter={(value) => {
                  if (selectedMetric === "revenue") return `$${value / 1000}k`;
                  return value.toLocaleString();
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => (
                  <span className="text-sm text-gray-600">{value}</span>
                )}
              />

              {selectedMetric === "revenue" && (
                <>
                  <Area
                    type="natural"
                    dataKey="revenue"
                    name="ប្រាក់ចំណូល"
                    stroke="#0D9488"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                    isAnimationActive={isAnimationActive}
                    dot={false}
                    activeDot={{ r: 6, stroke: "#0D9488", strokeWidth: 2 }}
                    connectNulls={true}
                  />
                  <Area
                    type="natural"
                    dataKey="expense"
                    name="ចំណាយ"
                    stroke="#EF4444"
                    strokeWidth={3}
                    fill="url(#expenseGradient)"
                    isAnimationActive={isAnimationActive}
                    dot={false}
                    activeDot={{ r: 6, stroke: "#EF4444", strokeWidth: 2 }}
                    connectNulls={true}
                  />
                  <Bar
                    dataKey="otc"
                    name="OTC"
                    fill="#0D9488"
                    fillOpacity={0.6}
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={isAnimationActive}
                  />
                </>
              )}

              {selectedMetric === "units" && (
                <Line
                  type="monotone"
                  dataKey="units"
                  name="ចំនួនលក់"
                  stroke="#0D9488"
                  strokeWidth={3}
                  isAnimationActive={isAnimationActive}
                  dot={{ fill: "#0D9488", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#0D9488", strokeWidth: 2 }}
                />
              )}

              {selectedMetric === "otc" && (
                <Bar
                  dataKey="otc"
                  name="OTC"
                  fill="#0D9488"
                  fillOpacity={0.8}
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={isAnimationActive}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;