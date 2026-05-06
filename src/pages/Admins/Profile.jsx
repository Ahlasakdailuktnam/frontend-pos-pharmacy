// src/pages/Profile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdCalendarToday,
  MdLock,
  MdSave,
  MdCancel,
  MdCheckCircle,
  MdCloudUpload,
  MdArrowBack,
} from "react-icons/md";
import useProfile from "../../hook/useProfile";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const { user, loading, editProfile, changePassword, changeAvatar } = useProfile();
  
  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Profile form
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    date_of_birth: "",
  });

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  React.useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        date_of_birth: user.date_of_birth?.split("T")[0] || "",
      });
    }
  }, [user]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      const result = await changeAvatar(file);
      if (result.success) {
        showMessage("success", "បានផ្លាស់ប្តូររូបភាពដោយជោគជ័យ");
      } else {
        showMessage("error", result.message);
        setAvatarPreview(null);
      }
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await editProfile(profileForm);
    if (result.success) {
      showMessage("success", "បានកែប្រែព័ត៌មានដោយជោគជ័យ");
    } else {
      showMessage("error", result.message);
    }
    setIsSubmitting(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
      showMessage("error", "ពាក្យសម្ងាត់ថ្មីមិនត្រូវគ្នា");
      return;
    }
    
    if (passwordForm.new_password.length < 6) {
      showMessage("error", "ពាក្យសម្ងាត់ថ្មីត្រូវមានយ៉ាងតិច 6 តួអក្សរ");
      return;
    }
    
    setIsSubmitting(true);
    
    const result = await changePassword({
      current_password: passwordForm.current_password,
      new_password: passwordForm.new_password,
      new_password_confirmation: passwordForm.new_password_confirmation,
    });
    
    if (result.success) {
      showMessage("success", result.message);
      setPasswordForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } else {
      showMessage("error", result.message);
    }
    setIsSubmitting(false);
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
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
          message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          {message.text}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <MdArrowBack size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ប្រវត្តិរូបរបស់ខ្ញុំ</h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {authUser?.is_admin === 1 ? "Administrator" : "បុគ្គលិក"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Avatar Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={avatarPreview || (user?.avatar ? `http://localhost:8000/storage/avatars/${user.avatar}` : `https://ui-avatars.com/api/?name=${user?.name?.charAt(0) || 'U'}&background=0D9488&color=fff&size=80`)}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-teal-100"
                />
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-teal-700 transition shadow-md">
                  <MdCloudUpload size={14} className="text-white" />
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-gray-500">{user?.email}</p>
                <p className="text-xs text-teal-600 mt-1">
                  {authUser?.is_admin === 1 ? "អ្នកគ្រប់គ្រងប្រព័ន្ធ" : "បុគ្គលិក"}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                activeTab === "profile"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <MdPerson className="inline mr-2" size={18} />
              ព័ត៌មានផ្ទាល់ខ្លួន
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                activeTab === "password"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <MdLock className="inline mr-2" size={18} />
              ផ្លាស់ប្តូរពាក្យសម្ងាត់
            </button>
          </div>

          {/* Profile Form */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <form onSubmit={handleUpdateProfile} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ឈ្មោះពេញ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      អ៊ីមែល <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      លេខទូរស័ព្ទ
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ថ្ងៃខែឆ្នាំកំណើត
                    </label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={profileForm.date_of_birth}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    <MdSave size={18} />
                    {isSubmitting ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Password Form */}
          {activeTab === "password" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <form onSubmit={handleUpdatePassword} className="p-6 space-y-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ពាក្យសម្ងាត់បច្ចុប្បន្ន <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="current_password"
                      value={passwordForm.current_password}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ពាក្យសម្ងាត់ថ្មី <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="new_password"
                      value={passwordForm.new_password}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">យ៉ាងតិច 6 តួអក្សរ</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      បញ្ជាក់ពាក្យសម្ងាត់ថ្មី <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="new_password_confirmation"
                      value={passwordForm.new_password_confirmation}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    <MdLock size={18} />
                    {isSubmitting ? "កំពុងផ្លាស់ប្តូរ..." : "ផ្លាស់ប្តូរពាក្យសម្ងាត់"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Info Note */}
          <div className="mt-6 bg-teal-50 rounded-xl p-4 border border-teal-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MdCheckCircle className="text-teal-600" size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-teal-800">ចំណាំ</p>
                <p className="text-xs text-teal-600 mt-0.5">
                  អ្នកអាចកែប្រែព័ត៌មានផ្ទាល់ខ្លួន និងផ្លាស់ប្តូរពាក្យសម្ងាត់បានតែម្តងក្នុងមួយពេល។
                  ពាក្យសម្ងាត់ថ្មីត្រូវតែមានយ៉ាងតិច 6 តួអក្សរ។
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;