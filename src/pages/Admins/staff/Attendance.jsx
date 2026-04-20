import React, { useState } from "react";
import {
  MdSearch,
  MdCheckCircle,
  MdCancel,
  MdAccessTime,
  MdCalendarToday,
  MdPerson,
  MdWork,
  MdWarning,
  MdDownload,
  MdPrint,
  MdArrowBack,
  MdArrowForward,
  MdToday,
  MdEventNote,
  MdOutlineVerified,
  MdInfo,
  MdClose,
  MdSave,
} from "react-icons/md";
import { FaUserCheck, FaUserClock, FaClock, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock as FaLateClock } from "react-icons/fa";

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("daily");
  
  // Modal states
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedStaffForPermission, setSelectedStaffForPermission] = useState(null);
  const [permissionReason, setPermissionReason] = useState("");
  const [permissionType, setPermissionType] = useState("sick"); // sick, personal, annual, other

  // Staff Data with attendance records
  const [staffData, setStaffData] = useState([
    {
      id: 1,
      name: "ស្រី សុខា",
      position: "ឱសថការី",
      department: "ឱសថ",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      shift: "ព្រឹក",
      status: "active",
      attendance: {}
    },
    {
      id: 2,
      name: "ច័ន្ទ សុផល",
      position: "ឱសថការីរង",
      department: "ឱសថ",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      shift: "រសៀល",
      status: "active",
      attendance: {}
    },
    {
      id: 3,
      name: "ជា រតនា",
      position: "អ្នកគ្រប់គ្រង",
      department: "រដ្ឋបាល",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      shift: "ព្រឹក",
      status: "active",
      attendance: {}
    },
    {
      id: 4,
      name: "លី ហុង",
      position: "អ្នកលក់",
      department: "សេវាកម្មអតិថិជន",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      shift: "យប់",
      status: "active",
      attendance: {}
    },
    {
      id: 5,
      name: "ម៉ែន សុភ័ក្រ្ត",
      position: "ឱសថការី",
      department: "ឱសថ",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      shift: "ព្រឹក",
      status: "active",
      attendance: {}
    },
    {
      id: 6,
      name: "សឿន សុខា",
      position: "អ្នកលក់",
      department: "សេវាកម្មអតិថិជន",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      shift: "ព្រឹក",
      status: "active",
      attendance: {}
    },
    {
      id: 7,
      name: "កែវ ច័ន្ទបញ្ញា",
      position: "ឱសថការីរង",
      department: "ឱសថ",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      shift: "រសៀល",
      status: "active",
      attendance: {}
    },
    {
      id: 8,
      name: "ព្រំ វិចិត្រា",
      position: "អ្នកគ្រប់គ្រងហាង",
      department: "រដ្ឋបាល",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      shift: "ព្រឹក",
      status: "active",
      attendance: {}
    },
  ]);

  // Get today's attendance for a staff
  const getTodayAttendance = (staff) => {
    return staff.attendance[selectedDate] || { status: null, time: null, reason: null, permissionType: null };
  };

  // Update attendance status
  const updateAttendance = (staff, status, reason = null, permType = null) => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const updatedStaff = {
      ...staff,
      attendance: {
        ...staff.attendance,
        [selectedDate]: {
          status: status,
          time: currentTime,
          reason: reason,
          permissionType: permType,
        }
      }
    };
    setStaffData(staffData.map(s => s.id === staff.id ? updatedStaff : s));
  };

  // Open permission modal
  const openPermissionModal = (staff) => {
    setSelectedStaffForPermission(staff);
    setPermissionReason("");
    setPermissionType("sick");
    setShowPermissionModal(true);
  };

  // Submit permission
  const submitPermission = () => {
    if (!permissionReason.trim()) {
      alert("សូមបញ្ចូលមូលហេតុនៃការឈប់");
      return;
    }
    const reasonText = `${permissionType === "sick" ? "ឈឺ" : permissionType === "personal" ? "កិច្ចការផ្ទាល់ខ្លួន" : permissionType === "annual" ? "ឈប់សម្រាកប្រចាំឆ្នាំ" : "ផ្សេងៗ"}: ${permissionReason}`;
    updateAttendance(selectedStaffForPermission, "permission", reasonText, permissionType);
    setShowPermissionModal(false);
    setSelectedStaffForPermission(null);
    setPermissionReason("");
  };

  // Filter staff
  const filteredStaff = staffData.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || staff.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Summary statistics
  const todayStats = {
    total: staffData.length,
    present: staffData.filter(s => getTodayAttendance(s).status === "present").length,
    absent: staffData.filter(s => getTodayAttendance(s).status === "absent").length,
    permission: staffData.filter(s => getTodayAttendance(s).status === "permission").length,
    late: staffData.filter(s => getTodayAttendance(s).status === "late").length,
    notYet: staffData.filter(s => !getTodayAttendance(s).status).length,
  };

  // Change date
  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  // Get status display
  const getStatusDisplay = (status) => {
    switch (status) {
      case "present":
        return { 
          icon: <FaCheckCircle className="text-green-500" size={18} />, 
          text: "មានវត្តមាន", 
          color: "text-green-600", 
          bg: "bg-green-50",
          shortKey: "P"
        };
      case "absent":
        return { 
          icon: <FaTimesCircle className="text-red-500" size={18} />, 
          text: "អវត្តមាន", 
          color: "text-red-600", 
          bg: "bg-red-50",
          shortKey: "A"
        };
      case "permission":
        return { 
          icon: <MdEventNote className="text-blue-500" size={18} />, 
          text: "ឈប់មានច្បាប់", 
          color: "text-blue-600", 
          bg: "bg-blue-50",
          shortKey: "L"
        };
      case "late":
        return { 
          icon: <FaLateClock className="text-orange-500" size={18} />, 
          text: "យឺតម៉ោង", 
          color: "text-orange-600", 
          bg: "bg-orange-50",
          shortKey: "T"
        };
      default:
        return { 
          icon: <MdWarning className="text-gray-400" size={18} />, 
          text: "មិនទាន់កត់ត្រា", 
          color: "text-gray-400", 
          bg: "bg-gray-50",
          shortKey: "N"
        };
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{title}</p>
        </div>
        <div className={`p-2 rounded-full bg-${color}-50`}>
          <Icon className={`text-${color}-500 text-lg`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">កត់ត្រាវត្តមានបុគ្គលិក</h1>
              <p className="text-gray-500 text-sm mt-0.5">ចុចប៊ូតុងរហ័សដើម្បីកត់ត្រាវត្តមានប្រចាំថ្ងៃ</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-2 text-xs bg-gray-100 rounded-lg p-1">
                <span className="px-2 py-1 rounded bg-green-500 text-white">P = វត្តមាន</span>
                <span className="px-2 py-1 rounded bg-red-500 text-white">A = អវត្តមាន</span>
                <span className="px-2 py-1 rounded bg-blue-500 text-white">L = ឈប់មានច្បាប់</span>
                <span className="px-2 py-1 rounded bg-orange-500 text-white">T = យឺត</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Date Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => changeDate(-1)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <MdArrowBack size={20} className="text-gray-600" />
            </button>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <MdCalendarToday className="text-teal-500" />
                {new Date(selectedDate).toLocaleDateString('km-KH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <button
              onClick={() => changeDate(1)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <MdArrowForward size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          <StatCard title="សរុប" value={todayStats.total} icon={MdPerson} color="teal" />
          <StatCard title="វត្តមាន" value={todayStats.present} icon={FaUserCheck} color="green" />
          <StatCard title="អវត្តមាន" value={todayStats.absent} icon={FaUserClock} color="red" />
          <StatCard title="ឈប់មានច្បាប់" value={todayStats.permission} icon={MdEventNote} color="blue" />
          <StatCard title="យឺត" value={todayStats.late} icon={FaClock} color="orange" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
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

          {/* Staff Table with Quick Actions */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-sm font-medium text-gray-500">
                  <th className="px-4 py-3 w-[220px]">បុគ្គលិក</th>
                  <th className="px-4 py-3">តួនាទី</th>
                  <th className="px-4 py-3">នាយកដ្ឋាន</th>
                  <th className="px-4 py-3">វេន</th>
                  <th className="px-4 py-3 w-[180px]">ស្ថានភាពបច្ចុប្បន្ន</th>
                  <th className="px-4 py-3 text-center" colSpan="4">សកម្មភាពរហ័ស</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredStaff.map((staff) => {
                  const attendance = getTodayAttendance(staff);
                  const statusDisplay = getStatusDisplay(attendance.status);
                  const isRecorded = attendance.status !== null;
                  
                  return (
                    <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={staff.avatar} alt={staff.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="font-medium text-gray-800 block">{staff.name}</span>
                            {attendance.time && (
                              <span className="text-xs text-gray-400">កត់ត្រានៅ {attendance.time}</span>
                            )}
                          </div>
                        </div>
                       </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{staff.position}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{staff.department}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{staff.shift}</td>
                      <td className="px-4 py-3">
                        <div className={`flex flex-col gap-1 ${statusDisplay.bg} p-2 rounded-lg`}>
                          <div className="flex items-center gap-1.5">
                            {statusDisplay.icon}
                            <span className={`text-xs font-medium ${statusDisplay.color}`}>{statusDisplay.text}</span>
                          </div>
                          {attendance.reason && (
                            <span className="text-xs text-gray-500 truncate max-w-[150px]">{attendance.reason}</span>
                          )}
                        </div>
                       </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => updateAttendance(staff, "present")}
                          disabled={isRecorded}
                          className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
                            attendance.status === "present" 
                              ? "bg-green-500 text-white ring-2 ring-green-300 shadow-md" 
                              : isRecorded 
                              ? "bg-gray-100 text-gray-300 cursor-not-allowed" 
                              : "bg-green-50 text-green-600 hover:bg-green-500 hover:text-white hover:scale-105"
                          }`}
                          title="វត្តមាន (P)"
                        >
                          <FaCheckCircle size={16} />
                          <span className="text-[10px] font-bold">P</span>
                        </button>
                       </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => updateAttendance(staff, "absent")}
                          disabled={isRecorded}
                          className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
                            attendance.status === "absent" 
                              ? "bg-red-500 text-white ring-2 ring-red-300 shadow-md" 
                              : isRecorded 
                              ? "bg-gray-100 text-gray-300 cursor-not-allowed" 
                              : "bg-red-50 text-red-600 hover:bg-red-500 hover:text-white hover:scale-105"
                          }`}
                          title="អវត្តមាន (A)"
                        >
                          <FaTimesCircle size={16} />
                          <span className="text-[10px] font-bold">A</span>
                        </button>
                       </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => openPermissionModal(staff)}
                          disabled={isRecorded}
                          className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
                            attendance.status === "permission" 
                              ? "bg-blue-500 text-white ring-2 ring-blue-300 shadow-md" 
                              : isRecorded 
                              ? "bg-gray-100 text-gray-300 cursor-not-allowed" 
                              : "bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white hover:scale-105"
                          }`}
                          title="ឈប់មានច្បាប់ (L)"
                        >
                          <MdEventNote size={16} />
                          <span className="text-[10px] font-bold">L</span>
                        </button>
                       </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => updateAttendance(staff, "late")}
                          disabled={isRecorded}
                          className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
                            attendance.status === "late" 
                              ? "bg-orange-500 text-white ring-2 ring-orange-300 shadow-md" 
                              : isRecorded 
                              ? "bg-gray-100 text-gray-300 cursor-not-allowed" 
                              : "bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white hover:scale-105"
                          }`}
                          title="យឺតម៉ោង (T)"
                        >
                          <FaLateClock size={16} />
                          <span className="text-[10px] font-bold">T</span>
                        </button>
                       </td>
                      </tr>
                  );
                })}
              </tbody>
             </table>
          </div>

          {/* Reset button for selected date */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              បានកត់ត្រា {todayStats.present + todayStats.absent + todayStats.permission + todayStats.late} / {todayStats.total} នាក់
            </p>
            <button
              onClick={() => {
                if (window.confirm("តើអ្នកចង់កំណត់វត្តមានថ្ងៃនេះឡើងវិញទាំងអស់មែនទេ?")) {
                  const resetStaff = staffData.map(staff => ({
                    ...staff,
                    attendance: {
                      ...staff.attendance,
                      [selectedDate]: undefined
                    }
                  }));
                  setStaffData(resetStaff);
                }
              }}
              className="px-4 py-2 text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors text-sm"
            >
              កំណត់ឡើងវិញ
            </button>
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <MdPerson className="text-5xl mx-auto mb-3 opacity-30" />
              <p>មិនមានទិន្នន័យបុគ្គលិក</p>
            </div>
          )}
        </div>

        {/* Instruction Card */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-4 border border-teal-100">
          <div className="flex items-start gap-3">
            <MdInfo className="text-teal-600 text-xl mt-0.5" />
            <div>
              <p className="font-medium text-gray-800">ការណែនាំអំពីការប្រើប្រាស់</p>
              <p className="text-sm text-gray-600 mt-1">
                • ចុចប៊ូតុង <span className="font-semibold text-green-600">P (វត្តមាន)</span> សម្រាប់បុគ្គលិកដែលមកធ្វើការទាន់ពេល<br />
                • ចុចប៊ូតុង <span className="font-semibold text-red-600">A (អវត្តមាន)</span> សម្រាប់បុគ្គលិកដែលអវត្តមានដោយគ្មានច្បាប់<br />
                • ចុចប៊ូតុង <span className="font-semibold text-blue-600">L (ឈប់មានច្បាប់)</span> សម្រាប់បុគ្គលិកដែលឈប់ដោយមានច្បាប់ (នឹងបើកទម្រង់បំពេញ)<br />
                • ចុចប៊ូតុង <span className="font-semibold text-orange-600">T (យឺត)</span> សម្រាប់បុគ្គលិកដែលមកយឺតម៉ោង
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Permission Modal */}
      {showPermissionModal && selectedStaffForPermission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPermissionModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MdEventNote className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">ឈប់មានច្បាប់</h2>
                    <p className="text-sm text-gray-500">{selectedStaffForPermission.name}</p>
                  </div>
                </div>
                <button onClick={() => setShowPermissionModal(false)} className="text-gray-400 hover:text-gray-600">
                  <MdClose size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Permission Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ប្រភេទនៃការឈប់</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPermissionType("sick")}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        permissionType === "sick" 
                          ? "bg-blue-500 text-white shadow-md" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      🤒 ឈឺ
                    </button>
                    <button
                      onClick={() => setPermissionType("personal")}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        permissionType === "personal" 
                          ? "bg-blue-500 text-white shadow-md" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      🏠 កិច្ចការផ្ទាល់ខ្លួន
                    </button>
                    <button
                      onClick={() => setPermissionType("annual")}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        permissionType === "annual" 
                          ? "bg-blue-500 text-white shadow-md" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      🌴 ឈប់សម្រាកប្រចាំឆ្នាំ
                    </button>
                    <button
                      onClick={() => setPermissionType("other")}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        permissionType === "other" 
                          ? "bg-blue-500 text-white shadow-md" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      📝 ផ្សេងៗ
                    </button>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">មូលហេតុលម្អិត</label>
                  <textarea
                    value={permissionReason}
                    onChange={(e) => setPermissionReason(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="សូមបញ្ចូលមូលហេតុលម្អិត..."
                  />
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-xs text-blue-700">
                    <MdInfo className="inline mr-1" size={14} />
                    ការឈប់មានច្បាប់នឹងត្រូវបានកត់ត្រាក្នុងប្រព័ន្ធ
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowPermissionModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  បោះបង់
                </button>
                <button
                  onClick={submitPermission}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MdSave size={18} />
                  កត់ត្រាការឈប់
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;