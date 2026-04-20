// import { FiFilter, FiDownload } from "react-icons/fi";

// const Customer = () => {
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">

//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             គ្រប់គ្រងអតិថិជន
//           </h1>
//           <p className="text-sm text-gray-400 mt-1">
//             គ្រប់គ្រងប្រវត្តិអតិថិជន និងពិន្ទុស្មោះត្រង់
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm text-sm">
//             <FiFilter /> តម្រង់
//           </button>
//           <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm text-sm">
//             <FiDownload /> ទាញយក CSV
//           </button>
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-3 gap-5 mt-6">

//         <div className="bg-white p-5 rounded-xl shadow-sm">
//           <p className="text-xs text-gray-400">អតិថិជនសរុប</p>
//           <h2 className="text-3xl font-bold text-[#0D9488] mt-2">
//             2,842
//           </h2>
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow-sm">
//           <p className="text-xs text-gray-400">វេជ្ជបញ្ជាកំពុងដំណើរការ</p>
//           <h2 className="text-3xl font-bold mt-2">
//             841
//           </h2>
//           <p className="text-xs text-gray-400 mt-1">
//             កំពុងដំណើរការនៅសាខាច្រើន
//           </p>
//         </div>

//         <div className="bg-[#0D9488] text-white p-5 rounded-xl shadow-sm">
//           <p className="text-xs opacity-80">កម្រិតស្មោះត្រង់</p>
//           <h2 className="text-xl font-bold mt-2">
//             VIP
//           </h2>
//           <p className="text-xs opacity-80 mt-1">
//             អតិថិជនសំខាន់
//           </p>
//         </div>

//       </div>

//       {/* TABLE */}
//       <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">

//         {/* HEADER */}
//         <div className="grid grid-cols-5 px-5 py-3 text-xs text-gray-400 border-b border-gray-200">
//           <span>ឈ្មោះអតិថិជន</span>
//           <span>ព័ត៌មានទំនាក់ទំនង</span>
//           <span>មកចុងក្រោយ</span>
//           <span>ពិន្ទុ</span>
//           <span>សកម្មភាព</span>
//         </div>

//         {/* ROW */}
//         {[1, 2, 3, 4].map((i) => (
//           <div
//             key={i}
//             className="grid grid-cols-5 px-5 py-4 items-center border-b border-gray-200 hover:bg-gray-50"
//           >

//             {/* NAME */}
//             <div className="flex items-center gap-3">
//               <img
//                 src={`https://i.pravatar.cc/100?img=${i}`}
//                 className="w-10 h-10 rounded-full"
//                 alt=""
//               />
//               <div>
//                 <p className="text-sm font-semibold">
//                   អតិថិជន {i}
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   ID: #00{i}
//                 </p>
//               </div>
//             </div>

//             {/* CONTACT */}
//             <div className="text-sm text-gray-500">
//               example{i}@mail.com <br />
//               012 345 67{i}
//             </div>

//             {/* LAST VISIT */}
//             <div className="text-sm">
//               10 មករា 2024
//             </div>

//             {/* POINTS */}
//             <div>
//               <div className="w-20 bg-gray-200 h-2 rounded-full">
//                 <div className="bg-[#0D9488] h-2 rounded-full w-2/3"></div>
//               </div>
//               <p className="text-xs mt-1">1200 ពិន្ទុ</p>
//             </div>

//             {/* ACTION */}
//             <button className="text-[#0D9488] text-sm">
//               មើលប្រវត្តិ →
//             </button>

//           </div>
//         ))}

//         {/* FOOTER */}
//         <div className="flex justify-between items-center p-4 text-sm text-gray-400">
//           <p>បង្ហាញ 1-4 នៃ 2,842</p>

//           <div className="flex gap-2">
//             <button className="px-3 py-1 bg-gray-200 rounded">1</button>
//             <button className="px-3 py-1 bg-[#0D9488] text-white rounded">
//               2
//             </button>
//             <button className="px-3 py-1 bg-gray-200 rounded">3</button>
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default Customer;
import React, { useState } from "react";
import {
  MdSearch,
  MdAdd,
  MdDelete,
  MdEdit,
  MdMoreVert,
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCalendarToday,
  MdHistory,
  MdShoppingBag,
  MdStar,
  MdStarBorder,
  MdTrendingUp,
  MdVerified,
  MdClose,
  MdSave,
  MdCancel,
  MdCheckCircle,
  MdDownload,
  MdPrint,
  MdFilterList,
  MdGridOn,
  MdList,
} from "react-icons/md";
import { FaUserGraduate, FaUserCheck, FaUserClock, FaMoneyBillWave } from "react-icons/fa";

