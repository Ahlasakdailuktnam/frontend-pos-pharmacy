import React from "react";
import { MdCloudUpload } from "react-icons/md";
import { FaPills } from "react-icons/fa";

const ProductImageUpload = ({
  previewImage,
  handleChange,
  fetchSubCategories,
}) => {
  return (
    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-white">
      <div className="flex items-center gap-6">
        {/* Preview */}
        <div className="relative">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="w-24 h-24 rounded-xl object-cover border-2 border-teal-200"
            />
          ) : (
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
              <FaPills className="text-teal-600 text-3xl" />
            </div>
          )}

          {/* Upload Button */}
          <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-teal-700 transition-colors shadow-md">
            <MdCloudUpload size={14} className="text-white" />

            <input
              type="file"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleChange(e, fetchSubCategories)}
            />
          </label>
        </div>

        {/* Text */}
        <div>
          <h3 className="font-semibold text-gray-800">រូបភាពផលិតផល</h3>

          <p className="text-sm text-gray-500 mt-1">
            ទ្រង់ទ្រាយ JPG, PNG ទំហំមិនលើស 2MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductImageUpload;