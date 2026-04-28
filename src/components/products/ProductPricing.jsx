import React from "react";
import { FaBoxes } from "react-icons/fa";

const ProductPricing = ({
  formData,
  handleChange,
  fetchSubCategories,
  units = [],
}) => {
  // FIND SELECTED UNIT
  const selectedUnit = units.find(
    (item) => item.id == formData.unit_id
  );

  const unitName =
    selectedUnit?.name?.toLowerCase() || "";

  // CHECK UNIT TYPE
  const isTablet =
    unitName.includes("tablets") ||
    unitName.includes("pill") ||
    unitName.includes("capsule") ||
    unitName.includes("tab") ||
    unitName.includes("គ្រាប់");

  const isBox =
    unitName.includes("box") ||
    unitName.includes("ប្រអប់");

  return (
    <div className="pt-4 border-t border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <FaBoxes className="text-teal-600" />
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
              onChange={(e) =>
                handleChange(e, fetchSubCategories)
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="0.00"
            />
          </div>

          {/* Tablets Per Box */}
          <div className="bg-blue-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ចំនួនគ្រាប់ក្នុងប្រអប់
            </label>

            <input
              type="number"
              name="packSize"
              value={formData.packSize}
              onChange={(e) =>
                handleChange(e, fetchSubCategories)
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="ឧ. 100"
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
              name="pricePerPack"
              value={formData.pricePerPack}
              onChange={(e) =>
                handleChange(e, fetchSubCategories)
              }
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
              onChange={(e) =>
                handleChange(e, fetchSubCategories)
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="0.00"
            />
          </div>
        </div>
      ) : (
        /* NORMAL UNIT */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Sell Price */}
          <div className="bg-teal-50 rounded-xl p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              តម្លៃលក់ ($)
            </label>

            <input
              type="number"
              step="0.01"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={(e) =>
                handleChange(e, fetchSubCategories)
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              placeholder="0.00"
            />
          </div>

          {/* Price Per Box if box */}
          {isBox && (
            <div className="bg-green-50 rounded-xl p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                តម្លៃក្នុងមួយប្រអប់ ($)
              </label>

              <input
                type="number"
                step="0.01"
                name="pricePerPack"
                value={formData.pricePerPack}
                onChange={(e) =>
                  handleChange(e, fetchSubCategories)
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                placeholder="0.00"
              />
            </div>
          )}

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
              onChange={(e) =>
                handleChange(e, fetchSubCategories)
              }
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