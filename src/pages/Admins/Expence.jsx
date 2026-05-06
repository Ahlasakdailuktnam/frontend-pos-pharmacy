import React, { useState, useEffect } from "react";
import {
  MdSearch,
  MdAdd,
  MdDelete,
  MdEdit,
  MdRefresh,
  MdWarning,
  MdCheckCircle,
  MdWaterDrop,
  MdElectricalServices,
  MdBuild,
  MdShoppingCart,
  MdReceipt,
  MdDateRange,
  MdClose,
  MdSave,
  MdHomeRepairService,
  MdCleaningServices,
  MdDevices,
} from "react-icons/md";
import { FaMoneyBillWave, FaWallet, FaChartLine } from "react-icons/fa";
import { useExpenses } from "../../hook/expenses/useExpenses";

const Expense = () => {
  const {
    expenses,
    stats,
    loading,
    error,
    filters,
    updateFilters,
    addExpense,
    editExpense,
    removeExpense,
    fetchExpenses,
    fetchStats,
  } = useExpenses();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Update filters when search/filters change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      updateFilters({
        search: searchTerm,
        category: selectedCategory,
        status: selectedStatus,
        month: selectedMonth,
      });
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedCategory, selectedStatus, selectedMonth, updateFilters]);

  // Fetch when filters change
  useEffect(() => {
    fetchExpenses();
  }, [filters, fetchExpenses]);

  // Fetch stats on mount only
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const categories = [
    { id: 1, name: "ទឹក", icon: MdWaterDrop, color: "blue", bgColor: "bg-blue-50", textColor: "text-blue-600" },
    { id: 2, name: "ភ្លើង", icon: MdElectricalServices, color: "yellow", bgColor: "bg-yellow-50", textColor: "text-yellow-600" },
    { id: 3, name: "ជួសជុល", icon: MdBuild, color: "orange", bgColor: "bg-orange-50", textColor: "text-orange-600" },
    { id: 4, name: "ទិញសម្ភារៈ", icon: MdShoppingCart, color: "teal", bgColor: "bg-teal-50", textColor: "text-teal-600" },
    { id: 5, name: "ថែទាំ", icon: MdHomeRepairService, color: "purple", bgColor: "bg-purple-50", textColor: "text-purple-600" },
    { id: 6, name: "សម្អាត", icon: MdCleaningServices, color: "green", bgColor: "bg-green-50", textColor: "text-green-600" },
    { id: 7, name: "ឧបករណ៍", icon: MdDevices, color: "indigo", bgColor: "bg-indigo-50", textColor: "text-indigo-600" },
    { id: 8, name: "ផ្សេងៗ", icon: MdReceipt, color: "gray", bgColor: "bg-gray-50", textColor: "text-gray-600" },
  ];

  const [newExpense, setNewExpense] = useState({
    title: "",
    category: "ផ្សេងៗ",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    status: "pending",
    note: "",
    paymentMethod: "",
    receipt: "",
  });

  const [editExpenseForm, setEditExpenseForm] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    status: "",
    note: "",
    paymentMethod: "",
    receipt: "",
  });

  const getCategoryStyle = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category || categories.find(c => c.name === "ផ្សេងៗ");
  };

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
        <MdWarning size={12} /> មិនទាន់បង់
      </span>
    );
  };

  const handleAddExpense = async () => {
    if (!newExpense.title || !newExpense.amount) {
      alert("សូមបំពេញព័ត៌មានចាំបាច់");
      return;
    }
    try {
      await addExpense({
        ...newExpense,
        amount: parseFloat(newExpense.amount),
      });
      await fetchExpenses();
      await fetchStats();
      setShowAddModal(false);
      setNewExpense({
        title: "",
        category: "ផ្សេងៗ",
        amount: "",
        date: new Date().toISOString().split('T')[0],
        status: "pending",
        note: "",
        paymentMethod: "",
        receipt: "",
      });
    } catch (err) {
      alert("បរាជ័យក្នុងការបន្ថែមចំណាយ");
    }
  };

  const handleEditExpense = async () => {
    if (!editExpenseForm.title || !editExpenseForm.amount) {
      alert("សូមបំពេញព័ត៌មានចាំបាច់");
      return;
    }
    try {
      await editExpense(selectedExpense.id, {
        ...editExpenseForm,
        amount: parseFloat(editExpenseForm.amount),
      });
      await fetchExpenses();
      await fetchStats();
      setShowEditModal(false);
      setSelectedExpense(null);
    } catch (err) {
      alert("បរាជ័យក្នុងការកែប្រែចំណាយ");
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm("តើអ្នកច្បាស់ជាចង់លុបចំណាយនេះមែនទេ?")) {
      try {
        await removeExpense(id);
        await fetchExpenses();
        await fetchStats();
      } catch (err) {
        alert("បរាជ័យក្នុងការលុបចំណាយ");
      }
    }
  };

  const openEditModal = (expense) => {
    setSelectedExpense(expense);
    setEditExpenseForm({
      title: expense.title,
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
      status: expense.status,
      note: expense.note || "",
      paymentMethod: expense.paymentMethod || "",
      receipt: expense.receipt || "",
    });
    setShowEditModal(true);
  };

  const getMonthOptions = () => {
    const months = [];
    const currentDate = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      months.push({
        value: `${date.getFullYear()}-${date.getMonth()}`,
        label: `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`,
      });
    }
    return months;
  };

  const StatCard = ({ title, value, icon: Icon, color, prefix = "$" }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl bg-${color}-50`}>
          <Icon className={`text-${color}-600 text-xl`} />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">
        {prefix}{value.toLocaleString()}
      </p>
    </div>
  );

  const handleRefresh = async () => {
    await fetchExpenses();
    await fetchStats();
  };

  if (loading && expenses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-500">កំពុងផ្ទុកទិន្នន័យ...</p>
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
              <h1 className="text-2xl font-bold text-gray-800">គ្រប់គ្រងចំណាយ</h1>
              <p className="text-gray-500 text-sm mt-0.5">តាមដានវិក្កយបត្រ ថ្លៃទឹកភ្លើង ជួសជុល និងចំណាយផ្សេងៗ</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <MdRefresh size={20} />
                <span>ធ្វើឱ្យថ្មី</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <MdAdd size={20} />
                <span>បន្ថែមចំណាយថ្មី</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard title="ចំណាយសរុប" value={stats.total || 0} icon={FaMoneyBillWave} color="teal" />
          <StatCard title="ចំណាយប្រចាំខែនេះ" value={stats.this_month || 0} icon={FaChartLine} color="purple" />
          <StatCard title="បានបង់រួច" value={stats.paid || 0} icon={MdCheckCircle} color="green" />
          <StatCard title="មិនទាន់បង់" value={stats.pending || 0} icon={MdWarning} color="orange" />
        </div>

        {/* Category Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          {categories.map((cat) => {
            const categoryTotal = Array.isArray(expenses) 
              ? expenses.filter(e => e?.category === cat.name).reduce((sum, e) => sum + parseFloat(e?.amount || 0), 0)
              : 0;
            return (
              <div
                key={cat.id}
                className={`${cat.bgColor} rounded-xl p-3 text-center cursor-pointer hover:scale-105 transition-all duration-200`}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? "all" : cat.name)}
              >
                <cat.icon className={`${cat.textColor} text-xl mx-auto mb-1`} />
                <p className={`text-xs font-medium ${cat.textColor}`}>{cat.name}</p>
                <p className={`text-sm font-bold ${cat.textColor}`}>${categoryTotal.toFixed(0)}</p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="ស្វែងរកចំណាយ..."
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
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
              >
                <option value="all">ស្ថានភាពទាំងអស់</option>
                <option value="paid">បានបង់</option>
                <option value="pending">មិនទាន់បង់</option>
              </select>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
              >
                <option value="all">ទាំងអស់</option>
                {getMonthOptions().map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Expense List */}
          <div className="divide-y divide-gray-100">
            {error && (
              <div className="text-center py-12 text-red-500">
                <p>{error}</p>
                <button 
                  onClick={handleRefresh}
                  className="mt-2 text-teal-600 hover:text-teal-700"
                >
                  ព្យាយាមម្តងទៀត
                </button>
              </div>
            )}
            
            {!error && (!Array.isArray(expenses) || expenses.length === 0) && (
              <div className="text-center py-12 text-gray-400">
                <FaMoneyBillWave className="text-5xl mx-auto mb-3 opacity-30" />
                <p>មិនមានទិន្នន័យចំណាយ</p>
              </div>
            )}

            {!error && Array.isArray(expenses) && expenses.map((expense) => {
              if (!expense || !expense.id) return null;
              const categoryStyle = getCategoryStyle(expense.category);
              const CategoryIcon = categoryStyle.icon;
              return (
                <div key={expense.id} className="p-4 hover:bg-gray-50 transition-colors group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-xl ${categoryStyle.bgColor}`}>
                        <CategoryIcon className={categoryStyle.textColor} size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold text-gray-800">{expense.title}</h3>
                          {getStatusBadge(expense.status)}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{expense.note}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <MdDateRange size={12} />
                            {new Date(expense.date).toLocaleDateString('km-KH')}
                          </span>
                          {expense.paymentMethod && (
                            <span className="flex items-center gap-1">
                              <FaWallet size={12} />
                              {expense.paymentMethod}
                            </span>
                          )}
                          {expense.receipt && (
                            <span className="flex items-center gap-1">
                              <MdReceipt size={12} />
                              {expense.receipt}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-teal-600">
                        ${parseFloat(expense.amount).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditModal(expense)}
                          className="p-1 text-gray-400 hover:text-teal-600 transition-colors"
                        >
                          <MdEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer with total */}
          {Array.isArray(expenses) && expenses.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">សរុប {expenses.length} ចំណាយ</span>
                <span className="text-lg font-bold text-teal-600">
                  ${expenses.reduce((sum, e) => sum + parseFloat(e?.amount || 0), 0).toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">បន្ថែមចំណាយថ្មី</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                  <MdClose size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ចំណងជើង *</label>
                  <input
                    type="text"
                    value={newExpense.title}
                    onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    placeholder="ឧ. វិក្កយបត្រទឹក ខែធ្នូ"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ប្រភេទ</label>
                    <select
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ចំនួនទឹកប្រាក់ *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">កាលបរិច្ឆេទ</label>
                    <input
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ស្ថានភាព</label>
                    <select
                      value={newExpense.status}
                      onChange={(e) => setNewExpense({ ...newExpense, status: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="pending">មិនទាន់បង់</option>
                      <option value="paid">បានបង់</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">វិធីបង់ប្រាក់</label>
                  <input
                    type="text"
                    value={newExpense.paymentMethod}
                    onChange={(e) => setNewExpense({ ...newExpense, paymentMethod: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder="ឧ. ABA Bank, សាច់ប្រាក់"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">លេខវិក្កយបត្រ</label>
                  <input
                    type="text"
                    value={newExpense.receipt}
                    onChange={(e) => setNewExpense({ ...newExpense, receipt: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder="ឧ. INV-2024-001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">កំណត់ចំណាំ</label>
                  <textarea
                    value={newExpense.note}
                    onChange={(e) => setNewExpense({ ...newExpense, note: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder="បញ្ចូលកំណត់ចំណាំបន្ថែម..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  បោះបង់
                </button>
                <button
                  onClick={handleAddExpense}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <MdSave size={18} />
                  )}
                  រក្សាទុក
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Expense Modal */}
      {showEditModal && selectedExpense && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">កែប្រែចំណាយ</h2>
                <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                  <MdClose size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ចំណងជើង *</label>
                  <input
                    type="text"
                    value={editExpenseForm.title}
                    onChange={(e) => setEditExpenseForm({ ...editExpenseForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ប្រភេទ</label>
                    <select
                      value={editExpenseForm.category}
                      onChange={(e) => setEditExpenseForm({ ...editExpenseForm, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ចំនួនទឹកប្រាក់ *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editExpenseForm.amount}
                      onChange={(e) => setEditExpenseForm({ ...editExpenseForm, amount: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">កាលបរិច្ឆេទ</label>
                    <input
                      type="date"
                      value={editExpenseForm.date}
                      onChange={(e) => setEditExpenseForm({ ...editExpenseForm, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ស្ថានភាព</label>
                    <select
                      value={editExpenseForm.status}
                      onChange={(e) => setEditExpenseForm({ ...editExpenseForm, status: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="pending">មិនទាន់បង់</option>
                      <option value="paid">បានបង់</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">វិធីបង់ប្រាក់</label>
                  <input
                    type="text"
                    value={editExpenseForm.paymentMethod}
                    onChange={(e) => setEditExpenseForm({ ...editExpenseForm, paymentMethod: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">លេខវិក្កយបត្រ</label>
                  <input
                    type="text"
                    value={editExpenseForm.receipt}
                    onChange={(e) => setEditExpenseForm({ ...editExpenseForm, receipt: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">កំណត់ចំណាំ</label>
                  <textarea
                    value={editExpenseForm.note}
                    onChange={(e) => setEditExpenseForm({ ...editExpenseForm, note: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  បោះបង់
                </button>
                <button
                  onClick={handleEditExpense}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <MdSave size={18} />
                  )}
                  រក្សាទុកការផ្លាស់ប្តូរ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense