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

const ProductTable = ({ products = [], onDelete }) => {
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
            <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-200 bg-white">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">ផលិតផល</th>
              <th className="px-4 py-3">ប្រភេទ</th>
              <th className="px-4 py-3">តម្លៃ</th>
              <th className="px-4 py-3">ស្តុក</th>
              <th className="px-4 py-3">ថ្ងៃផុតកំណត់</th>
              <th className="px-4 py-3">ស្ថានភាព</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-50">
            {products.length > 0 ? (
              products.map((product) => {
                const stockQty =
                  product.stock_unit ||
                  product.stock_box ||
                  0;

                const stock = getStockStatus(stockQty);

                const image = getImage(product);

                const category =
                  product.category?.name ||
                  "-";

                const unit =
                product.unit?.name ||
                product.unit?.symbol ||
                  "";

                return (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition"
                  >
                    {/* Product Code */}
                    <td className="px-4 py-3 font-semibold text-teal-600">
                      {product.product_code || `P00${product.id}`}
                    </td>

                    {/* Product */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-teal-100 flex justify-center items-center shrink-0">
                          {image ? (
                            <img
                              src={image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaPills
                              className="text-teal-600"
                              size={14}
                            />
                          )}
                        </div>

                        <div>
                          <p className="font-medium text-gray-800">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {product.name_en}
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
                    <td className="px-4 py-3 font-semibold text-teal-600">
                      ${formatPrice(product.price_per_unit)}
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-3">
                      <span className={stock.color}>
                        {stockQty} {product.unit?.name || "ផលិតផល"}
                      </span>
                    </td>

                    {/* Expiry */}
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {product.expiry_date || "-"}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full w-fit ${stock.bg}`}
                      >
                        {stock.icon}
                        <span className={`text-xs ${stock.color}`}>
                          {stock.text}
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/edit-product/${product.id}`}
                          className="p-1 text-gray-400 hover:text-teal-600"
                        >
                          <MdEdit size={18} />
                        </Link>

                        <button
                          onClick={() => onDelete(product.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-8 text-gray-400"
                >
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;