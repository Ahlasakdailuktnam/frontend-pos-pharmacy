import React from "react";
import { MdArrowBack } from "react-icons/md";

const ProductHeader = () => {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center gap-4">
          <a
            href="/products"
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <MdArrowBack size={20} className="text-gray-600" />
          </a>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              បន្ថែមផលិតផលថ្មី
            </h1>

            <p className="text-gray-500 text-sm mt-0.5">
              បញ្ចូលព័ត៌មានផលិតផលថ្មីក្នុងប្រព័ន្ធ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;