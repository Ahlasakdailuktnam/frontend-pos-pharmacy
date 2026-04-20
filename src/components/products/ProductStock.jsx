import React from "react";
import { FaBoxes } from "react-icons/fa";

const ProductStock = ({
  formData,
  handleChange,
  fetchSubCategories,
  isTablet,
}) => {
  return (
    <div className="pt-4 border-t border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <FaBoxes className="text-teal-600" />
        ព័ត៌មានស្តុក
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Stock Unit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            បរិមាណស្តុក ({formData.unit}){" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            name="stockUnit"
            value={formData.stockUnit}
            onChange={(e) => handleChange(e, fetchSubCategories)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            placeholder="0"
            required
          />
        </div>

        {/* Stock Box */}
        {isTablet && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ចំនួនប្រអប់ស្តុក
            </label>

            <input
              type="number"
              name="stockBox"
              value={formData.stockBox}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="0"
            />
          </div>
        )}

        {/* Min Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ស្តុកតិចតួចបំផុត (Alert)
          </label>

          <input
            type="number"
            name="minStock"
            value={formData.minStock}
            onChange={(e) => handleChange(e, fetchSubCategories)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            placeholder="50"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductStock;