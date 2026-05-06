import React, { useState } from "react";
import {
  MdSearch,
  MdPerson,
  MdPhone,
  MdHistory,
  MdTrendingUp,
  MdClose,
  MdDownload,
  MdPrint,
} from "react-icons/md";
import { FaMoneyBillWave, FaShoppingBag } from "react-icons/fa";
import useCustomers from "../../hook/customer/useCustomers";
import useCustomerDetail from "../../hook/customer/useCustomerDetail";

const Customer = () => {
  const [showCustomerDetail, setShowCustomerDetail] = useState(false);
  const [detailCustomer, setDetailCustomer] = useState(null);
  
  const { 
    customers, 
    stats, 
    loading, 
    search, 
    setSearch, 
    tier, 
    setTier,
  } = useCustomers();
  
  const { fetchCustomer } = useCustomerDetail();

  // Get tier display
  const getTierDisplay = (totalSpent) => {
    if (totalSpent >= 3000) return { name: "Diamond", color: "bg-purple-100 text-purple-700", icon: "💎" };
    if (totalSpent >= 2000) return { name: "Platinum", color: "bg-gray-100 text-gray-700", icon: "⭐" };
    if (totalSpent >= 1000) return { name: "Gold", color: "bg-yellow-100 text-yellow-700", icon: "🥇" };
    if (totalSpent >= 500) return { name: "Silver", color: "bg-gray-100 text-gray-600", icon: "🥈" };
    return { name: "Bronze", color: "bg-orange-100 text-orange-700", icon: "🥉" };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };

  const handleViewDetail = async (customer) => {
    const data = await fetchCustomer(customer.id);
    if (data) {
      setDetailCustomer(data);
      setShowCustomerDetail(true);
    } else {
      setDetailCustomer(customer);
      setShowCustomerDetail(true);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, prefix = "$", suffix = "" }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
        </div>
        <div className={`p-3 rounded-xl bg-${color}-50`}>
          <Icon className={`text-${color}-600 text-xl`} />
        </div>
      </div>
    </div>
  );

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
        <div className="px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">ប្រវត្តិអតិថិជន</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              អតិថិជនត្រូវបានបង្កើតដោយស្វ័យប្រវត្តិពេលមានការទិញ (បញ្ចូលលេខទូរស័ព្ទពេល Checkout)
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <StatCard title="អតិថិជនសរុប" value={stats.total_customers} icon={MdPerson} color="teal" prefix="" />
          <StatCard title="ចំណាយសរុប" value={stats.total_spent} icon={FaMoneyBillWave} color="purple" />
          <StatCard title="ការបញ្ជាទិញសរុប" value={stats.total_orders} icon={FaShoppingBag} color="blue" prefix="" />
          <StatCard title="មធ្យមភាគចំណាយ" value={stats.avg_spent} icon={MdTrendingUp} color="green" />
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Filters Bar */}
          <div className="p-4 border-b border-gray-100 bg-gray-50/40">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="ស្វែងរកតាមឈ្មោះ ឬ លេខទូរស័ព្ទ..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl w-72 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white text-sm"
                  />
                </div>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                >
                  <option value="all">កម្រិតទាំងអស់</option>
                  <option value="Diamond">💎 ពេជ្រ</option>
                  <option value="Platinum">⭐ ប្លាទីន</option>
                  <option value="Gold">🥇 មាស</option>
                  <option value="Silver">🥈 ប្រាក់</option>
                  <option value="Bronze">🥉 សំរិទ្ធ</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors text-sm">
                  <MdDownload size={18} />
                  <span>ទាញយក</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors text-sm">
                  <MdPrint size={18} />
                  <span>បោះពុម្ព</span>
                </button>
              </div>
            </div>
          </div>

          {/* Customer Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">អតិថិជន</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ទូរស័ព្ទ</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">ចំណាយសរុប</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">ការបញ្ជាទិញ</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">កាលបរិច្ឆេទចុងក្រោយ</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">កម្រិត</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {customers.map((customer) => {
                  const tierInfo = getTierDisplay(customer.total_spent);
                  return (
                    <tr
                      key={customer.id}
                      onClick={() => handleViewDetail(customer)}
                      className="hover:bg-teal-50/30 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center text-teal-700 font-medium">
                            {customer.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">
                              {customer.name}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {customer.email || "—"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <MdPhone size={14} className="text-gray-400" />
                          {customer.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-semibold text-teal-600 text-lg">
                          ${(customer.total_spent || 0).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                          {customer.total_orders || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(customer.last_order_date)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-full ${tierInfo.color}`}>
                          <span>{tierInfo.icon}</span>
                          {tierInfo.name}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {customers.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdPerson size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500">រកមិនឃើញអតិថិជន</p>
              <p className="text-sm text-gray-400 mt-1">សាកល្បងប្តូរពាក្យស្វែងរក</p>
            </div>
          )}

          {/* Footer */}
          {customers.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  បង្ហាញ {customers.length} នាក់
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">មុន</button>
                  <button className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-sm">1</button>
                  <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">2</button>
                  <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">3</button>
                  <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">បន្ទាប់</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info Note */}
        <div className="mt-6 bg-teal-50 rounded-xl p-4 border border-teal-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MdHistory className="text-teal-600" size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-teal-800">របៀបបង្កើតអតិថិជនថ្មី</p>
              <p className="text-xs text-teal-600 mt-0.5">
                អតិថិជននឹងត្រូវបានបង្កើតដោយស្វ័យប្រវត្តិនៅពេលបញ្ចូលលេខទូរស័ព្ទនៅក្នុងទំព័រលក់ទំនិញ (POS) និងបញ្ចប់ការទិញ។
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {showCustomerDetail && detailCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCustomerDetail(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center text-teal-700 text-xl font-bold">
                    {detailCustomer.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{detailCustomer.name}</h2>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                      <MdPhone size={14} /> {detailCustomer.phone}
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowCustomerDetail(false)} className="text-gray-400 hover:text-gray-600">
                  <MdClose size={22} />
                </button>
              </div>

              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-teal-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-teal-600">${(detailCustomer.total_spent || 0).toFixed(2)}</p>
                    <p className="text-xs text-gray-500 mt-1">ចំណាយសរុប</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-blue-600">{detailCustomer.total_orders || 0}</p>
                    <p className="text-xs text-gray-500 mt-1">ការបញ្ជាទិញ</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">លេខទូរស័ព្ទ</span>
                    <span className="font-medium text-gray-700">{detailCustomer.phone}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">អ៊ីមែល</span>
                    <span className="font-medium text-gray-700">{detailCustomer.email || "—"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">កាលបរិច្ឆេទចូលរួម</span>
                    <span className="font-medium text-gray-700">{formatDate(detailCustomer.created_at)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">ការទិញចុងក្រោយ</span>
                    <span className="font-medium text-gray-700">{formatDate(detailCustomer.last_order_date)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">កម្រិត</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTierDisplay(detailCustomer.total_spent).color}`}>
                      {getTierDisplay(detailCustomer.total_spent).name}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCustomerDetail(false)}
                className="w-full mt-5 py-2.5 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors"
              >
                បិទ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;