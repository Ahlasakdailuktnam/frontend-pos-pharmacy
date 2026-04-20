import React from "react";

const ProductExtraInfo = ({
  formData,
  handleChange,
  fetchSubCategories,
}) => {
  return (
    <>
      {/* Expiry / Manufacturer / Prescription / Location */}
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

          {/* Manufacturer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ក្រុមហ៊ុនផលិត
            </label>

            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="ឈ្មោះក្រុមហ៊ុន"
            />
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