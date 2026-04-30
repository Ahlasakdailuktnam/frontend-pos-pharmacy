import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdSave,
  MdWarehouse,
  MdClose,
} from "react-icons/md";
import useWarehouses from "../../../hook/useWareHouse";

const AddWarehouse = () => {
  const navigate = useNavigate();
  const { addWarehouse, savingWarehouse } = useWarehouses();
  
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    note: "",
    status: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.location) {
      alert("សូមបំពេញឈ្មោះឃ្លាំង និងទីតាំង");
      return;
    }

    // Prepare data for backend
    const submitData = {
      name: formData.name,
      location: formData.location,
      note: formData.note || "",
      status: formData.status,
    };

    const result = await addWarehouse(submitData);
    
    if (result.success) {
      navigate("/admin/warehouse");
    } else {
      alert("មានបញ្ហាក្នុងការបន្ថែមឃ្លាំង។ សូមព្យាយាមម្តងទៀត");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/warehouse")}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <MdArrowBack size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                បន្ថែមឃ្លាំងថ្មី
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                បំពេញព័ត៌មានឃ្លាំងថ្មី
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 space-y-6">
                {/* Warehouse Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ឈ្មោះឃ្លាំង <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    placeholder="បញ្ចូលឈ្មោះឃ្លាំង"
                    disabled={savingWarehouse}
                    autoFocus
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ទីតាំង <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    placeholder="បញ្ចូលទីតាំង"
                    disabled={savingWarehouse}
                  />
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    កំណត់ចំណាំ
                  </label>
                  <textarea
                    name="note"
                    rows="4"
                    value={formData.note}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    placeholder="កំណត់ចំណាំបន្ថែម..."
                    disabled={savingWarehouse}
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                      disabled={savingWarehouse}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      កំពុងដំណើរការ
                    </span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1 ml-6">
                    ប្រសិនបើមិនបានធីក ឃ្លាំងនឹងស្ថិតក្នុងស្ថានភាពបិទដំណើរការ
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/warehouse")}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    disabled={savingWarehouse}
                  >
                    បោះបង់
                  </button>
                  <button
                    type="submit"
                    disabled={savingWarehouse}
                    className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {savingWarehouse ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        កំពុងរក្សាទុក...
                      </>
                    ) : (
                      <>
                        <MdSave size={18} />
                        រក្សាទុក
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWarehouse;