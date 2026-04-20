import React, { useState } from 'react';
import {
  MdShowChart,
  MdPeople,
  MdAccessTime,
  MdAttachMoney,
  MdStar,
  MdTrendingUp,
  MdTrendingDown,
  MdMoreVert,
  MdSearch,
  MdAdd,
  MdEdit,
  MdDelete,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCalendarToday,
  MdBarChart,
  MdPieChart,
  MdCheckCircle,
  MdCancel,
} from "react-icons/md";
import { FaUserMd, FaUserTie } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  ComposedChart,
} from "recharts";
import { BsPersonFillSlash } from "react-icons/bs";

// Static staff data with attendance details
const staffData = [
  {
    id: 1,
    name: "ស្រី សុខា",
    position: "ឱសថការី",
    department: "ឱសថ",
    email: "sokha.srey@pharmacy.com",
    phone: "012 345 678",
    location: "ភ្នំពេញ",
    joinDate: "2022-01-15",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    performance: 98,
    sales: 245000,
    prescriptions: 1240,
    attendance: 96,
    absence: 4,
    rating: 4.9,
    shift: "ព្រឹក",
  },
  {
    id: 2,
    name: "ច័ន្ទ សុផល",
    position: "ឱសថការីរង",
    department: "ឱសថ",
    email: "sophal.chan@pharmacy.com",
    phone: "023 456 789",
    location: "ភ្នំពេញ",
    joinDate: "2022-03-20",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    performance: 92,
    sales: 198000,
    prescriptions: 980,
    attendance: 94,
    absence: 6,
    rating: 4.7,
    shift: "ល្ងាច",
  },
  {
    id: 3,
    name: "ជា រតនា",
    position: "អ្នកគ្រប់គ្រង",
    department: "រដ្ឋបាល",
    email: "ratana.chea@pharmacy.com",
    phone: "015 678 901",
    location: "សៀមរាប",
    joinDate: "2021-11-10",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    performance: 95,
    sales: 312000,
    prescriptions: 560,
    attendance: 98,
    absence: 2,
    rating: 4.8,
    shift: "ព្រឹក",
  },
  {
    id: 4,
    name: "លី ហុង",
    position: "អ្នកលក់",
    department: "សេវាកម្មអតិថិជន",
    email: "hong.ly@pharmacy.com",
    phone: "097 890 123",
    location: "ភ្នំពេញ",
    joinDate: "2023-01-05",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    performance: 88,
    sales: 145000,
    prescriptions: 890,
    attendance: 91,
    absence: 9,
    rating: 4.5,
    shift: "ព្រឹក",
  },
  {
    id: 5,
    name: "ម៉ែន សុភ័ក្រ្ត",
    position: "ឱសថការី",
    department: "ឱសថ",
    email: "sopheak.mean@pharmacy.com",
    phone: "012 987 654",
    location: "កំពង់ចាម",
    joinDate: "2022-06-18",
    status: "on_leave",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    performance: 90,
    sales: 187000,
    prescriptions: 1050,
    attendance: 85,
    absence: 15,
    rating: 4.6,
    shift: "ល្ងាច",
  },
  {
    id: 6,
    name: "សឿន សុខា",
    position: "អ្នកលក់",
    department: "សេវាកម្មអតិថិជន",
    email: "sokha.suon@pharmacy.com",
    phone: "096 543 210",
    location: "ភ្នំពេញ",
    joinDate: "2023-03-12",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    performance: 86,
    sales: 134000,
    prescriptions: 780,
    attendance: 90,
    absence: 10,
    rating: 4.4,
    shift: "ព្រឹក",
  },
  {
    id: 7,
    name: "កែវ ច័ន្ទបញ្ញា",
    position: "ឱសថការីរង",
    department: "ឱសថ",
    email: "channy.keo@pharmacy.com",
    phone: "017 234 567",
    location: "បាត់ដំបង",
    joinDate: "2022-09-25",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    performance: 93,
    sales: 210000,
    prescriptions: 1120,
    attendance: 95,
    absence: 5,
    rating: 4.8,
    shift: "ល្ងាច",
  },
  {
    id: 8,
    name: "ព្រំ វិចិត្រា",
    position: "អ្នកគ្រប់គ្រងហាង",
    department: "រដ្ឋបាល",
    email: "vichitra.prom@pharmacy.com",
    phone: "088 765 432",
    location: "ភ្នំពេញ",
    joinDate: "2021-08-30",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    performance: 97,
    sales: 289000,
    prescriptions: 890,
    attendance: 97,
    absence: 3,
    rating: 4.9,
    shift: "ព្រឹក",
  },
];

// Monthly attendance trend data
const monthlyAttendanceData = [
  { month: "មករា", present: 94, absent: 6 },
  { month: "កុម្ភៈ", present: 95, absent: 5 },
  { month: "មីនា", present: 94, absent: 6 },
  { month: "មេសា", present: 93, absent: 7 },
  { month: "ឧសភា", present: 95, absent: 5 },
  { month: "មិថុនា", present: 96, absent: 4 },
  { month: "កក្កដា", present: 94, absent: 6 },
  { month: "សីហា", present: 95, absent: 5 },
  { month: "កញ្ញា", present: 96, absent: 4 },
  { month: "តុលា", present: 95, absent: 5 },
  { month: "វិច្ឆិកា", present: 97, absent: 3 },
  { month: "ធ្នូ", present: 96, absent: 4 },
];

// Department distribution for pie chart
const departmentData = [
  { name: "ឱសថ", value: 45, color: "#0D9488", staffCount: 4 },
  { name: "រដ្ឋបាល", value: 25, color: "#10B981", staffCount: 2 },
  { name: "សេវាកម្មអតិថិជន", value: 30, color: "#F59E0B", staffCount: 2 },
];

// Staff attendance data for clean horizontal bar chart
const staffAttendanceData = staffData.map(staff => ({
  name: staff.name,
  present: staff.attendance,
  absent: staff.absence,
}));

const StaffDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || staff.department === selectedDepartment;
    const matchesStatus = selectedStatus === "all" || staff.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const stats = {
    totalStaff: staffData.length,
    activeStaff: staffData.filter(s => s.status === "active").length,
    avgPerformance: Math.round(staffData.reduce((sum, s) => sum + s.performance, 0) / staffData.length),
    totalSales: staffData.reduce((sum, s) => sum + s.sales, 0),
    avgAttendance: Math.round(staffData.reduce((sum, s) => sum + s.attendance, 0) / staffData.length),
    avgAbsence: Math.round(staffData.reduce((sum, s) => sum + s.absence, 0) / staffData.length),
  };

  const StatCard = ({ title, value, icon: Icon, trend, color, prefix = "", suffix = "" }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl bg-${color}-50 group-hover:scale-110 transition-transform`}>
          <Icon className={`text-${color}-600 text-xl`} />
        </div>
        {trend && (
          <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trend >= 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
            {trend >= 0 ? <MdTrendingUp size={12} /> : <MdTrendingDown size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </p>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-800 mb-1">{label}</p>
          {payload.map((entry, idx) => (
            <p key={idx} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-50 text-green-600",
      on_leave: "bg-orange-50 text-orange-600",
      inactive: "bg-red-50 text-red-600",
    };
    const labels = {
      active: "កំពុងបំពេញការងារ",
      on_leave: "ឈប់សម្រាក",
      inactive: "ឈប់ធ្វើការ",
    };
    return (
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">គ្រប់គ្រងបុគ្គលិក</h1>
              <p className="text-gray-500 text-sm mt-0.5">គ្រប់គ្រងនិងតាមដានដំណើរការបុគ្គលិកទាំងអស់</p>
            </div>
            <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
              <MdAdd size={20} />
              <span>បន្ថែមបុគ្គលិក</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard title="បុគ្គលិកសរុប" value={stats.totalStaff} icon={MdPeople} color="teal" trend={12} />
          <StatCard title="កំពុងធ្វើការងារ" value={stats.activeStaff} icon={FaUserMd} color="green" trend={8} />
          <StatCard title="បុគ្គលិកឆ្នើម" value={stats.avgAttendance} icon={FaUserMd} color="blue" suffix="%" trend={2} />
          <StatCard title="ឈប់ធ្វើការ" value={stats.avgAbsence} icon={BsPersonFillSlash } color="red" suffix="%" trend={-3} />
        </div>

        {/* First Row Charts - 2 Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Chart 1: Monthly Attendance Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MdShowChart className="text-blue-500 text-lg" />
              </div>
              <h3 className="font-semibold text-gray-800">និន្នាការវត្តមានប្រចាំខែ</h3>
            </div>
            <div style={{ height: 300 }}>
              <ResponsiveContainer>
                <ComposedChart data={monthlyAttendanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} interval={2} axisLine={false} tickLine={false} />
                  <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="present" name="វត្តមាន" stroke="#0D9488" strokeWidth={2} fill="#0D9488" fillOpacity={0.1} />
                  <Line type="monotone" dataKey="absent" name="អវត្តមាន" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Department Distribution - Old Style Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <MdPieChart className="text-purple-500 text-lg" />
              </div>
              <h3 className="font-semibold text-gray-800">ការចែកចាយតាមនាយកដ្ឋាន</h3>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6" style={{ height: 260 }}>
              <div style={{ width: 200, height: 200 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1">
                {departmentData.map((dept, i) => (
                  <div key={i} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                      <span className="text-sm text-gray-600">{dept.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-800">{dept.value}%</span>
                      <p className="text-xs text-gray-400">{dept.staffCount} នាក់</p>
                    </div>
                  </div>
                ))}
                <div className="pt-3 mt-2 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">សរុប</span>
                    <span className="font-bold text-gray-800">{stats.totalStaff} នាក់</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row Charts - 2 Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Chart 3: Staff Attendance - Clean Horizontal Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-teal-50 rounded-lg">
                <MdBarChart className="text-teal-500 text-lg" />
              </div>
              <h3 className="font-semibold text-gray-800">វត្តមាន និង អវត្តមានបុគ្គលិក</h3>
            </div>
            <div style={{ height: 340 }}>
              <ResponsiveContainer>
                <BarChart data={staffAttendanceData} layout="vertical" margin={{ left: 70, right: 20, top: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fontSize: 11, fontWeight: 500 }} 
                    axisLine={false} 
                    tickLine={false} 
                    width={90}
                  />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend wrapperStyle={{ paddingTop: 10 }} />
                  <Bar dataKey="present" name="វត្តមាន" fill="#0D9488" radius={[0, 8, 8, 0]} />
                  <Bar dataKey="absent" name="អវត្តមាន" fill="#EF4444" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Top Performers with Attendance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-amber-50 rounded-lg">
                <MdStar className="text-amber-500 text-lg" />
              </div>
              <h3 className="font-semibold text-gray-800">បុគ្គលិកពូកែ (ដំណើរការ & វត្តមាន)</h3>
            </div>
            <div style={{ height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={[...staffData].sort((a, b) => b.performance - a.performance).slice(0, 5)} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, angle: -15, textAnchor: "end" }} height={60} interval={0} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar dataKey="performance" name="ដំណើរការ" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="attendance" name="វត្តមាន" fill="#0D9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center text-xs text-gray-400">
              * បុគ្គលិក ៥ នាក់ដែលមានដំណើរការខ្ពស់បំផុត
            </div>
          </div>
        </div>

        {/* Staff List Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Filter Bar */}
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="ស្វែងរកបុគ្គលិក..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                  />
                </div>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                >
                  <option value="all">នាយកដ្ឋានទាំងអស់</option>
                  <option value="ឱសថ">ឱសថ</option>
                  <option value="រដ្ឋបាល">រដ្ឋបាល</option>
                  <option value="សេវាកម្មអតិថិជន">សេវាកម្មអតិថិជន</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                >
                  <option value="all">ស្ថានភាពទាំងអស់</option>
                  <option value="active">កំពុងបំពេញការងារ</option>
                  <option value="on_leave">ឈប់សម្រាក</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? "bg-teal-50 text-teal-600" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-xl transition-all ${viewMode === "list" ? "bg-teal-50 text-teal-600" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Staff Grid/List */}
          <div className="p-4">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredStaff.map((staff) => (
                  <div
                    key={staff.id}
                    className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    onClick={() => setSelectedStaff(staff)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img src={staff.avatar} alt={staff.name} className="w-12 h-12 rounded-full object-cover border-2 border-teal-100 group-hover:border-teal-400 transition-colors" />
                        <div>
                          <h4 className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">{staff.name}</h4>
                          <p className="text-xs text-teal-600">{staff.position}</p>
                        </div>
                      </div>
                      {getStatusBadge(staff.status)}
                    </div>
                    <div className="space-y-3 mb-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">វត្តមាន</span>
                          <span className="font-medium text-gray-700">{staff.attendance}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-teal-500 h-1.5 rounded-full transition-all" style={{ width: `${staff.attendance}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">អវត្តមាន</span>
                          <span className="font-medium text-gray-700">{staff.absence}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="bg-red-400 h-1.5 rounded-full transition-all" style={{ width: `${staff.absence}%` }} />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 pt-1">
                        <span>ដំណើរការ: {staff.performance}%</span>
                        <span>ការលក់: ${(staff.sales/1000).toFixed(0)}k</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <div className="flex items-center gap-1">
                        <MdStar className="text-yellow-400" size={14} />
                        <span className="text-sm font-medium text-gray-700">{staff.rating}</span>
                      </div>
                      <button className="text-gray-300 hover:text-teal-600 transition-colors">
                        <MdMoreVert size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-100">
                      <th className="px-4 py-3">បុគ្គលិក</th>
                      <th className="px-4 py-3">តួនាទី</th>
                      <th className="px-4 py-3">នាយកដ្ឋាន</th>
                      <th className="px-4 py-3">វត្តមាន</th>
                      <th className="px-4 py-3">អវត្តមាន</th>
                      <th className="px-4 py-3">ដំណើរការ</th>
                      <th className="px-4 py-3">ការលក់</th>
                      <th className="px-4 py-3">ស្ថានភាព</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredStaff.map((staff) => (
                      <tr key={staff.id} className="hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => setSelectedStaff(staff)}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={staff.avatar} alt={staff.name} className="w-8 h-8 rounded-full object-cover" />
                            <span className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">{staff.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{staff.position}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{staff.department}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <MdCheckCircle className="text-teal-500" size={14} />
                            <span className="text-sm font-medium text-gray-700">{staff.attendance}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <MdCancel className="text-red-400" size={14} />
                            <span className="text-sm text-gray-600">{staff.absence}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">{staff.performance}%</span>
                            <div className="w-16 bg-gray-100 rounded-full h-1.5">
                              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${staff.performance}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">${(staff.sales/1000).toFixed(0)}k</td>
                        <td className="px-4 py-3">{getStatusBadge(staff.status)}</td>
                        <td className="px-4 py-3">
                          <button className="text-gray-300 hover:text-teal-600 transition-colors">
                            <MdMoreVert size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedStaff(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <img src={selectedStaff.avatar} alt={selectedStaff.name} className="w-16 h-16 rounded-full object-cover border-3 border-teal-100" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedStaff.name}</h2>
                    <p className="text-teal-600">{selectedStaff.position}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedStaff(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdEmail className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">អ៊ីមែល</p>
                    <p className="text-sm text-gray-700">{selectedStaff.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdPhone className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">ទូរស័ព្ទ</p>
                    <p className="text-sm text-gray-700">{selectedStaff.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdLocationOn className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">ទីតាំង</p>
                    <p className="text-sm text-gray-700">{selectedStaff.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdCalendarToday className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">ថ្ងៃចូលបំពេញការងារ</p>
                    <p className="text-sm text-gray-700">{selectedStaff.joinDate}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-semibold text-gray-800 mb-3">ដំណើរការការងារ</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-teal-50 rounded-xl">
                    <p className="text-2xl font-bold text-teal-600">{selectedStaff.attendance}%</p>
                    <p className="text-xs text-gray-500 mt-1">វត្តមាន</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-xl">
                    <p className="text-2xl font-bold text-red-600">{selectedStaff.absence}%</p>
                    <p className="text-xs text-gray-500 mt-1">អវត្តមាន</p>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-xl">
                    <p className="text-2xl font-bold text-amber-600">{selectedStaff.rating}</p>
                    <p className="text-xs text-gray-500 mt-1">ការវាយតម្លៃ</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl transition-colors">
                  <MdEdit size={18} />
                  <span>កែប្រែ</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 py-2.5 rounded-xl transition-colors">
                  <MdDelete size={18} />
                  <span>លុប</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;