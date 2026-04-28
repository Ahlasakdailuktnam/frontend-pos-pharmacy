import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { FaPills } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ProductBasicInfo = ({
  formData,
  handleChange,
  fetchSubCategories,
  addUnit,
  categories,
  subCategories,
  loadingCategory,
  units,
  loadingUnits,
  fetchUnits,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [unitData, setUnitData] = useState({
    name: "",
    symbol: "",
  });
  const [savingUnit, setSavingUnit] = useState(false);

  // =============================
  // ADD UNIT
  // =============================
  const handleAddUnit = async () => {
    try {
      setSavingUnit(true);
      await addUnit(unitData);
      await fetchUnits();
      setUnitData({
        name: "",
        symbol: "",
      });
      setOpenModal(false);
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      setSavingUnit(false);
    }
  };
  const selectedCategory = categories.find(
  (item) => item.id == formData.category
);

const categoryType = selectedCategory?.type || "";

const isMedicine = categoryType === "medicine";
const isSkincare = categoryType === "cosmetic";
const isEquipment = categoryType === "equipment";
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
        {/* Unit - Only Medicine */}
        {isMedicine && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ឯកតា
            </label>

            <div className="flex gap-2">
              <select
                name="unit_id"
                value={formData.unit_id}
                onChange={(e) => handleChange(e, fetchSubCategories)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                <option value="">
                  {loadingUnits ? "Loading..." : "ជ្រើសរើសឯកតា"}
                </option>

                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="px-4 bg-teal-700 text-white rounded-xl"
              >
                <MdAdd size={22} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =============================
          MODAL ADD UNIT
      ============================== */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold">បន្ថែមឯកតាថ្មី</h3>
              <button
                onClick={() => setOpenModal(false)}
                className="hover:bg-gray-100 rounded-full p-1 transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ឈ្មោះ
              </label>
              <input
                type="text"
                value={unitData.name}
                onChange={(e) =>
                  setUnitData({
                    ...unitData,
                    name: e.target.value,
                  })
                }
                className="w-full border border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                placeholder="ឧ. ដប, ប្រអប់, គ្រាប់"
              />
            </div>

            {/* Symbol */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                សញ្ញា (Symbol)
              </label>
              <input
                type="text"
                value={unitData.symbol}
                onChange={(e) =>
                  setUnitData({
                    ...unitData,
                    symbol: e.target.value,
                  })
                }
                className="w-full border border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                placeholder="ឧ. bot, box, tab"
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                បិទ
              </button>
              <button
                onClick={handleAddUnit}
                disabled={savingUnit}
                className="px-5 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savingUnit ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductBasicInfo;
