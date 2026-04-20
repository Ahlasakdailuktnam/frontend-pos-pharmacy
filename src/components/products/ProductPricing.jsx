import React from "react";
import { productUnits } from "../../constants/productUnits";

const ProductPricing = ({
  formData,
  handleChange,
  fetchSubCategories,
  isTablet,
}) => {
  const currentUnit =
    productUnits.find((item) => item.value === formData.unit) ||
    productUnits[0];

  const UnitIcon = currentUnit.icon;

  return (
    <div className="pt-4 border-t border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <UnitIcon className="text-teal-600" />
        តម្លៃ និងស្តុក
      </h2>

      {isTablet ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Price Per Unit */}
          <div className="bg-teal-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              តម្លៃក្នុងមួយគ្រាប់ ($)
            </label>

            <input
              type="number"
              step="0.01"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="0.00"
            />
          </div>

          {/* Box Size */}
          <div className="bg-blue-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ចំនួនគ្រាប់ក្នុងប្រអប់
            </label>

            <input
              type="number"
              name="boxSize"
              value={formData.boxSize}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="ឧ. 100 គ្រាប់"
            />
          </div>

          {/* Price Per Box */}
          <div className="bg-green-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              តម្លៃក្នុងមួយប្រអប់ ($)
            </label>

            <input
              type="number"
              step="0.01"
              name="pricePerBox"
              value={formData.pricePerBox}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="0.00"
            />
          </div>

          {/* Cost */}
          <div className="bg-purple-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              តម្លៃទិញ ($)
            </label>

            <input
              type="number"
              step="0.01"
              name="cost"
              value={formData.cost}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="0.00"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Sell Price */}
          <div className="bg-teal-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              តម្លៃលក់ ($) <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              step="0.01"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="0.00"
              required
            />
          </div>

          {/* Wholesale */}
          <div className="bg-green-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              តម្លៃលក់ដុំ ($)
            </label>

            <input
              type="number"
              step="0.01"
              name="wholesalePrice"
              value={formData.wholesalePrice}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="0.00"
            />
          </div>

          {/* Cost */}
          <div className="bg-purple-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              តម្លៃទិញ ($)
            </label>

            <input
              type="number"
              step="0.01"
              name="cost"
              value={formData.cost}
              onChange={(e) => handleChange(e, fetchSubCategories)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="0.00"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPricing;
