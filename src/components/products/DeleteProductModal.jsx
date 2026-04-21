// src/components/products/DeleteProductModal.jsx

import React from "react";
import { MdDelete } from "react-icons/md";

const DeleteProductModal = ({
  open,
  product,
  deleting,
  onClose,
  onConfirm,
}) => {
  if (!open || !product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <MdDelete className="text-red-600 text-3xl" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            លុបផលិតផល
          </h2>

          {/* Message */}
          <p className="text-sm text-gray-500 leading-relaxed">
            តើអ្នកច្បាស់ជាចង់លុបផលិតផល{" "}
            <span className="font-semibold text-gray-800">
              {product.name}
            </span>{" "}
            មែនទេ?
            <br />
            សកម្មភាពនេះមិនអាចស្តារឡើងវិញបានទេ។
          </p>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={deleting}
              className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition disabled:opacity-60"
            >
              បោះបង់
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={deleting}
              className="px-4 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-60"
            >
              {deleting ? "កំពុងលុប..." : "លុប"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;