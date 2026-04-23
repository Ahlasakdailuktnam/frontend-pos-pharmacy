import React, { useState } from "react";
import { MdAdd, MdDelete, MdSubdirectoryArrowRight } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";

const CategoryList = ({
  categories,
  subCategories,
  onAddSub,
  onDeleteCategory,
  onDeleteSub,
}) => {
  const [expanded, setExpanded] = useState(null);

  const getSubs = (categoryId) => {
    return subCategories.filter((item) => item.category_id === categoryId);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <h3 className="font-semibold text-gray-800">បញ្ជីប្រភេទផលិតផល</h3>
      </div>

      <div className="divide-y divide-gray-100">
        {categories.map((category) => {
          const subs = getSubs(category.id);

          return (
            <div
              key={category.id}
              className="hover:bg-gray-50 transition-colors"
            >
              {/* Category Row */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() =>
                  setExpanded(expanded === category.id ? null : category.id)
                }
              >
                <div className="flex items-center gap-3">
                  <div className="bg-teal-100 rounded-md p-2">
                    <GiMedicines className="font-bold text-xl " />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {category.name}
                    </h4>

                    <p className="text-xs text-gray-400">ID: {category.id}</p>
                  </div>

                  <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full ml-2">
                    {category.products_count || 0} ផលិតផល
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddSub(category);
                    }}
                    className="p-1.5 text-gray-400 hover:text-teal-600"
                  >
                    <MdAdd size={18} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCategory(category);
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-600"
                  >
                    <MdDelete size={18} />
                  </button>

                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expanded === category.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Sub Categories */}
              {expanded === category.id && (
                <div className="pl-12 pr-4 pb-4 bg-gray-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {subs.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100"
                      >
                        <div className="flex items-center gap-2">
                          <MdSubdirectoryArrowRight className="text-teal-500" />
                          <div className="flex items-center gap-4 ">
                            <div>
                              <p className="font-medium text-sm text-gray-700">
                                {sub.name}
                              </p>

                              <p className="text-xs text-gray-400">#{sub.id}</p>
                            </div>
                        <div className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full ml-2">{sub.products_count || 0} ផលិតផល</div>
                          </div>
                        </div>

                        <button
                          onClick={() => onDeleteSub(sub.id)}
                          className="p-1 text-gray-300 hover:text-red-500"
                        >
                          <MdDelete size={14} />
                        </button>
                      </div>
                    ))}

                    {subs.length === 0 && (
                      <div className="text-center py-4 text-gray-400 col-span-full">
                        <p className="text-sm">មិនទាន់មានប្រភេទរង</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {categories.length === 0 && (
          <div className="p-10 text-center text-gray-400">
            No Categories Found
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
