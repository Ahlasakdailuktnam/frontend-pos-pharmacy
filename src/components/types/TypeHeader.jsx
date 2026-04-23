import React from "react";
import { MdArrowBack, MdAdd } from "react-icons/md";

const TypeHeader = ({ onAdd }) => {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <a
              href="/add-product"
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <MdArrowBack size={20} className="text-gray-600" />
            </a>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                គ្រប់គ្រងប្រភេទផលិតផល
              </h1>

              <p className="text-gray-500 text-sm mt-0.5">
                គ្រប់គ្រងប្រភេទ និងប្រភេទរងនៃផលិតផលទាំងអស់
              </p>
            </div>
          </div>

          <button
            onClick={onAdd}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <MdAdd size={20} />
            <span>បន្ថែមប្រភេទថ្មី</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypeHeader;