// src/components/products/ProductTable.jsx

import React from "react";
import { Link } from "react-router-dom";
import {
  MdDelete,
  MdEdit,
  MdWarning,
  MdCheckCircle,
  MdCancel,
} from "react-icons/md";
import { FaPills } from "react-icons/fa";

const ProductTable = ({ products, onDelete }) => {
  const getStockStatus = (stock) => {
    const qty = Number(stock || 0);

    if (qty <= 0) {
      return {
        text: "អស់ស្តុក",
        color: "text-red-500",
        bg: "bg-red-50",
        icon: <MdCancel size={14} />,
      };
    }

    if (qty <= 50) {
      return {
        text: "ជិតអស់",
        color: "text-orange-500",
        bg: "bg-orange-50",
        icon: <MdWarning size={14} />,
      };
    }

    return {
      text: "មានស្តុក",
      color: "text-green-500",
      bg: "bg-green-50",
      icon: <MdCheckCircle size={14} />,
    };
  };

  const getImage = (product) => {
    return (
      product.image ||
      product.image_url ||
      product.photo ||
      null
    );
  };

  const formatPrice = (price) => {
    return Number(price || 0).toFixed(2);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-100 bg-white">
              <th className="px-4 py-3">ផលិតផល</th>
              <th className="px-4 py-3">ប្រភេទ</th>
              <th className="px-4 py-3">តម្លៃ</th>
              <th className="px-4 py-3">ស្តុក</th>
              <th className="px-4 py-3">ថ្ងៃផុតកំណត់</th>
              <th className="px-4 py-3">ស្ថានភាព</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => {
              const stockQty =
                product.stock_unit ||
                product.stock ||
                0;

              const stock = getStockStatus(stockQty);

              const image = getImage(product);

              const category =
                product.category?.name ||
                product.category_name ||
                product.category ||
                "-";

              return (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  {/* Product */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* Image */}
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-teal-100 flex items-center justify-center shrink-0">
                        {image ? (
                          <img
                            src={image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <FaPills
                            className="text-teal-600"
                            size={14}
                          />
                        )}
                      </div>

                      {/* Name */}
                      <div>
                        <span className="font-medium text-gray-800 group-hover:text-teal-600 transition-colors">
                          {product.name}
                        </span>

                        <p className="text-xs text-gray-400">
                          {product.name_en ||
                            product.nameEn}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-teal-50 text-teal-600">
                      {category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 text-sm font-semibold text-teal-600">
                    ${formatPrice(product.price_per_unit)}
                  </td>

                  {/* Stock */}
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-medium ${stock.color}`}
                    >
                      {stockQty} {product.unit}
                    </span>
                  </td>

                  {/* Expiry */}
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {product.expiry_date || "-"}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <div
                      className={`flex items-center gap-1 ${stock.bg} px-2 py-1 rounded-full w-fit`}
                    >
                      {stock.icon}

                      <span
                        className={`text-xs ${stock.color}`}
                      >
                        {stock.text}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Link
                        to={`/edit-product/${product.id}`}
                        className="p-1 text-gray-400 hover:text-teal-600 transition-colors"
                      >
                        <MdEdit size={16} />
                      </Link>

                      <button
                        onClick={() =>
                          onDelete(product)
                        }
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;