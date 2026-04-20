import React from "react";
import { MdClose, MdSave } from "react-icons/md";

const ProductActions = ({ saving }) => {
  return (
    <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
      {/* Cancel */}
      <a
        href="/products"
        className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
      >
        <MdClose size={18} />
        បោះបង់
      </a>

      {/* Submit */}
      <button
        type="submit"
        disabled={saving}
        className="px-6 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MdSave size={18} />

        {saving ? "កំពុងរក្សាទុក..." : "រក្សាទុកផលិតផល"}
      </button>
    </div>
  );
};

export default ProductActions;