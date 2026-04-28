import React, { useState } from "react";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCalendarToday,
  MdWork,
  MdSchool,
  MdAttachMoney,
  MdDescription,
  MdCloudUpload,
  MdDelete,
  MdSave,
  MdCancel,
  MdCheckCircle,
  MdArrowBack,
  MdInfo,
  MdBadge,
  MdTransgender,
  MdBloodtype,
  MdFamilyRestroom,
  MdEmergency,
} from "react-icons/md";
import {
  FaUserMd,
  FaUserTie,
  FaUserGraduate,
  FaUserClock,
  FaMoneyBillWave,
} from "react-icons/fa";

const Addstaff = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(null);

  // Form Data
  const [formData, setFormData] = useState({
    // Personal Information (Step 1)
    firstName: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    idCard: "",
    
    // These fields are for Step 2 and beyond
    lastName: "",
    gender: "",
    bloodType: "",
    nationality: "កម្ពុជា",
    maritalStatus: "",
    emergencyPhone: "",
    address: "",
    city: "ភ្នំពេញ",
    position: "",
    department: "",
    employeeId: "",
    joinDate: new Date().toISOString().split("T")[0],
    shift: "ព្រឹក",
    contractType: "ពេញម៉ោង",
    baseSalary: "",
    allowance: "",
    bonus: "",
    bankAccount: "",
    bankName: "ABA Bank",
    education: "",
    experience: "",
    skills: "",
    certificates: "",
    profileImage: null,
    cv: null,
    certificateFiles: [],
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone2: "",
    notes: "",
    status: "active",
  });

  const [errors, setErrors] = useState({});

  // Department options
  const departments = [
    "ឱសថ",
    "សេវាកម្មអតិថិជន",
    "រដ្ឋបាល",
    "ហិរញ្ញវត្ថុ",
    "ទីផ្សារ",
  ];
  const typework = [
    "បុគ្គលិកពេញម៉ោង",
    "និស្សិតហាត់ការងារ",
    "បុគ្គលិកកិច្ចសន្យា",
    "បុគ្គលិកក្រៅម៉ោង",
  ];

  // Position options by department
  const positions = {
    ឱសថ: ["ឱសថការី", "ឱសថការីរង", "ជំនួយការឱសថការី"],
    សេវាកម្មអតិថិជន: ["អ្នកលក់", "អ្នកទទួលភ្ញៀវ", "អ្នកផ្តល់ប្រឹក្សា"],
    រដ្ឋបាល: ["អ្នកគ្រប់គ្រង", "បុគ្គលិករដ្ឋបាល", "ជំនួយការរដ្ឋបាល"],
    ហិរញ្ញវត្ថុ: ["គណនេយ្យករ", "អ្នកគិតលុយ", "ហិរញ្ញវត្ថុ"],
    ទីផ្សារ: ["អ្នកទីផ្សារ", "អ្នករចនា", "អ្នកថតរូប"],
  };

  // Shift options
  const shifts = [
    "ព្រឹក (7:00 - 12:00)",
    "រសៀល (13:00 - 17:00)",
    "យប់ (18:00 - 21:00)",
    "បង្វិល",
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (files && files[0]) {
        if (name === "profileImage") {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewAvatar(reader.result);
          };
          reader.readAsDataURL(files[0]);
        }
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate form
  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName) newErrors.firstName = "សូមបញ្ចូលឈ្មោះ";
      if (!formData.email) newErrors.email = "សូមបញ្ចូលអ៊ីមែល";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើត";
      if (!formData.phone) newErrors.phone = "សូមបញ្ចូលលេខទូរស័ព្ទ";
      if (!formData.idCard) newErrors.idCard = "សូមបញ្ចូលលេខអត្តសញ្ញាណប័ណ្ណ";
    }

    if (currentStep === 2) {
      if (!formData.lastName) newErrors.lastName = "សូមបញ្ចូលនាមត្រកូល";
      if (!formData.gender) newErrors.gender = "សូមជ្រើសរើសភេទ";
      if (!formData.address) newErrors.address = "សូមបញ្ចូលអាសយដ្ឋាន";
    }

    if (currentStep === 3) {
      if (!formData.position) newErrors.position = "សូមជ្រើសរើសមុខតំណែង";
      if (!formData.department) newErrors.department = "សូមជ្រើសរើសនាយកដ្ឋាន";
      if (!formData.employeeId) newErrors.employeeId = "សូមបញ្ចូលលេខបុគ្គលិក";
    }

    if (currentStep === 4) {
      if (!formData.baseSalary) newErrors.baseSalary = "សូមបញ្ចូលប្រាក់ខែគោល";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const steps = [
    { number: 1, title: "ព័ត៌មានផ្ទាល់ខ្លួន", icon: MdPerson },
    { number: 2, title: "ទំនាក់ទំនង", icon: MdPhone },
    { number: 3, title: "ព័ត៌មានការងារ", icon: MdWork },
    { number: 4, title: "ប្រាក់ខែ", icon: MdAttachMoney },
    { number: 5, title: "ឯកសារ", icon: MdCloudUpload },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <MdArrowBack size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                បន្ថែមបុគ្គលិកថ្មី
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                បញ្ចូលព័ត៌មានបុគ្គលិកថ្មីក្នុងប្រព័ន្ធ
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              return (
                <div key={step.number} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-teal-600 text-white ring-4 ring-teal-100"
                          : isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <MdCheckCircle size={24} />
                      ) : (
                        <Icon size={22} />
                      )}
                    </div>
                    <p
                      className={`text-xs mt-2 text-center font-medium ${isActive ? "text-teal-600" : "text-gray-500"}`}
                    >
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 ${
                        currentStep > step.number
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-24 right-6 z-50 animate-slide-in">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 shadow-lg">
              <MdCheckCircle className="text-green-600 text-2xl" />
              <div>
                <p className="font-semibold text-green-800">
                  បញ្ចូលទិន្នន័យជោគជ័យ!
                </p>
                <p className="text-sm text-green-600">
                  បុគ្គលិកត្រូវបានបន្ថែមក្នុងប្រព័ន្ធ
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Profile Image Section */}
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {previewAvatar ? (
                    <img
                      src={previewAvatar}
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center border-4 border-white shadow-md">
                      <MdPerson className="text-teal-600 text-4xl" />
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-teal-700 transition-colors shadow-md">
                    <MdCloudUpload size={14} className="text-white" />
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">រូបថតបុគ្គលិក</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    ទ្រង់ទ្រាយ JPG, PNG ទំហំមិនលើស 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Step 1: Personal Information - ONLY the fields you want */}
            {currentStep === 1 && (
              <div className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MdPerson className="text-teal-600" />
                  ព័ត៌មានផ្ទាល់ខ្លួនសម្រាប់បង្កើតអាខោន
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ឈ្មោះ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border ${errors.firstName ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all`}
                      placeholder="បញ្ចូលឈ្មោះ"
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      អ៊ីមែល <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border ${errors.email ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500`}
                      placeholder="example@email.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ថ្ងៃខែឆ្នាំកំណើត <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border ${errors.dateOfBirth ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500`}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-xs text-red-500 mt-1">{errors.dateOfBirth}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      លេខទូរស័ព្ទ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border ${errors.phone ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500`}
                      placeholder="012 345 678"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      លេខអត្តសញ្ញាណប័ណ្ណសម្រាប់បង្កើតអាខោន <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="idCard"
                      value={formData.idCard}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border ${errors.idCard ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500`}
                      placeholder="បញ្ចូលលេខអត្តសញ្ញាណប័ណ្ណ"
                    />
                    {errors.idCard && (
                      <p className="text-xs text-red-500 mt-1">{errors.idCard}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information (includes lastName, gender, address, etc.) */}
            {currentStep === 2 && (
              <div className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MdPhone className="text-teal-600" />
                  ព័ត៌មានទំនាក់ទំនង
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      នាមត្រកូល <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border ${errors.lastName ? "border-red-500" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20`}
                      placeholder="បញ្ចូលនាមត្រកូល"
                    />
                    {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ភេទ <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="gender" value="ប្រុស" checked={formData.gender === "ប្រុស"} onChange={handleChange} className="w-4 h-4 text-teal-600" />
                        <span className="text-gray-700">ប្រុស</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="gender" value="ស្រី" checked={formData.gender === "ស្រី"} onChange={handleChange} className="w-4 h-4 text-teal-600" />
                        <span className="text-gray-700">ស្រី</span>
                      </label>
                    </div>
                    {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ទូរស័ព្ទបន្ទាន់
                    </label>
                    <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" placeholder="098 765 432" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ទីក្រុង/ខេត្ត
                    </label>
                    <select name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl">
                      <option value="ភ្នំពេញ">ភ្នំពេញ</option>
                      <option value="សៀមរាប">សៀមរាប</option>
                      <option value="បាត់ដំបង">បាត់ដំបង</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      អាសយដ្ឋាន <span className="text-red-500">*</span>
                    </label>
                    <textarea name="address" value={formData.address} onChange={handleChange} rows="3" className={`w-full px-4 py-2.5 border ${errors.address ? "border-red-500" : "border-gray-200"} rounded-xl`} placeholder="បញ្ចូលអាសយដ្ឋានលម្អិត" />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <MdEmergency className="text-teal-600" />
                    អ្នកទំនាក់ទំនងបន្ទាន់
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះ</label>
                      <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" placeholder="ឈ្មោះអ្នកទំនាក់ទំនង" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ទំនាក់ទំនង</label>
                      <input type="text" name="emergencyRelation" value={formData.emergencyRelation} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" placeholder="ឧ. ឪពុក, ម្តាយ" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">លេខទូរស័ព្ទ</label>
                      <input type="tel" name="emergencyPhone2" value={formData.emergencyPhone2} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" placeholder="លេខទូរស័ព្ទ" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Professional Information */}
            {currentStep === 3 && (
              <div className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MdWork className="text-teal-600" />
                  ព័ត៌មានការងារ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">លេខបុគ្គលិក <span className="text-red-500">*</span></label>
                    <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" placeholder="EMP-001" />
                    {errors.employeeId && <p className="text-xs text-red-500 mt-1">{errors.employeeId}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">កុងត្រារយ:ពេល <span className="text-red-500">*</span></label>
                    <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" placeholder="ឧទាហរណ៍​:1ឆ្នាំ" />
                    {errors.employeeId && <p className="text-xs text-red-500 mt-1">{errors.employeeId}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">នាយកដ្ឋាន <span className="text-red-500">*</span></label>
                    <select name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl">
                      <option value="">ជ្រើសរើសនាយកដ្ឋាន</option>
                      {departments.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                    {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">មុខតំណែង <span className="text-red-500">*</span></label>
                    <select name="position" value={formData.position} onChange={handleChange} disabled={!formData.department} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl">
                      <option value="">ជ្រើសរើសមុខតំណែង</option>
                      {formData.department && positions[formData.department]?.map((pos) => <option key={pos} value={pos}>{pos}</option>)}
                    </select>
                    {errors.position && <p className="text-xs text-red-500 mt-1">{errors.position}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ប្រភេទការងារ <span className="text-red-500">*</span></label>
                    <select name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl">
                      <option value="">ជ្រើសរើសប្រភេទការងារ</option>
                      {typework.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
                    </select>
                    {errors.department && <p className="text-xs text-red-500 mt-1">{errors.department}</p>}
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">កាលបរិច្ឆេទចូលធ្វើការ</label>
                    <input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Salary Information */}
            {currentStep === 4 && (
              <div className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaMoneyBillWave className="text-teal-600" />
                  ព័ត៌មានប្រាក់បៀវត្ស
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ប្រាក់ខែគោល ($) <span className="text-red-500">*</span></label>
                    <input type="number" name="baseSalary" value={formData.baseSalary} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" placeholder="0.00" />
                    {errors.baseSalary && <p className="text-xs text-red-500 mt-1">{errors.baseSalary}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ប្រាក់ឧបត្ថម្ភ ($)</label>
                    <input type="number" name="allowance" value={formData.allowance} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" placeholder="0.00" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Documents */}
            {currentStep === 5 && (
              <div className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <MdCloudUpload className="text-teal-600" />
                  ឯកសារភ្ជាប់
                </h2>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                  <MdCloudUpload className="text-4xl text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">បង្ហោះឯកសារ CV</p>
                  <input type="file" name="cv" accept=".pdf,.docx" onChange={handleChange} className="hidden" id="cv-upload" />
                  <label htmlFor="cv-upload" className="inline-block mt-3 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg text-sm cursor-pointer">ជ្រើសរើសឯកសារ</label>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between">
              <button type="button" onClick={prevStep} className={`px-6 py-2.5 rounded-xl flex items-center gap-2 ${currentStep === 1 ? "invisible" : "border border-gray-300 text-gray-700 hover:bg-gray-100"}`}>
                <MdCancel size={18} /> ត្រឡប់ក្រោយ
              </button>

              {currentStep < 5 ? (
                <button type="button" onClick={nextStep} className="px-6 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 flex items-center gap-2">
                  បន្ទាប់ <MdArrowBack className="rotate-180" size={18} />
                </button>
              ) : (
                <button type="submit" className="px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center gap-2">
                  <MdSave size={18} /> រក្សាទុកបុគ្គលិក
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Addstaff;