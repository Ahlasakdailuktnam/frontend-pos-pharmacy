import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const AddCategoryModal = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("medicine");

  if (!open) return null;

  const handleSubmit = () => {
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      type,
    });

    setName("");
    setType("medicine");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              បន្ថែមប្រភេទថ្មី
            </h2>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <MdClose size={24} />
            </button>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ឈ្មោះប្រភេទ
            </label>

            <input
              type="text"
              placeholder="ឧ. Skincare"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-xl"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ប្រភេទ
            </label>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-200 rounded-xl"
            >
              <option value="medicine">
                Medicine
              </option>
              <option value="cosmetic">
                Cosmetic
              </option>
              <option value="equipment">
                Equipment
              </option>
            </select>
          </div>

          {/* Footer */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-100 rounded-xl"
            >
              បោះបង់
            </button>

            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-xl"
            >
              បន្ថែម
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;