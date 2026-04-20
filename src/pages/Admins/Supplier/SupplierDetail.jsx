import React, { useState } from "react";
import {
  MdArrowBack,
  MdEdit,
  MdDelete,
  MdBusiness,
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCategory,
  MdPayment,
  MdDescription,
  MdAttachMoney,
  MdShoppingCart,
  MdHistory,
  MdStar,
  MdStarBorder,
  MdCheckCircle,
  MdWarning,
  MdLocalShipping,
  MdReceipt,
} from "react-icons/md";
import { FaBoxes, FaMoneyBillWave, FaChartLine, FaCalendarAlt } from "react-icons/fa";

const SupplierDetail = () => {
  // Mock data - in real app, get from API using params
  const [supplier] = useState({
    id: 1,
    name: "ភ្នំពេញ ឱសថការី",
    nameEn: "Phnom Penh Pharmaceutical",
    contactPerson: "លី សុភ័ក្រ្ត",
    email: "info@pppharma.com",
    phone: "023 456 789",
    address: "ផ្លូវ 217, សង្កាត់ទួលស្វាយព្រៃ, ខណ្ឌបឹងកេងកង, ភ្នំពេញ",
    category: "ថ្នាំមានវេជ្ជបញ្ជា",
    status: "active",
    totalPurchased: 125000,
    totalProducts: 245,
    lastOrder: "2024-12-20",
    paymentTerms: "សាច់ប្រាក់ 30 ថ្ងៃ",
    rating: 4.8,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    products: ["ប៉ារ៉ាសេតាម៉ុល", "អាម៉ុកស៊ីលីន", "វីតាមីន C", "ថ្នាំបេះដូង", "ថ្នាំក្រពះ"],
    notes: "អ្នកផ្គត់ផ្គង់ធំ មានគុណភាពល្អ",
    monthlyExpense: {
      "មករា": 12500, "កុម្ភៈ": 13800, "មីនា": 14200, "មេសា": 15800, "ឧសភា": 16500, "មិថុនា": 17200,
      "កក្កដា": 18900, "សីហា": 19500, "កញ្ញា": 20100, "តុលា": 21800, "វិច្ឆិកា": 23500, "ធ្នូ": 25200
    },
    orderHistory: [
      { id: "ORD-001", date: "2024-12-20", amount: 5200, items: 45, status: "delivered" },
      { id: "ORD-002", date: "2024-11-15", amount: 4800, items: 38, status: "delivered" },
      { id: "ORD-003", date: "2024-10-10", amount: 5100, items: 42, status: "delivered" },
      { id: "ORD-004", date: "2024-09-05", amount: 4900, items: 40, status: "delivered" },
    ]
  });

  const months = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
  const maxExpense = Math.max(...Object.values(supplier.monthlyExpense));

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<MdStar key={i} className="text-yellow-400" size={18} />);
      } else if (i - 0.5 <= rating) {
        stars.push(<MdStar key={i} className="text-yellow-400" size={18} />);
      } else {
        stars.push(<MdStarBorder key={i} className="text-gray-300" size={18} />);
      }
    }
    return stars;
  };

  const getStatusBadge = (status) => {
    if (status === "active") {
      return <span className="flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full bg-green-50 text-green-600"><MdCheckCircle size={14} /> សកម្ម</span>;
    }
    return <span className="flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-500"><MdWarning size={14} /> អសកម្ម</span>;
  };

  const getOrderStatusBadge = (status) => {
    if (status === "delivered") {
      return <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600">បានបញ្ជូន</span>;
    }
    return <span className="text-xs px-2 py-1 rounded-full bg-orange-50 text-orange-600">កំពុងដំណើរការ</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <a href="/supplier" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <MdArrowBack size={20} className="text-gray-600" />
              </a>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">ព័ត៌មានលម្អិតអ្នកផ្គត់ផ្គង់</h1>
                <p className="text-gray-500 text-sm mt-0.5">មើលព័ត៌មានលម្អិត និងប្រវត្តិការទិញ</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href={`/edit-supplier/${supplier.id}`} className="flex items-center gap-2 px-4 py-2.5 border border-teal-200 text-teal-600 rounded-xl hover:bg-teal-50 transition-colors">
                <MdEdit size={18} />
                <span>កែប្រែ</span>
              </a>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors">
                <MdDelete size={18} />
                <span>លុប</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-start gap-6 flex-wrap">
            <img src={supplier.avatar} alt={supplier.name} className="w-24 h-24 rounded-full object-cover border-4 border-teal-100" />
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h2 className="text-2xl font-bold text-gray-800">{supplier.name}</h2>
                {getStatusBadge(supplier.status)}
                <div className="flex items-center gap-1">{getRatingStars(supplier.rating)}</div>
              </div>
              <p className="text-gray-500 mb-3">{supplier.nameEn}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MdPerson className="text-teal-500" />
                  <span>{supplier.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MdEmail className="text-teal-500" />
                  <span>{supplier.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MdPhone className="text-teal-500" />
                  <span>{supplier.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-teal-50"><FaMoneyBillWave className="text-teal-600 text-xl" /></div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">ចំណាយសរុប</h3>
            <p className="text-2xl font-bold text-gray-800">${supplier.totalPurchased.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-blue-50"><FaBoxes className="text-blue-600 text-xl" /></div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">ផលិតផលសរុប</h3>
            <p className="text-2xl font-bold text-gray-800">{supplier.totalProducts}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-purple-50"><MdLocalShipping className="text-purple-600 text-xl" /></div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">ការបញ្ជាទិញចុងក្រោយ</h3>
            <p className="text-2xl font-bold text-gray-800">{supplier.lastOrder}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-green-50"><MdPayment className="text-green-600 text-xl" /></div>
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">លក្ខខណ្ឌទូទាត់</h3>
            <p className="text-lg font-bold text-gray-800">{supplier.paymentTerms}</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Contact & Products */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <MdLocationOn className="text-teal-500" />
                អាសយដ្ឋាន
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{supplier.address}</p>
            </div>

            {/* Products Supplied */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <FaBoxes className="text-teal-500" />
                ផលិតផលដែលផ្គត់ផ្គង់
              </h3>
              <div className="flex flex-wrap gap-2">
                {supplier.products.map((product, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-sm">
                    {product}
                  </span>
                ))}
              </div>
            </div>

            {/* Notes */}
            {supplier.notes && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <MdDescription className="text-teal-500" />
                  កំណត់ចំណាំ
                </h3>
                <p className="text-gray-600 text-sm">{supplier.notes}</p>
              </div>
            )}
          </div>

          {/* Right Column - Monthly Expense Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FaChartLine className="text-teal-500" />
                  ចំណាយប្រចាំខែ
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaCalendarAlt size={14} />
                  <span>ឆ្នាំ 2024</span>
                </div>
              </div>
              <div className="space-y-4">
                {months.map((month) => {
                  const expense = supplier.monthlyExpense[month] || 0;
                  const percentage = (expense / maxExpense) * 100;
                  return (
                    <div key={month} className="group">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{month}</span>
                        <span className="font-medium text-teal-600">${expense.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                <span className="text-sm text-gray-500">សរុបប្រចាំឆ្នាំ</span>
                <span className="text-lg font-bold text-teal-600">${supplier.totalPurchased.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <MdHistory className="text-teal-500" />
              ប្រវត្តិការបញ្ជាទិញ
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-sm font-medium text-gray-500">
                  <th className="px-5 py-3">លេខបញ្ជាទិញ</th>
                  <th className="px-5 py-3">កាលបរិច្ឆេទ</th>
                  <th className="px-5 py-3">ចំនួនទឹកប្រាក់</th>
                  <th className="px-5 py-3">ចំនួនផលិតផល</th>
                  <th className="px-5 py-3">ស្ថានភាព</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {supplier.orderHistory.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 text-sm font-medium text-gray-800">{order.id}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{order.date}</td>
                    <td className="px-5 py-3 text-sm font-semibold text-teal-600">${order.amount.toLocaleString()}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{order.items}</td>
                    <td className="px-5 py-3">{getOrderStatusBadge(order.status)}</td>
                   </tr>
                ))}
              </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;