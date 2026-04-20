import React from "react";
import { MdAdd } from "react-icons/md";
import { FaPills } from "react-icons/fa";
import { productUnits } from "../../constants/productUnits";

const ProductBasicInfo = ({
  formData,
  handleChange,
  fetchSubCategories,

  categories,
  subCategories,
  loadingCategory,

}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <FaPills className="text-teal-600" />
        ព័ត៌មានមូលដ្ឋាន
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ឈ្មោះផលិតផល <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange(e, fetchSubCategories)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            placeholder="បញ្ចូលឈ្មោះផលិតផល"
            required
          />
        </div>

        {/* English Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ឈ្មោះជាអង់គ្លេស
          </label>

          <input
            type="text"
            name="nameEn"
            value={formData.nameEn}
            onChange={(e) => handleChange(e, fetchSubCategories)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            placeholder="English name"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ប្រភេទ <span className="text-red-500">*</span>
          </label>

          <div className="flex gap-2">
            <select
              name="category"
              value={formData.category}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              required
            >
              <option value="">
                {loadingCategory ? "កំពុងផ្ទុក..." : "ជ្រើសរើសប្រភេទ"}
              </option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="px-4 py-2.5 bg-teal-50 text-teal-600 rounded-xl hover:bg-teal-100 transition-colors"
            >
              <MdAdd size={20} />
            </button>
          </div>
        </div>

        {/* Sub Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ប្រភេទរង
          </label>

          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={(e) => handleChange(e, fetchSubCategories)}
            disabled={!formData.category}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 disabled:bg-gray-50"
          >
            <option value="">ជ្រើសរើសប្រភេទរង</option>

            {subCategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ឯកតា
          </label>

          <select
            name="unit"
            value={formData.unit}
            onChange={(e) => handleChange(e, fetchSubCategories)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          >
            {productUnits.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductBasicInfo;