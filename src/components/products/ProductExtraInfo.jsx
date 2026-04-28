import React from "react";
import { FaPills } from "react-icons/fa";

const ProductExtraInfo = ({
  formData,
  handleChange,
  fetchSubCategories,
  suppliers,
  loadingSuppliers,
}) => {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <FaPills className="text-teal-600" />
        ព័ត៌មានបន្ថែម
      </h2>
      {/* Extra Info */}
      <div className="pt-4 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Expiry */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ថ្ងៃផុតកំណត់
            </label>

            <input
              type="date"
              name="expiry"
              value={formData.expiry}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          {/* Supplier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              អ្នកផ្គត់ផ្គង់
            </label>

            <select
              name="supplier_id"
              value={formData.supplier_id}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            >
              <option value="">
                {loadingSuppliers ? "កំពុងទាញទិន្នន័យ..." : "ជ្រើសរើស Supplier"}
              </option>

              {suppliers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.company_name_kh ||
                    item.company_name_en ||
                    item.name ||
                    "No Name"}
                </option>
              ))}
            </select>
          </div>

          {/* Prescription */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="prescription"
              name="prescription"
              checked={formData.prescription}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
            />

            <label htmlFor="prescription" className="text-sm text-gray-700">
              ត្រូវការវេជ្ជបញ្ជាពីពេទ្យ
            </label>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ទីតាំងរក្សាទុក
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="ឧ. ធ្នើរ A1, ទូរទឹកកក"
            />
          </div>

          {/* Barcode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Barcode
            </label>

            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="ឧ. B0015843"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="pt-4 border-t border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ការពណ៌នា
        </label>

        <textarea
          rows="4"
          name="description"
          value={formData.description}
          onChange={(e) => handleChange(e, fetchSubCategories)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          placeholder="បញ្ចូលការពណ៌នាអំពីផលិតផល..."
        />
      </div>
    </>
  );
};

export default ProductExtraInfo;
