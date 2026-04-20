import React, { useState } from "react";
import {
  MdShowChart,
  MdSearch,
  MdFilterList,
  MdDownload,
  MdPrint,
  MdMoreVert,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdAttachMoney,
  MdPeople,
  MdCalendarToday,
  MdTrendingUp,
  MdTrendingDown,
  MdCheckCircle,
  MdCancel,
  MdInfo,
  MdAdd,
} from "react-icons/md";
import { FaMoneyBillWave, FaWallet, FaPercent, FaUserCheck } from "react-icons/fa";

const PayRoll = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("ធ្នូ 2024");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Payroll data
  const payrollData = [
    {
      id: 1,
      name: "ស្រី សុខា",
      position: "ឱសថការី",
      department: "ឱសថ",
      baseSalary: 1200,
      bonus: 150,
      overtime: 85,
      allowance: 100,
      deduction: 45,
      netSalary: 1490,
      status: "paid",
      paymentDate: "2024-12-28",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      name: "ច័ន្ទ សុផល",
      position: "ឱសថការីរង",
      department: "ឱសថ",
      baseSalary: 900,
      bonus: 100,
      overtime: 120,
      allowance: 80,
      deduction: 35,
      netSalary: 1165,
      status: "paid",
      paymentDate: "2024-12-28",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "ជា រតនា",
      position: "អ្នកគ្រប់គ្រង",
      department: "រដ្ឋបាល",
      baseSalary: 1500,
      bonus: 200,
      overtime: 45,
      allowance: 150,
      deduction: 60,
      netSalary: 1835,
      status: "paid",
      paymentDate: "2024-12-28",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 4,
      name: "លី ហុង",
      position: "អ្នកលក់",
      department: "សេវាកម្មអតិថិជន",
      baseSalary: 600,
      bonus: 50,
      overtime: 95,
      allowance: 50,
      deduction: 25,
      netSalary: 770,
      status: "paid",
      paymentDate: "2024-12-28",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      name: "ម៉ែន សុភ័ក្រ្ត",
      position: "ឱសថការី",
      department: "ឱសថ",
      baseSalary: 1100,
      bonus: 120,
      overtime: 65,
      allowance: 100,
      deduction: 50,
      netSalary: 1335,
      status: "pending",
      paymentDate: "2024-12-30",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      id: 6,
      name: "សឿន សុខា",
      position: "អ្នកលក់",
      department: "សេវាកម្មអតិថិជន",
      baseSalary: 580,
      bonus: 40,
      overtime: 110,
      allowance: 50,
      deduction: 20,
      netSalary: 760,
      status: "paid",
      paymentDate: "2024-12-28",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      id: 7,
      name: "កែវ ច័ន្ទបញ្ញា",
      position: "ឱសថការីរង",
      department: "ឱសថ",
      baseSalary: 880,
      bonus: 90,
      overtime: 75,
      allowance: 80,
      deduction: 30,
      netSalary: 1095,
      status: "paid",
      paymentDate: "2024-12-28",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      id: 8,
      name: "ព្រំ វិចិត្រា",
      position: "អ្នកគ្រប់គ្រងហាង",
      department: "រដ្ឋបាល",
      baseSalary: 1450,
      bonus: 180,
      overtime: 30,
      allowance: 150,
      deduction: 55,
      netSalary: 1755,
      status: "paid",
      paymentDate: "2024-12-28",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    },
  ];

  // Summary statistics
  const summary = {
    totalPayroll: payrollData.reduce((sum, emp) => sum + emp.netSalary, 0),
    totalEmployees: payrollData.length,
    avgSalary: Math.round(payrollData.reduce((sum, emp) => sum + emp.netSalary, 0) / payrollData.length),
    totalBonus: payrollData.reduce((sum, emp) => sum + emp.bonus, 0),
    totalOvertime: payrollData.reduce((sum, emp) => sum + emp.overtime, 0),
    paidCount: payrollData.filter(emp => emp.status === "paid").length,
  };

  const filteredData = payrollData.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusBadge = (status) => {
    if (status === "paid") {
      return (
        <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-600">
          <MdCheckCircle size={12} /> បានបង់
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-orange-50 text-orange-600">
        <MdCancel size={12} /> រង់ចាំ
      </span>
    );
  };

  const StatCard = ({ title, value, icon: Icon, color, prefix = "$", suffix = "" }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl bg-${color}-50 group-hover:scale-110 transition-transform`}>
          <Icon className={`text-${color}-600 text-xl`} />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">
        {prefix}{value.toLocaleString()}{suffix}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">គ្រប់គ្រងប្រាក់បៀវត្ស</h1>
              <p className="text-gray-500 text-sm mt-0.5">គ្រប់គ្រងនិងតាមដានប្រាក់បៀវត្សបុគ្គលិកទាំងអស់</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
                >
                  <option>មករា 2024</option>
                  <option>កុម្ភៈ 2024</option>
                  <option>មីនា 2024</option>
                  <option>មេសា 2024</option>
                  <option>ឧសភា 2024</option>
                  <option>មិថុនា 2024</option>
                  <option>កក្កដា 2024</option>
                  <option>សីហា 2024</option>
                  <option>កញ្ញា 2024</option>
                  <option>តុលា 2024</option>
                  <option>វិច្ឆិកា 2024</option>
                  <option>ធ្នូ 2024</option>
                </select>
                <MdCalendarToday className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
              <button className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
                <MdAdd size={20} />
                <span>បន្ថែមប្រាក់បៀវត្ស</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <p className="text-teal-100">ប្រាក់បៀវត្សសរុប</p>
              <div className="bg-white/20 p-2 rounded-lg">
                <FaMoneyBillWave className="text-white" size={18} />
              </div>
            </div>
            <p className="text-3xl font-bold">${summary.totalPayroll.toLocaleString()}</p>
            <div className="flex items-center gap-2 mt-3 text-teal-100 text-sm">
              <MdTrendingUp size={14} />
              <span>+12.5% ពីខែមុន</span>
            </div>
          </div>

          <StatCard title="បុគ្គលិកសរុប" value={summary.totalEmployees} icon={MdPeople} color="teal" prefix="" />
          <StatCard title="ប្រាក់ត្រូវចំណាយខែនេះ" value={summary.avgSalary} icon={MdAttachMoney} color="teal" />
          <StatCard title="ប្រាក់រង្វាន់សរុប" value={summary.totalBonus} icon={FaWallet} color="teal" />
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">បានបង់ប្រាក់រួច</p>
                <p className="text-2xl font-bold text-gray-800">{summary.paidCount} / {summary.totalEmployees}</p>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${(summary.paidCount / summary.totalEmployees) * 100}%` }} />
                </div>
              </div>
              <div className="bg-teal-50 p-3 rounded-full">
                <FaUserCheck className="text-teal-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">ប្រាក់ម៉ោងបន្ថែមសរុប</p>
                <p className="text-2xl font-bold text-gray-800">${summary.totalOvertime.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1">+8.2% ពីខែមុន</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-full">
                <MdTrendingUp className="text-orange-500 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">ការកាត់ប្រាក់សរុប</p>
                <p className="text-2xl font-bold text-gray-800">${payrollData.reduce((sum, emp) => sum + emp.deduction, 0).toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1">ពន្ធ + ធានារ៉ាប់រង</p>
              </div>
              <div className="bg-red-50 p-3 rounded-full">
                <MdTrendingDown className="text-red-500 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Payroll Table */}
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

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-sm font-medium text-gray-500">
                  <th className="px-4 py-3">បុគ្គលិក</th>
                  <th className="px-4 py-3">តួនាទី</th>
                  <th className="px-4 py-3">នាយកដ្ឋាន</th>
                  <th className="px-4 py-3">ប្រាក់គោល</th>
                  <th className="px-4 py-3">ប្រាក់រង្វាន់</th>
                  <th className="px-4 py-3">ម៉ោងបន្ថែម</th>
                  <th className="px-4 py-3">ប្រាក់ឧបត្ថម្ភ</th>
                  <th className="px-4 py-3">ការកាត់</th>
                  <th className="px-4 py-3">សរុប</th>
                  <th className="px-4 py-3">ស្ថានភាព</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredData.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{emp.position}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{emp.department}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">${emp.baseSalary}</td>
                    <td className="px-4 py-3 text-sm text-green-600">+${emp.bonus}</td>
                    <td className="px-4 py-3 text-sm text-orange-600">+${emp.overtime}</td>
                    <td className="px-4 py-3 text-sm text-teal-600">+${emp.allowance}</td>
                    <td className="px-4 py-3 text-sm text-red-500">-${emp.deduction}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-800">${emp.netSalary}</td>
                    <td className="px-4 py-3">{getStatusBadge(emp.status)}</td>
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

          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-sm text-gray-500">បង្ហាញ {filteredData.length} នាក់ ក្នុងចំណោម {payrollData.length} នាក់</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">មុន</button>
              <button className="px-3 py-1 bg-teal-600 text-white rounded-lg text-sm">1</button>
              <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">2</button>
              <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">បន្ទាប់</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayRoll;