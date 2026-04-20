// import React, { useState } from "react";
// import {
//   MdSearch,
//   MdAdd,
//   MdDelete,
//   MdEdit,
//   MdBusiness,
//   MdEmail,
//   MdPhone,
//   MdLocationOn,
//   MdPerson,
//   MdAttachMoney,
//   MdShoppingCart,
//   MdHistory,
//   MdWarning,
//   MdCheckCircle,
//   MdClose,
//   MdDownload,
//   MdPrint,
//   MdTrendingUp,
//   MdTrendingDown,
//   MdCalendarToday,
//   MdLocalShipping,
//   MdCategory,
//   MdReceipt,
// } from "react-icons/md";
// import { FaBuilding, FaBoxes, FaTruck, FaMoneyBillWave, FaChartLine, FaWallet } from "react-icons/fa";

// const Supplier = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   // Supplier Data
//   const [suppliers, setSuppliers] = useState([
//     {
//       id: 1,
//       name: "ភ្នំពេញ ឱសថការី",
//       nameEn: "Phnom Penh Pharmaceutical",
//       contactPerson: "លី សុភ័ក្រ្ត",
//       email: "info@pppharma.com",
//       phone: "023 456 789",
//       address: "ផ្លូវ 217, ភ្នំពេញ",
//       category: "ថ្នាំមានវេជ្ជបញ្ជា",
//       status: "active",
//       totalPurchased: 125000,
//       totalProducts: 245,
//       lastOrder: "2024-12-20",
//       paymentTerms: "សាច់ប្រាក់ 30 ថ្ងៃ",
//       rating: 4.8,
//       avatar: "https://randomuser.me/api/portraits/men/1.jpg",
//       monthlyExpense: {
//         Jan: 12500, Feb: 13800, Mar: 14200, Apr: 15800, May: 16500, Jun: 17200,
//         Jul: 18900, Aug: 19500, Sep: 20100, Oct: 21800, Nov: 23500, Dec: 25200
//       }
//     },
//     {
//       id: 2,
//       name: "មេគង្គ ឱសថ",
//       nameEn: "Mekong Pharmacy",
//       contactPerson: "សុខ ច័ន្ទ",
//       email: "sales@mekongpharma.com",
//       phone: "012 345 678",
//       address: "ផ្លូវ 63, ភ្នំពេញ",
//       category: "ថ្នាំបង្ការគ្រុន",
//       status: "active",
//       totalPurchased: 89000,
//       totalProducts: 156,
//       lastOrder: "2024-12-18",
//       paymentTerms: "សាច់ប្រាក់ 15 ថ្ងៃ",
//       rating: 4.5,
//       avatar: "https://randomuser.me/api/portraits/women/2.jpg",
//       monthlyExpense: {
//         Jan: 8900, Feb: 9200, Mar: 9500, Apr: 10100, May: 10800, Jun: 11200,
//         Jul: 11800, Aug: 12500, Sep: 13100, Oct: 13800, Nov: 14500, Dec: 15200
//       }
//     },
//     {
//       id: 3,
//       name: "អង្គរ ឱសថស្ថាន",
//       nameEn: "Angkor Pharmacy",
//       contactPerson: "សុខា ស្រី",
//       email: "contact@angkorpharma.com",
//       phone: "015 678 901",
//       address: "ផ្លូវ 6, សៀមរាប",
//       category: "វីតាមីន",
//       status: "active",
//       totalPurchased: 45000,
//       totalProducts: 89,
//       lastOrder: "2024-12-15",
//       paymentTerms: "សាច់ប្រាក់",
//       rating: 4.2,
//       avatar: "https://randomuser.me/api/portraits/men/3.jpg",
//       monthlyExpense: {
//         Jan: 4500, Feb: 4800, Mar: 5100, Apr: 5400, May: 5700, Jun: 6000,
//         Jul: 6300, Aug: 6600, Sep: 6900, Oct: 7200, Nov: 7500, Dec: 7800
//       }
//     },
//     {
//       id: 4,
//       name: "កម្ពុជា ឱសថការី",
//       nameEn: "Cambodia Pharmaceutical",
//       contactPerson: "រតនា ជា",
//       email: "info@cambodiapharma.com",
//       phone: "097 890 123",
//       address: "ផ្លូវ 271, ភ្នំពេញ",
//       category: "ថ្នាំបេះដូង",
//       status: "active",
//       totalPurchased: 32000,
//       totalProducts: 67,
//       lastOrder: "2024-12-10",
//       paymentTerms: "សាច់ប្រាក់ 30 ថ្ងៃ",
//       rating: 3.9,
//       avatar: "https://randomuser.me/api/portraits/women/4.jpg",
//       monthlyExpense: {
//         Jan: 3200, Feb: 3400, Mar: 3600, Apr: 3800, May: 4000, Jun: 4200,
//         Jul: 4400, Aug: 4600, Sep: 4800, Oct: 5000, Nov: 5200, Dec: 5400
//       }
//     },
//     {
//       id: 5,
//       name: "ឯកទេស ឱសថ",
//       nameEn: "Specialist Pharma",
//       contactPerson: "វិចិត្រា ព្រំ",
//       email: "sales@specialistpharma.com",
//       phone: "088 765 432",
//       address: "ផ្លូវ 2004, ភ្នំពេញ",
//       category: "ថ្នាំអង់ទីប៊ីយ៉ូទិក",
//       status: "active",
//       totalPurchased: 156000,
//       totalProducts: 234,
//       lastOrder: "2024-12-22",
//       paymentTerms: "សាច់ប្រាក់ 45 ថ្ងៃ",
//       rating: 4.9,
//       avatar: "https://randomuser.me/api/portraits/men/5.jpg",
//       monthlyExpense: {
//         Jan: 15600, Feb: 16200, Mar: 16800, Apr: 17400, May: 18000, Jun: 18600,
//         Jul: 19200, Aug: 19800, Sep: 20400, Oct: 21000, Nov: 21600, Dec: 22200
//       }
//     },
//     {
//       id: 6,
//       name: "ព្រះសីហនុ ឱសថ",
//       nameEn: "Sihanoukville Pharma",
//       contactPerson: "ហុង លី",
//       email: "contact@sihanoukpharma.com",
//       phone: "096 543 210",
//       address: "ផ្លូវជ័យជំនះ, ព្រះសីហនុ",
//       category: "ថ្នាំក្អក",
//       status: "active",
//       totalPurchased: 28000,
//       totalProducts: 45,
//       lastOrder: "2024-12-12",
//       paymentTerms: "សាច់ប្រាក់",
//       rating: 4.0,
//       avatar: "https://randomuser.me/api/portraits/women/6.jpg",
//       monthlyExpense: {
//         Jan: 2800, Feb: 2900, Mar: 3000, Apr: 3100, May: 3200, Jun: 3300,
//         Jul: 3400, Aug: 3500, Sep: 3600, Oct: 3700, Nov: 3800, Dec: 3900
//       }
//     },
//   ]);

//   const months = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
  
//   const currentMonth = months[selectedMonth];
//   const currentYear = selectedYear;

//   // Calculate monthly expense for current selected month
//   const currentMonthExpense = suppliers.reduce((sum, supplier) => {
//     const monthKey = months[selectedMonth];
//     return sum + (supplier.monthlyExpense?.[monthKey] || 0);
//   }, 0);

//   // Calculate total expense for all time
//   const totalExpense = suppliers.reduce((sum, supplier) => sum + supplier.totalPurchased, 0);

//   // Calculate expense by category
//   const categoryExpense = {};
//   suppliers.forEach(supplier => {
//     const monthKey = months[selectedMonth];
//     const expense = supplier.monthlyExpense?.[monthKey] || 0;
//     if (!categoryExpense[supplier.category]) {
//       categoryExpense[supplier.category] = 0;
//     }
//     categoryExpense[supplier.category] += expense;
//   });

//   // Calculate previous month for trend
//   const prevMonthExpense = suppliers.reduce((sum, supplier) => {
//     const prevMonthIndex = selectedMonth === 0 ? 11 : selectedMonth - 1;
//     const prevMonthKey = months[prevMonthIndex];
//     return sum + (supplier.monthlyExpense?.[prevMonthKey] || 0);
//   }, 0);

//   const trend = prevMonthExpense === 0 ? 0 : ((currentMonthExpense - prevMonthExpense) / prevMonthExpense * 100).toFixed(1);

//   // Monthly expense data for chart
//   const monthlyExpenseData = months.map((month, index) => ({
//     month: month,
//     expense: suppliers.reduce((sum, supplier) => sum + (supplier.monthlyExpense?.[month] || 0), 0)
//   }));

//   // Top suppliers by expense
//   const topSuppliers = [...suppliers].sort((a, b) => b.totalPurchased - a.totalPurchased).slice(0, 5);

//   // Filter suppliers
//   const filteredSuppliers = suppliers.filter(supplier => {
//     const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       supplier.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === "all" || supplier.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const getStatusBadge = (status) => {
//     if (status === "active") {
//       return <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-600"><MdCheckCircle size={10} /> សកម្ម</span>;
//     }
//     return <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-500"><MdWarning size={10} /> អសកម្ម</span>;
//   };

//   const StatCard = ({ title, value, icon: Icon, color, prefix = "$", suffix = "", trendValue = null }) => (
//     <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
//       <div className="flex items-center justify-between mb-3">
//         <div className={`p-2.5 rounded-xl bg-${color}-50`}>
//           <Icon className={`text-${color}-600 text-xl`} />
//         </div>
//         {trendValue !== null && (
//           <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trendValue >= 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
//             {trendValue >= 0 ? <MdTrendingUp size={12} /> : <MdTrendingDown size={12} />}
//             {Math.abs(trendValue)}%
//           </span>
//         )}
//       </div>
//       <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
//       <p className="text-2xl font-bold text-gray-800">{prefix}{value.toLocaleString()}{suffix}</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
//         <div className="px-6 py-4">
//           <div className="flex justify-between items-center flex-wrap gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">អ្នកផ្គត់ផ្គង់</h1>
//               <p className="text-gray-500 text-sm mt-0.5">គ្រប់គ្រង និងតាមដានព័ត៌មានអ្នកផ្គត់ផ្គង់ទាំងអស់</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <select
//                   value={selectedMonth}
//                   onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//                   className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
//                 >
//                   {months.map((month, idx) => (
//                     <option key={idx} value={idx}>{month} {selectedYear}</option>
//                   ))}
//                 </select>
//                 <MdCalendarToday className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
//               </div>
//               <a href="/add-supplier" className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
//                 <MdAdd size={20} />
//                 <span>បន្ថែមអ្នកផ្គត់ផ្គង់ថ្មី</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
//           <StatCard title="ចំណាយសរុប" value={totalExpense} icon={FaMoneyBillWave} color="teal" trendValue={12.5} />
//           <StatCard title={`ចំណាយប្រចាំខែ (${currentMonth})`} value={currentMonthExpense} icon={FaWallet} color="purple" trendValue={parseFloat(trend)} />
//           <StatCard title="អ្នកផ្គត់ផ្គង់សរុប" value={suppliers.length} icon={FaBuilding} color="blue" prefix="" />
//           <StatCard title="ផលិតផលសរុប" value={suppliers.reduce((sum, s) => sum + s.totalProducts, 0)} icon={FaBoxes} color="green" prefix="" />
//         </div>

//         {/* Category Expense Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
//           {Object.entries(categoryExpense).map(([category, expense]) => (
//             <div key={category} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-gray-500">{category}</p>
//                   <p className="text-lg font-bold text-teal-600">${expense.toLocaleString()}</p>
//                 </div>
//                 <div className="w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
//                   <MdCategory className="text-teal-500" size={16} />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Top Suppliers Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Monthly Expense Chart */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <FaChartLine className="text-teal-600 text-lg" />
//                 <h3 className="font-semibold text-gray-800">ចំណាយប្រចាំខែ</h3>
//               </div>
//             </div>
//             <div className="space-y-3">
//               {monthlyExpenseData.map((data, idx) => {
//                 const maxExpense = Math.max(...monthlyExpenseData.map(d => d.expense));
//                 const percentage = (data.expense / maxExpense) * 100;
//                 const isCurrentMonth = idx === selectedMonth;
//                 return (
//                   <div key={idx} className="group">
//                     <div className="flex justify-between text-xs mb-1">
//                       <span className={`${isCurrentMonth ? 'font-semibold text-teal-600' : 'text-gray-500'}`}>{data.month}</span>
//                       <span className="text-gray-600">${data.expense.toLocaleString()}</span>
//                     </div>
//                     <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
//                       <div 
//                         className={`h-2 rounded-full transition-all duration-500 ${isCurrentMonth ? 'bg-teal-500' : 'bg-teal-300'}`}
//                         style={{ width: `${percentage}%` }}
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Top 5 Suppliers */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
//             <div className="flex items-center gap-2 mb-4">
//               <FaTruck className="text-teal-600 text-lg" />
//               <h3 className="font-semibold text-gray-800">អ្នកផ្គត់ផ្គង់កំពូលទាំង ៥</h3>
//             </div>
//             <div className="space-y-4">
//               {topSuppliers.map((supplier, idx) => (
//                 <a 
//                   key={supplier.id} 
//                   href={`/supplier-detail/${supplier.id}`}
//                   className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold">
//                       {idx + 1}
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-800">{supplier.name}</p>
//                       <p className="text-xs text-gray-400">{supplier.category}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold text-teal-600">${supplier.totalPurchased.toLocaleString()}</p>
//                     <p className="text-xs text-gray-400">ទិញសរុប</p>
//                   </div>
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Supplier List Table */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//           <div className="p-4 border-b border-gray-100">
//             <div className="flex flex-wrap items-center justify-between gap-4">
//               <div className="flex items-center gap-3 flex-wrap">
//                 <div className="relative">
//                   <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="text"
//                     placeholder="ស្វែងរកអ្នកផ្គត់ផ្គង់..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
//                   />
//                 </div>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
//                 >
//                   <option value="all">ប្រភេទទាំងអស់</option>
//                   <option value="ថ្នាំមានវេជ្ជបញ្ជា">ថ្នាំមានវេជ្ជបញ្ជា</option>
//                   <option value="ថ្នាំបង្ការគ្រុន">ថ្នាំបង្ការគ្រុន</option>
//                   <option value="ថ្នាំអង់ទីប៊ីយ៉ូទិក">ថ្នាំអង់ទីប៊ីយ៉ូទិក</option>
//                   <option value="វីតាមីន">វីតាមីន</option>
//                   <option value="ថ្នាំបេះដូង">ថ្នាំបេះដូង</option>
//                   <option value="ថ្នាំក្អក">ថ្នាំក្អក</option>
//                 </select>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
//                   <MdDownload size={18} />
//                   <span className="text-sm">ទាញយក</span>
//                 </button>
//                 <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
//                   <MdPrint size={18} />
//                   <span className="text-sm">បោះពុម្ព</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Supplier Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-100">
//                 <tr className="text-left text-sm font-medium text-gray-500">
//                   <th className="px-4 py-3">អ្នកផ្គត់ផ្គង់</th>
//                   <th className="px-4 py-3">អ្នកទំនាក់ទំនង</th>
//                   <th className="px-4 py-3">ប្រភេទ</th>
//                   <th className="px-4 py-3">ទូរស័ព្ទ</th>
//                   <th className="px-4 py-3">ចំណាយសរុប</th>
//                   <th className="px-4 py-3">ចំណាយប្រចាំខែ</th>
//                   <th className="px-4 py-3">ស្ថានភាព</th>
//                   <th className="px-4 py-3"></th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {filteredSuppliers.map((supplier) => {
//                   const monthlyExp = supplier.monthlyExpense?.[currentMonth] || 0;
//                   return (
//                     <tr key={supplier.id} className="hover:bg-gray-50 transition-colors group">
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-3">
//                           <img src={supplier.avatar} alt={supplier.name} className="w-8 h-8 rounded-full object-cover" />
//                           <div>
//                             <span className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">
//                               {supplier.name}
//                             </span>
//                             <p className="text-xs text-gray-400">{supplier.nameEn}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 text-sm text-gray-600">{supplier.contactPerson}</td>
//                       <td className="px-4 py-3">
//                         <span className="text-xs px-2 py-1 rounded-full bg-teal-50 text-teal-600">
//                           {supplier.category}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-sm text-gray-600">{supplier.phone}</td>
//                       <td className="px-4 py-3 text-sm font-medium text-teal-600">${supplier.totalPurchased.toLocaleString()}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">${monthlyExp.toLocaleString()}</td>
//                       <td className="px-4 py-3">{getStatusBadge(supplier.status)}</td>
//                       <td className="px-4 py-3">
//                         <a href={`/supplier-detail/${supplier.id}`} className="text-teal-600 hover:text-teal-700 text-sm font-medium">
//                           មើលលម្អិត
//                         </a>
//                        </td>
//                      </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {filteredSuppliers.length === 0 && (
//             <div className="text-center py-12 text-gray-400">
//               <FaBuilding className="text-5xl mx-auto mb-3 opacity-30" />
//               <p>មិនមានទិន្នន័យអ្នកផ្គត់ផ្គង់</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Supplier;
import React, { useState } from "react";
import {
  MdSearch,
  MdAdd,
  MdDelete,
  MdEdit,
  MdBusiness,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdPerson,
  MdAttachMoney,
  MdShoppingCart,
  MdHistory,
  MdWarning,
  MdCheckCircle,
  MdClose,
  MdDownload,
  MdPrint,
  MdTrendingUp,
  MdTrendingDown,
  MdCalendarToday,
  MdLocalShipping,
  MdCategory,
  MdReceipt,
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

const Supplier = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Supplier Data
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "ភ្នំពេញ ឱសថការី",
      nameEn: "Phnom Penh Pharmaceutical",
      contactPerson: "លី សុភ័ក្រ្ត",
      email: "info@pppharma.com",
      phone: "023 456 789",
      address: "ផ្លូវ 217, ភ្នំពេញ",
      category: "ថ្នាំមានវេជ្ជបញ្ជា",
      status: "active",
      totalPurchased: 125000,
      totalProducts: 245,
      lastOrder: "2024-12-20",
      paymentTerms: "សាច់ប្រាក់ 30 ថ្ងៃ",
      rating: 4.8,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      monthlyExpense: {
        Jan: 12500, Feb: 13800, Mar: 14200, Apr: 15800, May: 16500, Jun: 17200,
        Jul: 18900, Aug: 19500, Sep: 20100, Oct: 21800, Nov: 23500, Dec: 25200
      }
    },
    {
      id: 2,
      name: "មេគង្គ ឱសថ",
      nameEn: "Mekong Pharmacy",
      contactPerson: "សុខ ច័ន្ទ",
      email: "sales@mekongpharma.com",
      phone: "012 345 678",
      address: "ផ្លូវ 63, ភ្នំពេញ",
      category: "ថ្នាំបង្ការគ្រុន",
      status: "active",
      totalPurchased: 89000,
      totalProducts: 156,
      lastOrder: "2024-12-18",
      paymentTerms: "សាច់ប្រាក់ 15 ថ្ងៃ",
      rating: 4.5,
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      monthlyExpense: {
        Jan: 8900, Feb: 9200, Mar: 9500, Apr: 10100, May: 10800, Jun: 11200,
        Jul: 11800, Aug: 12500, Sep: 13100, Oct: 13800, Nov: 14500, Dec: 15200
      }
    },
    {
      id: 3,
      name: "អង្គរ ឱសថស្ថាន",
      nameEn: "Angkor Pharmacy",
      contactPerson: "សុខា ស្រី",
      email: "contact@angkorpharma.com",
      phone: "015 678 901",
      address: "ផ្លូវ 6, សៀមរាប",
      category: "វីតាមីន",
      status: "active",
      totalPurchased: 45000,
      totalProducts: 89,
      lastOrder: "2024-12-15",
      paymentTerms: "សាច់ប្រាក់",
      rating: 4.2,
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      monthlyExpense: {
        Jan: 4500, Feb: 4800, Mar: 5100, Apr: 5400, May: 5700, Jun: 6000,
        Jul: 6300, Aug: 6600, Sep: 6900, Oct: 7200, Nov: 7500, Dec: 7800
      }
    },
    {
      id: 4,
      name: "កម្ពុជា ឱសថការី",
      nameEn: "Cambodia Pharmaceutical",
      contactPerson: "រតនា ជា",
      email: "info@cambodiapharma.com",
      phone: "097 890 123",
      address: "ផ្លូវ 271, ភ្នំពេញ",
      category: "ថ្នាំបេះដូង",
      status: "active",
      totalPurchased: 32000,
      totalProducts: 67,
      lastOrder: "2024-12-10",
      paymentTerms: "សាច់ប្រាក់ 30 ថ្ងៃ",
      rating: 3.9,
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      monthlyExpense: {
        Jan: 3200, Feb: 3400, Mar: 3600, Apr: 3800, May: 4000, Jun: 4200,
        Jul: 4400, Aug: 4600, Sep: 4800, Oct: 5000, Nov: 5200, Dec: 5400
      }
    },
    {
      id: 5,
      name: "ឯកទេស ឱសថ",
      nameEn: "Specialist Pharma",
      contactPerson: "វិចិត្រា ព្រំ",
      email: "sales@specialistpharma.com",
      phone: "088 765 432",
      address: "ផ្លូវ 2004, ភ្នំពេញ",
      category: "ថ្នាំអង់ទីប៊ីយ៉ូទិក",
      status: "active",
      totalPurchased: 156000,
      totalProducts: 234,
      lastOrder: "2024-12-22",
      paymentTerms: "សាច់ប្រាក់ 45 ថ្ងៃ",
      rating: 4.9,
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      monthlyExpense: {
        Jan: 15600, Feb: 16200, Mar: 16800, Apr: 17400, May: 18000, Jun: 18600,
        Jul: 19200, Aug: 19800, Sep: 20400, Oct: 21000, Nov: 21600, Dec: 22200
      }
    },
    {
      id: 6,
      name: "ព្រះសីហនុ ឱសថ",
      nameEn: "Sihanoukville Pharma",
      contactPerson: "ហុង លី",
      email: "contact@sihanoukpharma.com",
      phone: "096 543 210",
      address: "ផ្លូវជ័យជំនះ, ព្រះសីហនុ",
      category: "ថ្នាំក្អក",
      status: "active",
      totalPurchased: 28000,
      totalProducts: 45,
      lastOrder: "2024-12-12",
      paymentTerms: "សាច់ប្រាក់",
      rating: 4.0,
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      monthlyExpense: {
        Jan: 2800, Feb: 2900, Mar: 3000, Apr: 3100, May: 3200, Jun: 3300,
        Jul: 3400, Aug: 3500, Sep: 3600, Oct: 3700, Nov: 3800, Dec: 3900
      }
    },
  ]);

  const months = ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ"];
  const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const currentMonth = months[selectedMonth];
  const currentYear = selectedYear;

  // Calculate monthly expense for current selected month
  const currentMonthExpense = suppliers.reduce((sum, supplier) => {
    const monthKey = monthsShort[selectedMonth];
    return sum + (supplier.monthlyExpense?.[monthKey] || 0);
  }, 0);

  // Calculate total expense for all time
  const totalExpense = suppliers.reduce((sum, supplier) => sum + supplier.totalPurchased, 0);

  // Calculate expense by category
  const categoryExpense = {};
  suppliers.forEach(supplier => {
    const monthKey = monthsShort[selectedMonth];
    const expense = supplier.monthlyExpense?.[monthKey] || 0;
    if (!categoryExpense[supplier.category]) {
      categoryExpense[supplier.category] = 0;
    }
    categoryExpense[supplier.category] += expense;
  });

  // Prepare data for pie chart
  const pieChartData = Object.entries(categoryExpense).map(([name, value], index) => ({
    name,
    value,
    color: ["#0D9488", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#06B6D4"][index % 7]
  }));

  // Prepare data for monthly line chart
  const monthlyChartData = monthsShort.map((month, index) => ({
    month: months[index],
    expense: suppliers.reduce((sum, supplier) => sum + (supplier.monthlyExpense?.[month] || 0), 0)
  }));

  // Prepare data for supplier bar chart (top 5)
  const topSuppliersChart = [...suppliers]
    .sort((a, b) => b.totalPurchased - a.totalPurchased)
    .slice(0, 5)
    .map(supplier => ({
      name: supplier.name.length > 15 ? supplier.name.substring(0, 12) + "..." : supplier.name,
      expense: supplier.totalPurchased,
      color: "#0D9488"
    }));

  // Calculate previous month for trend
  const prevMonthExpense = suppliers.reduce((sum, supplier) => {
    const prevMonthIndex = selectedMonth === 0 ? 11 : selectedMonth - 1;
    const prevMonthKey = monthsShort[prevMonthIndex];
    return sum + (supplier.monthlyExpense?.[prevMonthKey] || 0);
  }, 0);

  const trend = prevMonthExpense === 0 ? 0 : ((currentMonthExpense - prevMonthExpense) / prevMonthExpense * 100).toFixed(1);

  // Filter suppliers
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || supplier.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-800 mb-1">{label}</p>
          <p className="text-sm text-teal-600">
            {payload[0].name}: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
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
      <p className="text-2xl font-bold text-gray-800">{prefix}{value.toLocaleString()}{suffix}</p>
    </div>
  );

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
          <StatCard title="ចំណាយសរុប" value={totalExpense} icon={FaMoneyBillWave} color="teal" trendValue={12.5} />
          <StatCard title={`ចំណាយប្រចាំខែ (${currentMonth})`} value={currentMonthExpense} icon={FaWallet} color="purple" trendValue={parseFloat(trend)} />
          <StatCard title="អ្នកផ្គត់ផ្គង់សរុប" value={suppliers.length} icon={FaBuilding} color="blue" prefix="" />
          <StatCard title="ផលិតផលសរុប" value={suppliers.reduce((sum, s) => sum + s.totalProducts, 0)} icon={FaBoxes} color="green" prefix="" />
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
              <div className="text-xs text-gray-400">ឆ្នាំ 2024</div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <ComposedChart data={monthlyChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                <Line type="monotone" dataKey="expense" name="ចំណាយ" stroke="#0D9488" strokeWidth={2} dot={{ fill: "#0D9488", r: 4, strokeWidth: 2 }} activeDot={{ r: 6, stroke: "#0D9488", strokeWidth: 2 }}/>
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Category Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MdCategory className="text-teal-600 text-lg" />
                <h3 className="font-semibold text-gray-800">ការចែកចាយចំណាយតាមប្រភេទ</h3>
              </div>
              <div className="text-xs text-gray-400">{currentMonth}</div>
            </div>
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
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {pieChartData.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800">${item.value.toLocaleString()}</span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-gray-100 flex justify-between">
                  <span className="text-sm font-medium text-gray-700">សរុប</span>
                  <span className="font-bold text-teal-600">${currentMonthExpense.toLocaleString()}</span>
                </div>
              </div>
            </div>
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
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={topSuppliersChart} layout="vertical" margin={{ left: 40, right: 20, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} width={100} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Bar dataKey="expense" name="ចំណាយសរុប" fill="#0D9488" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Expense Bars */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <MdLocalShipping className="text-teal-600 text-lg" />
              <h3 className="font-semibold text-gray-800">ចំណាយតាមប្រភេទ (ប្រចាំខែ)</h3>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={pieChartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 10, angle: -15, textAnchor: "end" }} height={60} interval={0} />
                <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Bar dataKey="value" name="ចំណាយ" fill="#0D9488" radius={[4, 4, 0, 0]}>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Expense Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {pieChartData.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">{item.name}</p>
                  <p className="text-lg font-bold text-teal-600">${item.value.toLocaleString()}</p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                  <MdCategory style={{ color: item.color }} size={16} />
                </div>
              </div>
            </div>
          ))}
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
                  <option value="ថ្នាំមានវេជ្ជបញ្ជា">ថ្នាំមានវេជ្ជបញ្ជា</option>
                  <option value="ថ្នាំបង្ការគ្រុន">ថ្នាំបង្ការគ្រុន</option>
                  <option value="ថ្នាំអង់ទីប៊ីយ៉ូទិក">ថ្នាំអង់ទីប៊ីយ៉ូទិក</option>
                  <option value="វីតាមីន">វីតាមីន</option>
                  <option value="ថ្នាំបេះដូង">ថ្នាំបេះដូង</option>
                  <option value="ថ្នាំក្អក">ថ្នាំក្អក</option>
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

          {/* Supplier Table */}
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
                {filteredSuppliers.map((supplier) => {
                  const monthlyExp = supplier.monthlyExpense?.[monthsShort[selectedMonth]] || 0;
                  return (
                    <tr key={supplier.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={supplier.avatar} alt={supplier.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">
                              {supplier.name}
                            </span>
                            <p className="text-xs text-gray-400">{supplier.nameEn}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{supplier.contactPerson}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-teal-50 text-teal-600">
                          {supplier.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{supplier.phone}</td>
                      <td className="px-4 py-3 text-sm font-medium text-teal-600">${supplier.totalPurchased.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">${monthlyExp.toLocaleString()}</td>
                      <td className="px-4 py-3">{getStatusBadge(supplier.status)}</td>
                      <td className="px-4 py-3">
                        <a href={`/supplier-detail/${supplier.id}`} className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                          មើលលម្អិត
                        </a>
                      </td>
                     </tr>
                  );
                })}
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