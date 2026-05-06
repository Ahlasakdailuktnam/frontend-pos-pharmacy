// src/pages/Admins/staff/EditStaff.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdSave,
  MdCancel,
  MdPerson,
  MdEmail,
  MdPhone,
  MdWork,
  MdAttachMoney,
} from "react-icons/md";
import useStaffDetail from "../../../hook/staff/userStaffDetail";
import usePositions from "../../../hook/position/usePositon";

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { staff, loading, fetchStaff, updateStaffInfo } = useStaffDetail();
  const { positions } = usePositions();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position_id: "",
    base_salary: "",
    allowance: "",
    status: "active",
    work_type: "",
    join_date: "",
    contract_duration: "",
    address: "",
    emergency_name: "",
    emergency_phone: "",
  });
  
  const [message, setMessage] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchStaff(id);
    }
  }, [id]);

  useEffect(() => {
    if (staff) {
      const staffDetail = staff.staff_detail || {};
      setFormData({
        firstName: staffDetail.first_name || "",
        lastName: staffDetail.last_name || "",
        email: staff.email || "",
        phone: staff.phone || staffDetail.phone || "",
        position_id: staff.position_id || staffDetail.position_id || "",
        base_salary: staffDetail.base_salary || "",
        allowance: staffDetail.allowance || "",
        status: staffDetail.status || "active",
        work_type: staffDetail.work_type || "",
        join_date: staffDetail.join_date || "",
        contract_duration: staffDetail.contract_duration || "",
        address: staffDetail.address || "",
        emergency_name: staffDetail.emergency_name || "",
        emergency_phone: staffDetail.emergency_phone || "",
      });
    }
  }, [staff]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      position_id: parseInt(formData.position_id),
      base_salary: parseFloat(formData.base_salary),
      allowance: parseFloat(formData.allowance || 0),
      status: formData.status,
      work_type: formData.work_type,
      join_date: formData.join_date,
      contract_duration: formData.contract_duration,
      address: formData.address,
      emergency_name: formData.emergency_name,
      emergency_phone: formData.emergency_phone,
    };

    const result = await updateStaffInfo(id, updateData);
    
    if (result.success) {
      showMessage("success", "កែប្រែព័ត៌មានបុគ្គលិកដោយជោគជ័យ");
      setTimeout(() => {
        navigate("/admin/staff");
      }, 1500);
    } else {
      showMessage("error", result.message);
    }
    setSaving(false);
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
      {/* Message Toast */}
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
            <button onClick={() => navigate("/admin/staff")} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <MdArrowBack size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">កែប្រែព័ត៌មានបុគ្គលិក</h1>
              <p className="text-gray-500 text-sm mt-0.5">កែប្រែព័ត៌មានបុគ្គលិក {staff?.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Personal Information */}
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <MdPerson className="text-teal-600" />
                ព័ត៌មានផ្ទាល់ខ្លួន
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">នាមត្រកូល</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះ</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">អ៊ីមែល</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ទូរស័ព្ទ</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">អាសយដ្ឋាន</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <MdWork className="text-teal-600" />
                ព័ត៌មានការងារ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">តំណែង</label>
                  <select
                    name="position_id"
                    value={formData.position_id}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">ជ្រើសរើសតំណែង</option>
                    {positions.map((pos) => (
                      <option key={pos.id} value={pos.id}>{pos.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ប្រភេទការងារ</label>
                  <select
                    name="work_type"
                    value={formData.work_type}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  >
                    <option value="ពេញម៉ោង">ពេញម៉ោង (Full-time)</option>
                    <option value="ក្រៅម៉ោង">ក្រៅម៉ោង (Part-time)</option>
                    <option value="កិច្ចសន្យា">កិច្ចសន្យា (Contract)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ថ្ងៃចូលធ្វើការ</label>
                  <input
                    type="date"
                    name="join_date"
                    value={formData.join_date}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">រយៈពេលកុងត្រា</label>
                  <input
                    type="text"
                    name="contract_duration"
                    value={formData.contract_duration}
                    onChange={handleChange}
                    placeholder="ឧទាហរណ៍: 1ឆ្នាំ, 6ខែ"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ស្ថានភាព</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="active">កំពុងបំពេញការងារ (Active)</option>
                    <option value="on_leave">ឈប់សម្រាក (On Leave)</option>
                    <option value="inactive">ឈប់ធ្វើការ (Inactive)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Salary Information */}
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <MdAttachMoney className="text-teal-600" />
                ព័ត៌មានប្រាក់បៀវត្ស
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ប្រាក់ខែគោល ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="base_salary"
                    value={formData.base_salary}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ប្រាក់ឧបត្ថម្ភ ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="allowance"
                    value={formData.allowance}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <MdPhone className="text-teal-600" />
                អ្នកទំនាក់ទំនងបន្ទាន់
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ឈ្មោះអ្នកទំនាក់ទំនង</label>
                  <input
                    type="text"
                    name="emergency_name"
                    value={formData.emergency_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">លេខទូរស័ព្ទបន្ទាន់</label>
                  <input
                    type="tel"
                    name="emergency_phone"
                    value={formData.emergency_phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/staff")}
                className="px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-100 transition flex items-center gap-2"
              >
                <MdCancel size={18} />
                បោះបង់
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition flex items-center gap-2 disabled:opacity-50"
              >
                <MdSave size={18} />
                {saving ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStaff;