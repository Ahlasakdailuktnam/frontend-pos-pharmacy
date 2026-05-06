// src/pages/Admins/staff/StaffDashboard.jsx
import React, { useState, useMemo } from "react";
import {
  MdSearch,
  MdAdd,
  MdEdit,
  MdDelete,
  MdEmail,
  MdPhone,
  MdCalendarToday,
  MdCheckCircle,
  MdCancel,
  MdMoreVert,
  MdRefresh,
  MdPerson,
  MdAttachMoney,
  MdDateRange,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useStaff from "../../../hook/staff/useStaff";
import usePositions from "../../../hook/position/usePositon";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { staff, loading, fetchStaff, updateSalary } = useStaff();
  const { positions } = usePositions();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [selectedSalaryStaff, setSelectedSalaryStaff] = useState(null);
  const [salaryStatus, setSalaryStatus] = useState("pending");
  const [updatingSalary, setUpdatingSalary] = useState(false);
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    "មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា",
    "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"
  ];

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const safeParseNumber = (value) => {
    if (!value) return 0;
    if (typeof value === "number") return value;
    const cleaned = String(value).replace(/[^0-9.-]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  // FIXED: Get monthly salary - returns 0 for inactive/on_leave staff
  const getMonthlySalary = (staffMember, year, month) => {
  const staffDetail = staffMember.staff_detail || {};
  const status = staffDetail.status;
  
  // If staff is inactive or on leave, salary should be 0
  if (status === "inactive" || status === "on_leave") {
    return {
      base_salary: 0,
      allowance: 0,
      total: 0,
      status: "cancelled",
    };
  }
  
  //  FIX: Use optional chaining and check properly
  const monthlySalary = staffMember.monthly_salaries?.find(
    ms => ms.year === year && ms.month === month
  );
  
  // If there is a record in monthlySalaries, use its status
  if (monthlySalary) {
    console.log("Found monthly salary record:", monthlySalary); // Debug
    return {
      base_salary: safeParseNumber(monthlySalary.base_salary),
      allowance: safeParseNumber(monthlySalary.allowance),
      total: safeParseNumber(monthlySalary.total),
      status: monthlySalary.status, // This should be "paid" if saved
    };
  }
  
  // Default from staff_detail
  const baseSalary = safeParseNumber(staffDetail.base_salary);
  const allowance = safeParseNumber(staffDetail.allowance);
  
  return {
    base_salary: baseSalary,
    allowance: allowance,
    total: baseSalary + allowance,
    status: "pending", // Default status when no record exists
  };
};
  const filteredStaff = staff.filter((staffMember) => {
    const staffDetail = staffMember.staff_detail || {};
    
    const matchesSearch = 
      (staffMember.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (staffMember.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (staffDetail.employee_id || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPosition = selectedPosition === "all" || staffMember.position_id === parseInt(selectedPosition);
    
    let matchesStatus = true;
    if (selectedStatus !== "all") {
      matchesStatus = staffDetail.status === selectedStatus;
    }
    
    return matchesSearch && matchesPosition && matchesStatus;
  });

  // Monthly total - only count active staff
  const monthlyTotal = useMemo(() => {
    let total = 0;
    filteredStaff.forEach((staffMember) => {
      const staffDetail = staffMember.staff_detail || {};
      // Only count active staff for salary
      if (staffDetail.status === "active") {
        const monthly = getMonthlySalary(staffMember, selectedYear, selectedMonth);
        total += monthly.total;
      }
    });
    return total;
  }, [filteredStaff, selectedYear, selectedMonth]);

  const stats = {
    totalStaff: staff.length,
    activeStaff: staff.filter(s => s.staff_detail?.status === "active").length,
    onLeaveStaff: staff.filter(s => s.staff_detail?.status === "on_leave").length,
    inactiveStaff: staff.filter(s => s.staff_detail?.status === "inactive").length,
  };

  const updateSalaryStatus = async () => {
    if (!selectedSalaryStaff) return;
    
    setUpdatingSalary(true);
    try {
      const staffDetailId = selectedSalaryStaff.staff_detail?.id;
      if (!staffDetailId) {
        showMessage("error", "មិនអាចរកឃើញព័ត៌មានបុគ្គលិក");
        return;
      }
      
      const result = await updateSalary(staffDetailId, {
        year: selectedYear,
        month: selectedMonth,
        status: salaryStatus,
      });
      
      if (result.success) {
        showMessage("success", "បានធ្វើបច្ចុប្បន្នភាពស្ថានភាពប្រាក់ខែ!");
        setShowSalaryModal(false);
        setSelectedSalaryStaff(null);
      } else {
        showMessage("error", result.message);
      }
    } catch (error) {
      console.error("Update salary error:", error);
      showMessage("error", "មានបញ្ហាក្នុងការធ្វើបច្ចុប្បន្នភាព");
    } finally {
      setUpdatingSalary(false);
    }
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
      <span className={"text-xs font-medium px-2 py-1 rounded-full " + (styles[status] || styles.active)}>
        {labels[status] || "សកម្ម"}
      </span>
    );
  };

  const getSalaryStatusBadge = (status) => {
    const styles = {
      paid: "bg-green-50 text-green-600",
      pending: "bg-yellow-50 text-yellow-600",
      cancelled: "bg-red-50 text-red-600",
    };
    const labels = {
      paid: "បានបង់",
      pending: "កំពុងរង់ចាំ",
      cancelled: "បានបោះបង់",
    };
    return (
      <span className={"text-xs font-medium px-2 py-1 rounded-full " + (styles[status] || styles.pending)}>
        {labels[status] || "កំពុងរង់ចាំ"}
      </span>
    );
  };

  const handlePreviousMonth = () => {
    let newMonth = selectedMonth - 1;
    let newYear = selectedYear;
    if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const handleNextMonth = () => {
    let newMonth = selectedMonth + 1;
    let newYear = selectedYear;
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const handleCurrentMonth = () => {
    setSelectedMonth(new Date().getMonth() + 1);
    setSelectedYear(new Date().getFullYear());
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
      {message.text && (
        <div className={"fixed top-20 right-4 z-50 px-4 py-3 rounded-lg shadow-lg " + (message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white")}>
          {message.text}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">គ្រប់គ្រងបុគ្គលិក</h1>
              <p className="text-gray-500 text-sm mt-0.5">គ្រប់គ្រងនិងតាមដានព័ត៌មានបុគ្គលិកទាំងអស់</p>
            </div>
            <div className="flex gap-3">
              <button onClick={fetchStaff} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                <MdRefresh size={18} />
                <span>ធ្វើឲ្យថ្មី</span>
              </button>
              <button onClick={() => navigate("/admin/staff/add")} className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition shadow-sm">
                <MdAdd size={18} />
                <span>បន្ថែមបុគ្គលិក</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Month/Year Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button onClick={handlePreviousMonth} className="px-3 py-1 rounded-md text-sm hover:bg-white transition">←</button>
              <div className="flex items-center gap-2 px-3">
                <MdDateRange className="text-teal-600" />
                <span className="font-medium text-gray-700">{months[selectedMonth - 1]} {selectedYear}</span>
              </div>
              <button onClick={handleNextMonth} className="px-3 py-1 rounded-md text-sm hover:bg-white transition">→</button>
            </div>
            <button onClick={handleCurrentMonth} className="px-3 py-1 text-xs bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition">
              បច្ចុប្បន្ន
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-50">
                <MdPerson className="text-teal-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">បុគ្គលិកសរុប</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalStaff}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-green-50">
                <MdCheckCircle className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">កំពុងបំពេញការងារ</p>
                <p className="text-2xl font-bold text-gray-800">{stats.activeStaff}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-50">
                <MdCancel className="text-orange-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">ឈប់សម្រាក</p>
                <p className="text-2xl font-bold text-gray-800">{stats.onLeaveStaff}</p>
              </div>
            </div>
          </div>
          <div className="bg-teal-600 rounded-xl p-5 text-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 rounded-xl">
                <MdAttachMoney className="text-white text-xl" />
              </div>
              <div>
                <p className="text-sm opacity-90">ចំណាយប្រាក់ខែប្រចាំខែ</p>
                <p className="text-2xl font-bold">${monthlyTotal.toLocaleString()}</p>
                <p className="text-xs opacity-80">{months[selectedMonth - 1]} {selectedYear}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 relative">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="ស្វែងរកបុគ្គលិក..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
            >
              <option value="all">តំណែងទាំងអស់</option>
              {positions.map((pos) => (
                <option key={pos.id} value={pos.id}>{pos.name}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none bg-white"
            >
              <option value="all">ស្ថានភាពទាំងអស់</option>
              <option value="active">កំពុងបំពេញការងារ</option>
              <option value="on_leave">ឈប់សម្រាក</option>
              <option value="inactive">ឈប់ធ្វើការ</option>
            </select>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-sm font-semibold text-gray-600">
                  <th className="px-6 py-4">បុគ្គលិក</th>
                  <th className="px-6 py-4">តំណែង</th>
                  <th className="px-6 py-4">ប្រាក់ខែគោល</th>
                  <th className="px-6 py-4">ប្រាក់ឧបត្ថម្ភ</th>
                  <th className="px-6 py-4">សរុបប្រចាំខែ</th>
                  <th className="px-6 py-4">ស្ថានភាព</th>
                  <th className="px-6 py-4 text-center">សកម្មភាព</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staffMember) => {
                    const staffDetail = staffMember.staff_detail || {};
                    const position = staffDetail.position || {};
                    const monthly = getMonthlySalary(staffMember, selectedYear, selectedMonth);
                    const isInactive = staffDetail.status === "inactive" || staffDetail.status === "on_leave";
                    
                    return (
                      <tr key={staffMember.id} className={"hover:bg-gray-50 transition cursor-pointer " + (isInactive ? "opacity-60 bg-gray-50" : "")} onClick={() => setSelectedStaff(staffMember)}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center text-teal-700 font-medium">
                              {staffMember.name?.charAt(0) || "U"}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{staffMember.name || "—"}</p>
                              <p className="text-xs text-gray-400">{staffMember.email || "—"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{position.name || "—"}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={"font-semibold " + (isInactive ? "text-gray-400" : "text-teal-600")}>
                            ${safeParseNumber(staffDetail.base_salary).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={"font-semibold " + (isInactive ? "text-gray-400" : "text-amber-600")}>
                            ${safeParseNumber(staffDetail.allowance).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <span className={"font-bold " + (isInactive ? "text-gray-400" : "text-gray-800")}>
                              ${monthly.total.toLocaleString()}
                            </span>
                            {isInactive && (
                              <p className="text-xs text-red-400">ឈប់ធ្វើការ</p>
                            )}
                            {!isInactive && (
                              <p className="text-xs text-gray-400">{months[selectedMonth - 1]} {selectedYear}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {isInactive ? (
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-500">បានបោះបង់</span>
                          ) : (
                            getSalaryStatusBadge(monthly.status)
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSalaryStaff(staffMember);
                                setSalaryStatus(monthly.status);
                                setShowSalaryModal(true);
                              }}
                              className="p-2 text-purple-500 hover:bg-purple-50 rounded-lg transition"
                              title="កែប្រែស្ថានភាពប្រាក់ខែ"
                            >
                              <MdAttachMoney size={18} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/admin/staff/edit/" + staffMember.id);
                              }}
                              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                              title="កែប្រែ"
                            >
                              <MdEdit size={18} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedStaff(staffMember);
                              }}
                              className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition"
                              title="មើលលម្អិត"
                            >
                              <MdMoreVert size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                      <MdPerson className="text-5xl mx-auto mb-3 text-gray-300" />
                      <p className="text-base font-medium">មិនមានទិន្នន័យបុគ្គលិក</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Salary Status Modal */}
      {showSalaryModal && selectedSalaryStaff && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowSalaryModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-xl font-bold">កែប្រែស្ថានភាពប្រាក់ខែ</h2>
            </div>
            <div className="p-5">
              <div className="mb-4 space-y-2">
                <p className="text-sm text-gray-600">បុគ្គលិក: <span className="font-semibold text-gray-800">{selectedSalaryStaff.name}</span></p>
                <p className="text-sm text-gray-600">ខែ: <span className="font-semibold text-teal-600">{months[selectedMonth - 1]} {selectedYear}</span></p>
                <p className="text-sm text-gray-600">ប្រាក់ខែសរុប: <span className="font-semibold text-green-600">${getMonthlySalary(selectedSalaryStaff, selectedYear, selectedMonth).total.toLocaleString()}</span></p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">ស្ថានភាព</label>
                <select
                  value={salaryStatus}
                  onChange={(e) => setSalaryStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="pending">កំពុងរង់ចាំ (Pending)</option>
                  <option value="paid">បានបង់រួច (Paid)</option>
                  <option value="cancelled">បានបោះបង់ (Cancelled)</option>
                </select>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={updateSalaryStatus}
                  disabled={updatingSalary}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-xl font-medium disabled:opacity-50 transition"
                >
                  {updatingSalary ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}
                </button>
                <button
                  onClick={() => {
                    setShowSalaryModal(false);
                    setSelectedSalaryStaff(null);
                  }}
                  className="flex-1 border border-gray-300 py-2 rounded-xl hover:bg-gray-50 transition"
                >
                  បោះបង់
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal - Simplified */}
      {showDeleteConfirm && staffToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <MdDelete className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">បញ្ជាក់ការលុប</h3>
                <p className="text-gray-500">
                  {"តើអ្នកពិតជាចង់លុបបុគ្គលិក \"" + (staffToDelete.name || "") + "\" មែនទេ?"}
                </p>
                <p className="text-xs text-red-500 mt-2">សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ!</p>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => {
                  // Add delete logic here if needed
                  setShowDeleteConfirm(false);
                  setStaffToDelete(null);
                  showMessage("success", "បានលុបបុគ្គលិកដោយជោគជ័យ");
                }} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl font-medium transition">
                  បាទ/ចាស
                </button>
                <button onClick={() => {
                  setShowDeleteConfirm(false);
                  setStaffToDelete(null);
                }} className="flex-1 border border-gray-300 py-2.5 rounded-xl hover:bg-gray-50 transition">
                  បោះបង់
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