const Customer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCustomerDetail, setSelectedCustomerDetail] = useState(null);

  // Customer Data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "ស្រី សុខា",
      email: "sokha.srey@email.com",
      phone: "012 345 678",
      gender: "ស្រី",
      address: "ផ្ទះលេខ 123, ផ្លូវ 456, សង្កាត់បឹងកេងកង, ខណ្ឌចំការមន, ភ្នំពេញ",
      joinDate: "2023-01-15",
      totalSpent: 1250.50,
      totalOrders: 24,
      lastOrder: "2024-12-20",
      tier: "Gold",
      status: "active",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      birthDate: "1990-05-15",
      points: 1250,
      favoriteProducts: ["ប៉ារ៉ាសេតាម៉ុល", "វីតាមីន C"],
      notes: "អតិថិជនស្មោះត្រង់",
    },
    {
      id: 2,
      name: "ច័ន្ទ សុផល",
      email: "sophal.chan@email.com",
      phone: "023 456 789",
      gender: "ប្រុស",
      address: "ផ្ទះលេខ 45, ផ្លូវ 789, សង្កាត់ទួលស្វាយព្រៃ, ខណ្ឌបឹងកេងកង, ភ្នំពេញ",
      joinDate: "2023-03-20",
      totalSpent: 890.75,
      totalOrders: 15,
      lastOrder: "2024-12-18",
      tier: "Silver",
      status: "active",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      birthDate: "1988-08-22",
      points: 890,
      favoriteProducts: ["អាម៉ុកស៊ីលីន", "ថ្នាំបេះដូង"],
      notes: "",
    },
    {
      id: 3,
      name: "ជា រតនា",
      email: "ratana.chea@email.com",
      phone: "015 678 901",
      gender: "ស្រី",
      address: "ផ្ទះលេខ 78, ផ្លូវ 101, សង្កាត់ទួលទំពូង, ខណ្ឌចំការមន, ភ្នំពេញ",
      joinDate: "2023-06-10",
      totalSpent: 2100.00,
      totalOrders: 35,
      lastOrder: "2024-12-22",
      tier: "Platinum",
      status: "active",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      birthDate: "1992-03-10",
      points: 2100,
      favoriteProducts: ["វីតាមីន B Complex", "ថ្នាំក្អក"],
      notes: "VIP Customer",
    },
    {
      id: 4,
      name: "លី ហុង",
      email: "hong.ly@email.com",
      phone: "097 890 123",
      gender: "ប្រុស",
      address: "ផ្ទះលេខ 234, ផ្លូវ 567, សង្កាត់ផ្សារដើមគរ, ខណ្ឌឫស្សីកែវ, ភ្នំពេញ",
      joinDate: "2023-08-05",
      totalSpent: 450.25,
      totalOrders: 8,
      lastOrder: "2024-12-10",
      tier: "Bronze",
      status: "inactive",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      birthDate: "1995-11-30",
      points: 450,
      favoriteProducts: ["ថ្នាំផ្សះ", "ប៉ារ៉ាសេតាម៉ុល"],
      notes: "",
    },
    {
      id: 5,
      name: "ម៉ែន សុភ័ក្រ្ត",
      email: "sopheak.mean@email.com",
      phone: "012 987 654",
      gender: "ស្រី",
      address: "ផ្ទះលេខ 567, ផ្លូវ 890, សង្កាត់ស្វាយដង្គំ, ខណ្ឌដូនពេញ, ភ្នំពេញ",
      joinDate: "2023-10-18",
      totalSpent: 3200.00,
      totalOrders: 52,
      lastOrder: "2024-12-23",
      tier: "Diamond",
      status: "active",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      birthDate: "1985-07-25",
      points: 3200,
      favoriteProducts: ["ថ្នាំបង្ការសម្ពាធឈាម", "វីតាមីន C"],
      notes: "អតិថិជនកំពូល",
    },
    {
      id: 6,
      name: "សឿន សុខា",
      email: "sokha.suon@email.com",
      phone: "096 543 210",
      gender: "ប្រុស",
      address: "ផ្ទះលេខ 890, ផ្លូវ 123, សង្កាត់ច្បារអំពៅ, ខណ្ឌមានជ័យ, ភ្នំពេញ",
      joinDate: "2024-01-12",
      totalSpent: 320.00,
      totalOrders: 6,
      lastOrder: "2024-12-15",
      tier: "Bronze",
      status: "active",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      birthDate: "1998-02-14",
      points: 320,
      favoriteProducts: ["ថ្នាំបំបាត់ការឈឺចាប់"],
      notes: "",
    },
    {
      id: 7,
      name: "កែវ ច័ន្ទបញ្ញា",
      email: "channy.keo@email.com",
      phone: "017 234 567",
      gender: "ស្រី",
      address: "ផ្ទះលេខ 345, ផ្លូវ 678, សង្កាត់ព្រែកថ្មី, ខណ្ឌជ្រោយចង្វារ, ភ្នំពេញ",
      joinDate: "2023-09-25",
      totalSpent: 1670.00,
      totalOrders: 28,
      lastOrder: "2024-12-19",
      tier: "Gold",
      status: "active",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      birthDate: "1991-09-18",
      points: 1670,
      favoriteProducts: ["ថ្នាំក្រពះ", "វីតាមីន B Complex"],
      notes: "",
    },
    {
      id: 8,
      name: "ព្រំ វិចិត្រា",
      email: "vichitra.prom@email.com",
      phone: "088 765 432",
      gender: "ប្រុស",
      address: "ផ្ទះលេខ 678, ផ្លូវ 901, សង្កាត់ដង្កោ, ខណ្ឌពោធិ៍សែនជ័យ, ភ្នំពេញ",
      joinDate: "2022-11-30",
      totalSpent: 4500.00,
      totalOrders: 68,
      lastOrder: "2024-12-24",
      tier: "Diamond",
      status: "active",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      birthDate: "1982-12-05",
      points: 4500,
      favoriteProducts: ["ថ្នាំបេះដូង", "ថ្នាំបង្ការសម្ពាធឈាម"],
      notes: "អតិថិជនស្មោះត្រង់យូរឆ្នាំ",
    },
  ]);

  // New customer form state
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    birthDate: "",
    tier: "Bronze",
    notes: "",
  });

  // Edit customer form state
  const [editCustomer, setEditCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    birthDate: "",
    tier: "",
    notes: "",
  });

  // Summary statistics
  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === "active").length,
    totalSpent: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    totalOrders: customers.reduce((sum, c) => sum + c.totalOrders, 0),
    avgSpent: (customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length).toFixed(2),
    diamondCount: customers.filter(c => c.tier === "Diamond").length,
    goldCount: customers.filter(c => c.tier === "Gold").length,
    silverCount: customers.filter(c => c.tier === "Silver").length,
    bronzeCount: customers.filter(c => c.tier === "Bronze").length,
  };

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesTier = selectedTier === "all" || customer.tier === selectedTier;
    const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus;
    const matchesGender = selectedGender === "all" || customer.gender === selectedGender;
    return matchesSearch && matchesTier && matchesStatus && matchesGender;
  });

  // Get tier color
  const getTierColor = (tier) => {
    const colors = {
      Diamond: "bg-purple-100 text-purple-700",
      Platinum: "bg-gray-100 text-gray-700",
      Gold: "bg-yellow-100 text-yellow-700",
      Silver: "bg-gray-100 text-gray-600",
      Bronze: "bg-orange-100 text-orange-700",
    };
    return colors[tier] || "bg-gray-100 text-gray-600";
  };

  // Get status badge
  const getStatusBadge = (status) => {
    if (status === "active") {
      return (
        <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-600">
          <FaUserCheck size={10} /> សកម្ម
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-500">
        <FaUserClock size={10} /> អសកម្ម
      </span>
    );
  };

  // Handle add customer
  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.phone) {
      alert("សូមបំពេញព័ត៌មានចាំបាច់");
      return;
    }
    const customer = {
      id: customers.length + 1,
      ...newCustomer,
      joinDate: new Date().toISOString().split('T')[0],
      totalSpent: 0,
      totalOrders: 0,
      lastOrder: "-",
      status: "active",
      avatar: `https://randomuser.me/api/portraits/${newCustomer.gender === "ប្រុស" ? "men" : "women"}/${customers.length + 1}.jpg`,
      points: 0,
      favoriteProducts: [],
    };
    setCustomers([customer, ...customers]);
    setShowAddModal(false);
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      gender: "",
      address: "",
      birthDate: "",
      tier: "Bronze",
      notes: "",
    });
  };

  // Handle edit customer
  const handleEditCustomer = () => {
    if (!editCustomer.name || !editCustomer.phone) {
      alert("សូមបំពេញព័ត៌មានចាំបាច់");
      return;
    }
    setCustomers(customers.map(c =>
      c.id === selectedCustomer.id
        ? { ...c, ...editCustomer }
        : c
    ));
    setShowEditModal(false);
    setSelectedCustomer(null);
  };

  // Handle delete customer
  const handleDeleteCustomer = () => {
    setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
    setShowDeleteConfirm(false);
    setSelectedCustomer(null);
  };

  // Open edit modal
  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setEditCustomer({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      gender: customer.gender,
      address: customer.address,
      birthDate: customer.birthDate,
      tier: customer.tier,
      notes: customer.notes || "",
    });
    setShowEditModal(true);
  };

  // Open delete confirm
  const openDeleteConfirm = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteConfirm(true);
  };

  // View customer details
  const viewCustomerDetails = (customer) => {
    setSelectedCustomerDetail(customer);
  };

  const StatCard = ({ title, value, icon: Icon, color, prefix = "$", suffix = "" }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl bg-${color}-50`}>
          <Icon className={`text-${color}-600 text-xl`} />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">គ្រប់គ្រងអតិថិជន</h1>
              <p className="text-gray-500 text-sm mt-0.5">គ្រប់គ្រង និងតាមដានព័ត៌មានអតិថិជនទាំងអស់</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <MdAdd size={20} />
              <span>បន្ថែមអតិថិជនថ្មី</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard title="អតិថិជនសរុប" value={stats.totalCustomers} icon={MdPerson} color="teal" prefix="" />
          <StatCard title="អតិថិជនសកម្ម" value={stats.activeCustomers} icon={FaUserCheck} color="green" prefix="" />
          <StatCard title="ចំណាយសរុប" value={stats.totalSpent} icon={FaMoneyBillWave} color="purple" />
          <StatCard title="មធ្យមភាគចំណាយ" value={stats.avgSpent} icon={MdTrendingUp} color="blue" />
        </div>

        {/* Tier Distribution */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
            <p className="text-sm opacity-90">ពេជ្រ</p>
            <p className="text-2xl font-bold">{stats.diamondCount}</p>
          </div>
          <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl p-4 text-white">
            <p className="text-sm opacity-90">ប្លាទីន</p>
            <p className="text-2xl font-bold">{stats.platinumCount || 1}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-4 text-white">
            <p className="text-sm opacity-90">មាស</p>
            <p className="text-2xl font-bold">{stats.goldCount}</p>
          </div>
          <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl p-4 text-white">
            <p className="text-sm opacity-90">ប្រាក់/សំរិទ្ធ</p>
            <p className="text-2xl font-bold">{stats.silverCount + stats.bronzeCount}</p>
          </div>
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
                    placeholder="ស្វែងរកអតិថិជន..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                  />
                </div>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                >
                  <option value="all">កម្រិតទាំងអស់</option>
                  <option value="Diamond">ពេជ្រ</option>
                  <option value="Platinum">ប្លាទីន</option>
                  <option value="Gold">មាស</option>
                  <option value="Silver">ប្រាក់</option>
                  <option value="Bronze">សំរិទ្ធ</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                >
                  <option value="all">ស្ថានភាពទាំងអស់</option>
                  <option value="active">សកម្ម</option>
                  <option value="inactive">អសកម្ម</option>
                </select>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 bg-white"
                >
                  <option value="all">ភេទទាំងអស់</option>
                  <option value="ប្រុស">ប្រុស</option>
                  <option value="ស្រី">ស្រី</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? "bg-teal-50 text-teal-600" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}
                >
                  <MdGridOn size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-xl transition-all ${viewMode === "list" ? "bg-teal-50 text-teal-600" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}
                >
                  <MdList size={20} />
                </button>
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

          {/* Customer Grid/List View */}
          <div className="p-4">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    onClick={() => viewCustomerDetails(customer)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={customer.avatar}
                          alt={customer.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-teal-100 group-hover:border-teal-400 transition-colors"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                            {customer.name}
                          </h4>
                          <p className="text-xs text-gray-500">{customer.phone}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTierColor(customer.tier)}`}>
                          {customer.tier}
                        </span>
                        {getStatusBadge(customer.status)}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">ចំណាយសរុប</span>
                        <span className="font-medium text-teal-600">${customer.totalSpent.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">ការបញ្ជាទិញ</span>
                        <span className="font-medium text-gray-700">{customer.totalOrders} ដង</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">ពិន្ទុ</span>
                        <span className="font-medium text-gray-700">{customer.points}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          i < Math.floor(customer.totalSpent / 1000) ? (
                            <MdStar key={i} className="text-yellow-400" size={14} />
                          ) : (
                            <MdStarBorder key={i} className="text-gray-300" size={14} />
                          )
                        ))}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(customer);
                          }}
                          className="p-1 text-gray-400 hover:text-teal-600 transition-colors"
                        >
                          <MdEdit size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteConfirm(customer);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <MdDelete size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-100">
                      <th className="px-4 py-3">អតិថិជន</th>
                      <th className="px-4 py-3">ទំនាក់ទំនង</th>
                      <th className="px-4 py-3">កម្រិត</th>
                      <th className="px-4 py-3">ចំណាយសរុប</th>
                      <th className="px-4 py-3">ការបញ្ជាទិញ</th>
                      <th className="px-4 py-3">កាលបរិច្ឆេទចូល</th>
                      <th className="px-4 py-3">ស្ថានភាព</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer group"
                        onClick={() => viewCustomerDetails(customer)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={customer.avatar} alt={customer.name} className="w-8 h-8 rounded-full object-cover" />
                            <span className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">
                              {customer.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-gray-600">{customer.phone}</div>
                          <div className="text-xs text-gray-400">{customer.email}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTierColor(customer.tier)}`}>
                            {customer.tier}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-teal-600">${customer.totalSpent.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{customer.totalOrders}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{customer.joinDate}</td>
                        <td className="px-4 py-3">{getStatusBadge(customer.status)}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditModal(customer);
                              }}
                              className="p-1 text-gray-400 hover:text-teal-600 transition-colors"
                            >
                              <MdEdit size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openDeleteConfirm(customer);
                              }}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <MdDelete size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer with total */}
          {filteredCustomers.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">បង្ហាញ {filteredCustomers.length} នាក់ ក្នុងចំណោម {customers.length} នាក់</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">មុន</button>
                  <button className="px-3 py-1 bg-teal-600 text-white rounded-lg text-sm">1</button>
                  <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">2</button>
                  <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">3</button>
                  <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">បន្ទាប់</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomerDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCustomerDetail(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedCustomerDetail.avatar}
                    alt={selectedCustomerDetail.name}
                    className="w-16 h-16 rounded-full object-cover border-3 border-teal-100"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedCustomerDetail.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTierColor(selectedCustomerDetail.tier)}`}>
                        {selectedCustomerDetail.tier}
                      </span>
                      {getStatusBadge(selectedCustomerDetail.status)}
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedCustomerDetail(null)} className="text-gray-400 hover:text-gray-600">
                  <MdClose size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdEmail className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">អ៊ីមែល</p>
                    <p className="text-sm text-gray-700">{selectedCustomerDetail.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdPhone className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">ទូរស័ព្ទ</p>
                    <p className="text-sm text-gray-700">{selectedCustomerDetail.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdCalendarToday className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">ថ្ងៃខែឆ្នាំកំណើត</p>
                    <p className="text-sm text-gray-700">{selectedCustomerDetail.birthDate || "-"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MdPerson className="text-gray-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">ភេទ</p>
                    <p className="text-sm text-gray-700">{selectedCustomerDetail.gender}</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <MdLocationOn className="text-gray-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-gray-400">អាសយដ្ឋាន</p>
                      <p className="text-sm text-gray-700">{selectedCustomerDetail.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-3">ស្ថិតិការទិញ</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-teal-50 rounded-xl">
                    <p className="text-2xl font-bold text-teal-600">${selectedCustomerDetail.totalSpent.toFixed(2)}</p>
                    <p className="text-xs text-gray-500 mt-1">ចំណាយសរុប</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <p className="text-2xl font-bold text-blue-600">{selectedCustomerDetail.totalOrders}</p>
                    <p className="text-xs text-gray-500 mt-1">ការបញ្ជាទិញ</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-xl">
                    <p className="text-2xl font-bold text-purple-600">{selectedCustomerDetail.points}</p>
                    <p className="text-xs text-gray-500 mt-1">ពិន្ទុ</p>
                  </div>
                </div>
              </div>

              {selectedCustomerDetail.favoriteProducts?.length > 0 && (
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">ផលិតផលដែលចូលចិត្ត</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomerDetail.favoriteProducts.map((product, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedCustomerDetail.notes && (
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">កំណត់ចំណាំ</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">{selectedCustomerDetail.notes}</p>
                </div>
              )}

              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setSelectedCustomerDetail(null);
                    openEditModal(selectedCustomerDetail);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl transition-colors"
                >
                  <MdEdit size={18} />
                  <span>កែប្រែ</span>
                </button>
                <button
                  onClick={() => setSelectedCustomerDetail(null)}
                  className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 py-2.5 rounded-xl transition-colors"
                >
                  <MdClose size={18} />
                  <span>បិទ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">បន្ថែមអតិថិជនថ្មី</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                  <MdClose size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះពេញ *</label>
                    <input
                      type="text"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      placeholder="បញ្ចូលឈ្មោះ"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">លេខទូរស័ព្ទ *</label>
                    <input
                      type="tel"
                      value={newCustomer.phone}
                      onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                      placeholder="012 345 678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">អ៊ីមែល</label>
                  <input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder="example@email.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ភេទ</label>
                    <select
                      value={newCustomer.gender}
                      onChange={(e) => setNewCustomer({ ...newCustomer, gender: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="">ជ្រើសរើស</option>
                      <option value="ប្រុស">ប្រុស</option>
                      <option value="ស្រី">ស្រី</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ថ្ងៃខែឆ្នាំកំណើត</label>
                    <input
                      type="date"
                      value={newCustomer.birthDate}
                      onChange={(e) => setNewCustomer({ ...newCustomer, birthDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">អាសយដ្ឋាន</label>
                  <textarea
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder="បញ្ចូលអាសយដ្ឋាន"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">កម្រិត</label>
                    <select
                      value={newCustomer.tier}
                      onChange={(e) => setNewCustomer({ ...newCustomer, tier: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="Bronze">សំរិទ្ធ</option>
                      <option value="Silver">ប្រាក់</option>
                      <option value="Gold">មាស</option>
                      <option value="Platinum">ប្លាទីន</option>
                      <option value="Diamond">ពេជ្រ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">កំណត់ចំណាំ</label>
                  <textarea
                    value={newCustomer.notes}
                    onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder="កំណត់ចំណាំបន្ថែម..."
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
                  onClick={handleAddCustomer}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MdSave size={18} />
                  រក្សាទុក
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {showEditModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">កែប្រែព័ត៌មានអតិថិជន</h2>
                <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                  <MdClose size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះពេញ *</label>
                    <input
                      type="text"
                      value={editCustomer.name}
                      onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">លេខទូរស័ព្ទ *</label>
                    <input
                      type="tel"
                      value={editCustomer.phone}
                      onChange={(e) => setEditCustomer({ ...editCustomer, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">អ៊ីមែល</label>
                  <input
                    type="email"
                    value={editCustomer.email}
                    onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ភេទ</label>
                    <select
                      value={editCustomer.gender}
                      onChange={(e) => setEditCustomer({ ...editCustomer, gender: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="">ជ្រើសរើស</option>
                      <option value="ប្រុស">ប្រុស</option>
                      <option value="ស្រី">ស្រី</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ថ្ងៃខែឆ្នាំកំណើត</label>
                    <input
                      type="date"
                      value={editCustomer.birthDate}
                      onChange={(e) => setEditCustomer({ ...editCustomer, birthDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">អាសយដ្ឋាន</label>
                  <textarea
                    value={editCustomer.address}
                    onChange={(e) => setEditCustomer({ ...editCustomer, address: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">កម្រិត</label>
                    <select
                      value={editCustomer.tier}
                      onChange={(e) => setEditCustomer({ ...editCustomer, tier: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="Bronze">សំរិទ្ធ</option>
                      <option value="Silver">ប្រាក់</option>
                      <option value="Gold">មាស</option>
                      <option value="Platinum">ប្លាទីន</option>
                      <option value="Diamond">ពេជ្រ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">កំណត់ចំណាំ</label>
                  <textarea
                    value={editCustomer.notes}
                    onChange={(e) => setEditCustomer({ ...editCustomer, notes: e.target.value })}
                    rows="2"
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
                  onClick={handleEditCustomer}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MdSave size={18} />
                  រក្សាទុកការផ្លាស់ប្តូរ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdDelete className="text-red-600 text-3xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">លុបអតិថិជន</h2>
              <p className="text-gray-500 mb-6">
                តើអ្នកច្បាស់ជាចង់លុបអតិថិជន <span className="font-semibold text-gray-800">{selectedCustomer.name}</span> មែនទេ?<br />
                សកម្មភាពនេះមិនអាចស្តារឡើងវិញបានទេ។
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  បោះបង់
                </button>
                <button
                  onClick={handleDeleteCustomer}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  លុប
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;