// src/components/products/ProductEmpty.jsx

import React from "react";
import { FaPills } from "react-icons/fa";

const ProductEmpty = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="py-16 px-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <FaPills className="text-gray-400 text-2xl" />
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          មិនមានទិន្នន័យផលិតផល
        </h3>

        <p className="text-sm text-gray-400">
          សូមបន្ថែមផលិតផលថ្មី ឬសាកល្បងស្វែងរកម្ដងទៀត
        </p>
      </div>
    </div>
  );
};

export default ProductEmpty;