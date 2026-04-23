// src/components/types/TypeStats.jsx

import React from "react";
import { MdCategory } from "react-icons/md";
import { FaBoxes, FaPills } from "react-icons/fa";

const Card = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-3">
      <div className="text-teal-600 text-xl">{icon}</div>
    </div>

    <p className="text-sm text-gray-500">{title}</p>
    <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
  </div>
);

const TypeStats = ({ categories = [] }) => {
  const totalCategories = categories.length;

  const totalSubs = categories.reduce((sum, item) => {
    return sum + (item.sub_category?.length || 0);
  }, 0);

  const totalProducts = categories.reduce((sum, item) => {
    return sum + Number(item.products_count || 0);
  }, 0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <Card
        title="ប្រភេទផលិតផលសរុប"
        value={totalCategories}
        icon={<MdCategory />}
      />

      <Card
        title="ប្រភេទរងផលិតផលសរុប"
        value={totalSubs}
        icon={<FaBoxes />}
      />

      <Card
        title="ផលិតផលសរុប"
        value={totalProducts}
        icon={<FaPills />}
      />
    </div>
  );
};

export default TypeStats;