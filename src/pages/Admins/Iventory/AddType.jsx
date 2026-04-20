import React, { useState } from "react";
import {
  MdArrowBack,
  MdAdd,
  MdDelete,
  MdEdit,
  MdClose,
  MdSave,
  MdCategory,
  MdSubdirectoryArrowRight,
  MdInfo,
  MdCheckCircle,
  MdWarning,
} from "react-icons/md";
import { FaPills, FaBoxes, FaCube } from "react-icons/fa";

const AddType = () => {
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: "ថ្នាំបង្ការគ្រុន", 
      nameEn: "Antipyretics",
      icon: "🌡️",
      productCount: 12,
      subCategories: [
        { id: 1, name: "ប៉ារ៉ាសេតាម៉ុល", nameEn: "Paracetamol", productCount: 5 },
        { id: 2, name: "អ៊ីប៊ុយប្រូហ្វេន", nameEn: "Ibuprofen", productCount: 4 },
        { id: 3, name: "អាស្ពីរីន", nameEn: "Aspirin", productCount: 3 },
      ]
    },
    { 
      id: 2, 
      name: "ថ្នាំអង់ទីប៊ីយ៉ូទិក", 
      nameEn: "Antibiotics",
      icon: "💊",
      productCount: 8,
      subCategories: [
        { id: 4, name: "អាម៉ុកស៊ីលីន", nameEn: "Amoxicillin", productCount: 3 },
        { id: 5, name: "ស៊ីប្រូហ្វ្លុកសាស៊ីន", nameEn: "Ciprofloxacin", productCount: 2 },
        { id: 6, name: "ដុកស៊ីស៊ីគ្លីន", nameEn: "Doxycycline", productCount: 3 },
      ]
    },
    { 
      id: 3, 
      name: "វីតាមីន", 
      nameEn: "Vitamins",
      icon: "🍊",
      productCount: 15,
      subCategories: [
        { id: 7, name: "វីតាមីន C", nameEn: "Vitamin C", productCount: 4 },
        { id: 8, name: "វីតាមីន B Complex", nameEn: "Vitamin B Complex", productCount: 5 },
        { id: 9, name: "វីតាមីន D", nameEn: "Vitamin D", productCount: 3 },
        { id: 10, name: "ម៉ាក់ស៊ីកាល់", nameEn: "Magnesium", productCount: 3 },
      ]
    },
    { 
      id: 4, 
      name: "ថ្នាំបេះដូង", 
      nameEn: "Cardiovascular",
      icon: "❤️",
      productCount: 6,
      subCategories: [
        { id: 11, name: "អាម៉ូឌីភីន", nameEn: "Amlodipine", productCount: 2 },
        { id: 12, name: "ឡូសាតាន់", nameEn: "Losartan", productCount: 2 },
        { id: 13, name: "បេតាប្លុក", nameEn: "Beta Blockers", productCount: 2 },
      ]
    },
    { 
      id: 5, 
      name: "ថ្នាំក្រពះ", 
      nameEn: "Gastrointestinal",
      icon: "🍽️",
      productCount: 7,
      subCategories: [
        { id: 14, name: "អូមេប្រាហ្សូល", nameEn: "Omeprazole", productCount: 3 },
        { id: 15, name: "រ៉ានីទីឌីន", nameEn: "Ranitidine", productCount: 2 },
        { id: 16, name: "អាន់តាស៊ីត", nameEn: "Antacids", productCount: 2 },
      ]
    },
    { 
      id: 6, 
      name: "ថ្នាំក្អក", 
      nameEn: "Cough & Cold",
      icon: "🤧",
      productCount: 5,
      subCategories: [
        { id: 17, name: "ស៊ីរ៉ូក្អក", nameEn: "Cough Syrup", productCount: 2 },
        { id: 18, name: "ថ្នាំបំបាត់ការក្អក", nameEn: "Antitussives", productCount: 2 },
        { id: 19, name: "ម៉ូកូលីទិក", nameEn: "Mucolytics", productCount: 1 },
      ]
    },
    { 
      id: 7, 
      name: "ថ្នាំលាប", 
      nameEn: "Topical",
      icon: "🧴",
      productCount: 4,
      subCategories: [
        { id: 20, name: "អ៊ីដ្រូកូទីសូន", nameEn: "Hydrocortisone", productCount: 2 },
        { id: 21, name: "បេតាមេតាសូន", nameEn: "Betamethasone", productCount: 1 },
        { id: 22, name: "ថ្នាំប្រឆាំងផ្សិត", nameEn: "Antifungal", productCount: 1 },
      ]
    },
    { 
      id: 8, 
      name: "ឧបករណ៍វេជ្ជសាស្ត្រ", 
      nameEn: "Medical Devices",
      icon: "🩺",
      productCount: 9,
      subCategories: [
        { id: 23, name: "ម៉ាសបិទមុខ", nameEn: "Face Mask", productCount: 3 },
        { id: 24, name: "ស្រោមដៃ", nameEn: "Gloves", productCount: 2 },
        { id: 25, name: "បង់រុំ", nameEn: "Bandages", productCount: 2 },
        { id: 26, name: "ឧបករណ៍វាស់សម្ពាធឈាម", nameEn: "Blood Pressure Monitor", productCount: 2 },
      ]
    },
  ]);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddSubModal, setShowAddSubModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryNameEn, setNewCategoryNameEn] = useState("");
  const [newSubName, setNewSubName] = useState("");
  const [newSubNameEn, setNewSubNameEn] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);

  const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);
  const totalCategories = categories.length;
  const totalSubCategories = categories.reduce((sum, cat) => sum + cat.subCategories.length, 0);

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: categories.length + 1,
        name: newCategoryName,
        nameEn: newCategoryNameEn,
        icon: "📦",
        productCount: 0,
        subCategories: [],
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setNewCategoryNameEn("");
      setShowAddCategoryModal(false);
    }
  };

  const handleAddSubCategory = () => {
    if (newSubName.trim() && selectedCategory) {
      const updatedCategories = categories.map(cat => {
        if (cat.id === selectedCategory.id) {
          const newSub = {
            id: cat.subCategories.length + 1,
            name: newSubName,
            nameEn: newSubNameEn,
            productCount: 0,
          };
          return { ...cat, subCategories: [...cat.subCategories, newSub] };
        }
        return cat;
      });
      setCategories(updatedCategories);
      setNewSubName("");
      setNewSubNameEn("");
      setShowAddSubModal(false);
      setSelectedCategory(null);
    }
  };

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
      setShowDeleteConfirm(false);
      setSelectedCategory(null);
    }
  };

  const handleDeleteSubCategory = (categoryId, subId) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          subCategories: cat.subCategories.filter(sub => sub.id !== subId),
          productCount: cat.productCount - (cat.subCategories.find(sub => sub.id === subId)?.productCount || 0)
        };
      }
      return cat;
    });
    setCategories(updatedCategories);
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl bg-${color}-50`}>
          <Icon className={`text-${color}-600 text-xl`} />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <a href="/add-product" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <MdArrowBack size={20} className="text-gray-600" />
              </a>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">គ្រប់គ្រងប្រភេទផលិតផល</h1>
                <p className="text-gray-500 text-sm mt-0.5">គ្រប់គ្រងប្រភេទ និងប្រភេទរងនៃផលិតផលទាំងអស់</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddCategoryModal(true)}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <MdAdd size={20} />
              <span>បន្ថែមប្រភេទថ្មី</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <StatCard title="ប្រភេទសរុប" value={totalCategories} icon={MdCategory} color="teal" />
          <StatCard title="ប្រភេទរងសរុប" value={totalSubCategories} icon={MdSubdirectoryArrowRight} color="blue" />
          <StatCard title="ផលិតផលសរុប" value={totalProducts} icon={FaPills} color="green" />
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-800">បញ្ជីប្រភេទផលិតផល</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {categories.map((category) => (
              <div key={category.id} className="hover:bg-gray-50 transition-colors">
                {/* Main Category Row */}
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{category.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{category.name}</h4>
                      <p className="text-xs text-gray-400">{category.nameEn}</p>
                    </div>
                    <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full ml-2">
                      {category.productCount} ផលិតផល
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(category);
                        setShowAddSubModal(true);
                      }}
                      className="p-1.5 text-gray-400 hover:text-teal-600 transition-colors"
                      title="បន្ថែមប្រភេទរង"
                    >
                      <MdAdd size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(category);
                        setShowDeleteConfirm(true);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                      title="លុបប្រភេទ"
                    >
                      <MdDelete size={18} />
                    </button>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform ${expandedCategory === category.id ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Sub Categories */}
                {expandedCategory === category.id && (
                  <div className="pl-12 pr-4 pb-4 bg-gray-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {category.subCategories.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100 hover:shadow-sm transition-all">
                          <div className="flex items-center gap-2">
                            <MdSubdirectoryArrowRight className="text-teal-400 text-sm" />
                            <div>
                              <p className="font-medium text-gray-700 text-sm">{sub.name}</p>
                              <p className="text-xs text-gray-400">{sub.nameEn}</p>
                            </div>
                            <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                              {sub.productCount}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeleteSubCategory(category.id, sub.id)}
                            className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <MdDelete size={14} />
                          </button>
                        </div>
                      ))}
                      {category.subCategories.length === 0 && (
                        <div className="text-center py-4 text-gray-400 col-span-full">
                          <p className="text-sm">មិនទាន់មានប្រភេទរង</p>
                          <button
                            onClick={() => {
                              setSelectedCategory(category);
                              setShowAddSubModal(true);
                            }}
                            className="text-xs text-teal-600 mt-1 hover:underline"
                          >
                            + បន្ថែមប្រភេទរង
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-4 border border-teal-100">
          <div className="flex items-start gap-3">
            <MdInfo className="text-teal-600 text-xl mt-0.5" />
            <div>
              <p className="font-medium text-gray-800">ការណែនាំអំពីការប្រើប្រាស់</p>
              <p className="text-sm text-gray-600 mt-1">
                • ប្រភេទ (Category) ជាក្រុមធំនៃផលិតផល ដូចជា ថ្នាំបង្ការគ្រុន, វីតាមីន ។ល។<br />
                • ប្រភេទរង (Sub Category) ជាក្រុមរងនៃផលិតផល ដូចជា ប៉ារ៉ាសេតាម៉ុល, វីតាមីន C ។ល។<br />
                • អ្នកអាចបន្ថែម កែប្រែ ឬលុបប្រភេទ និងប្រភេទរងបានតាមតម្រូវការ
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddCategoryModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">បន្ថែមប្រភេទថ្មី</h2>
                <button onClick={() => setShowAddCategoryModal(false)} className="text-gray-400 hover:text-gray-600">
                  <MdClose size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះប្រភេទ (ខ្មែរ)</label>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder="ឧ. ថ្នាំបង្ការគ្រុន"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះប្រភេទ (អង់គ្លេស)</label>
                  <input
                    type="text"
                    value={newCategoryNameEn}
                    onChange={(e) => setNewCategoryNameEn(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder="ឧ. Antipyretics"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowAddCategoryModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  បោះបង់
                </button>
                <button onClick={handleAddCategory} className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors">
                  បន្ថែម
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Sub Category Modal */}
      {showAddSubModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddSubModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  បន្ថែមប្រភេទរងសម្រាប់ {selectedCategory.name}
                </h2>
                <button onClick={() => setShowAddSubModal(false)} className="text-gray-400 hover:text-gray-600">
                  <MdClose size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះប្រភេទរង (ខ្មែរ)</label>
                  <input
                    type="text"
                    value={newSubName}
                    onChange={(e) => setNewSubName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder="ឧ. ប៉ារ៉ាសេតាម៉ុល"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះប្រភេទរង (អង់គ្លេស)</label>
                  <input
                    type="text"
                    value={newSubNameEn}
                    onChange={(e) => setNewSubNameEn(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    placeholder="ឧ. Paracetamol"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowAddSubModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  បោះបង់
                </button>
                <button onClick={handleAddSubCategory} className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors">
                  បន្ថែម
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdDelete className="text-red-600 text-3xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">លុបប្រភេទ</h2>
              <p className="text-gray-500 mb-6">
                តើអ្នកច្បាស់ជាចង់លុបប្រភេទ <span className="font-semibold text-gray-800">{selectedCategory.name}</span> មែនទេ?<br />
                ប្រភេទរងទាំងអស់ក្នុងប្រភេទនេះក៏នឹងត្រូវលុបដែរ។
              </p>
              <div className="flex gap-3">
                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  បោះបង់
                </button>
                <button onClick={handleDeleteCategory} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
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

export default AddType;