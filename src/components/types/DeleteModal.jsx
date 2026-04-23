import React from "react";
import { MdDelete, MdClose } from "react-icons/md";

const DeleteModal = ({
  open,
  onClose,
  onConfirm,
  title = "លុបទិន្នន័យ",
  message = "តើអ្នកច្បាស់ទេ?",
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdDelete className="text-red-600 text-3xl" />
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {title}
          </h2>

          <p className="text-gray-500 mb-6">
            {message}
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              បោះបង់
            </button>

            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              លុប
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;