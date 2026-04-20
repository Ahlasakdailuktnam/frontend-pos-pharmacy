import React from "react";
import { MdCheckCircle } from "react-icons/md";

const ProductSuccess = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed top-24 right-6 z-50 animate-slide-in">
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 shadow-lg">
        <MdCheckCircle className="text-green-600 text-2xl" />

        <div>
          <p className="font-semibold text-green-800">
            បញ្ចូលទិន្នន័យជោគជ័យ!
          </p>

          <p className="text-sm text-green-600">
            ផលិតផលត្រូវបានបន្ថែមក្នុងប្រព័ន្ធ
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSuccess;