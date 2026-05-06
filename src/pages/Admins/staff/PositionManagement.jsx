// src/pages/Admins/PositionManagement.jsx
import React, { useState } from "react";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdClose,
  MdWork,
  MdRefresh,
  MdSearch,
} from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import usePositions from "../../../hook/position/usePositon";

const PositionManagement = () => {
  const { positions, loading, addPosition, editPosition, removePosition, fetchPositions } = usePositions();
  
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [positionName, setPositionName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleAdd = () => {
    setModalMode("add");
    setSelectedPosition(null);
    setPositionName("");
    setShowModal(true);
  };

  const handleEdit = (position) => {
    setModalMode("edit");
    setSelectedPosition(position);
    setPositionName(position.name);
    setShowModal(true);
  };

  const handleDelete = async (position) => {
    if (window.confirm("តើអ្នកចង់លុបតំណែង \"" + position.name + "\" មែនទេ?")) {
      const result = await removePosition(position.id);
      if (result.success) {
        showMessage("success", "លុបតំណែងដោយជោគជ័យ");
      } else {
        showMessage("error", result.message);
      }
    }
  };

  const handleSubmit = async () => {
    if (!positionName.trim()) {
      showMessage("error", "សូមបញ្ចូលឈ្មោះតំណែង");
      return;
    }

    let result;
    if (modalMode === "add") {
      result = await addPosition(positionName.trim());
      if (result.success) {
        showMessage("success", "បន្ថែមតំណែងដោយជោគជ័យ");
        setShowModal(false);
      } else {
        showMessage("error", result.message);
      }
    } else {
      result = await editPosition(selectedPosition.id, positionName.trim());
      if (result.success) {
        showMessage("success", "កែប្រែតំណែងដោយជោគជ័យ");
        setShowModal(false);
      } else {
        showMessage("error", result.message);
      }
    }
  };

  const filteredPositions = positions.filter(function(position) {
    return position.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  });

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
        <div className={"fixed top-20 right-4 z-50 px-4 py-3 rounded-lg shadow-lg " + (message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white")}>
          {message.text}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-5">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">គ្រប់គ្រងតំណែងការងារ</h1>
              <p className="text-gray-500 text-sm mt-0.5">
                បន្ថែម, កែប្រែ, ឬលុបតំណែងការងាររបស់បុគ្គលិក
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchPositions}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition"
              >
                <MdRefresh size={18} />
                <span>ធ្វើឲ្យថ្មី</span>
              </button>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition shadow-sm"
              >
                <MdAdd size={18} />
                <span>បន្ថែមតំណែងថ្មី</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="ស្វែងរកតំណែងការងារ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <FaBriefcase className="text-teal-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">ចំនួនតំណែងសរុប</p>
                <p className="text-2xl font-bold text-gray-800">{positions.length}</p>
              </div>
            </div>
            {searchTerm && (
              <div className="text-right">
                <p className="text-xs text-gray-400">លទ្ធផលស្វែងរក</p>
                <p className="text-lg font-semibold text-teal-600">{filteredPositions.length}</p>
              </div>
            )}
          </div>
        </div>

        {/* Positions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr className="text-left text-sm font-semibold text-gray-600">
                  <th className="px-6 py-4 w-16">លេខរៀង</th>
                  <th className="px-6 py-4">ឈ្មោះតំណែង</th>
                  <th className="px-6 py-4">កាលបរិច្ឆេទបង្កើត</th>
                  <th className="px-6 py-4 w-32 text-center">សកម្មភាព</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPositions.length > 0 ? (
                  filteredPositions.map(function(position, index) {
                    return (
                      <tr key={position.id} className="hover:bg-gray-50 transition group">
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{index + 1}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                              <MdWork className="text-teal-600 text-sm" />
                            </div>
                            <span className="font-medium text-gray-800">{position.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(position.created_at).toLocaleDateString("en-CA")}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(position)}
                              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                              title="កែប្រែ"
                            >
                              <MdEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(position)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                              title="លុប"
                            >
                              <MdDelete size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                      <MdWork className="text-5xl mx-auto mb-3 text-gray-300" />
                      {searchTerm ? (
                        <div>
                          <p className="text-base font-medium">មិនមានលទ្ធផលស្វែងរក</p>
                          <p className="text-sm mt-1">សូមសាកល្បងពាក្យស្វែងរកផ្សេង</p>
                          <button
                            onClick={() => setSearchTerm("")}
                            className="mt-3 px-4 py-2 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition"
                          >
                            សម្អាតតម្រង
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p className="text-base font-medium">មិនទាន់មានតំណែងការងារ</p>
                          <p className="text-sm mt-1">សូមចុចប៊ូតុង "បន្ថែមតំណែងថ្មី" ដើម្បីចាប់ផ្តើម</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {filteredPositions.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {"បង្ហាញ " + filteredPositions.length + " ក្នុងចំណោម " + positions.length + " តំណែង"}
                </span>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-sm text-teal-600 hover:text-teal-700"
                  >
                    សម្អាតស្វែងរក
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h2 className="text-xl font-bold">
                {modalMode === "add" ? "បន្ថែមតំណែងថ្មី" : "កែប្រែតំណែង"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <MdClose size={24} />
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ឈ្មោះតំណែង <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={positionName}
                  onChange={(e) => setPositionName(e.target.value)}
                  placeholder="ឧទាហរណ៍: ឱសថការី, គិលានុបដ្ឋាយិកា, អ្នកគ្រប់គ្រង"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  autoFocus
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl font-medium transition"
                >
                  {modalMode === "add" ? "បន្ថែម" : "រក្សាទុក"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 py-2.5 rounded-xl hover:bg-gray-50 transition"
                >
                  បោះបង់
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PositionManagement;