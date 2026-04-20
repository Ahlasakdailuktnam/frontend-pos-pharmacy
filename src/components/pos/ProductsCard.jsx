import { FiPlus } from "react-icons/fi";

const BASE_URL = "http://127.0.0.1:8000";

const ProductsCard = ({ item }) => {
  return (
    <div className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition w-36">

      {/* Image */}
      <div className="relative">
        <img
          src={
            item.image
              ? `${BASE_URL}/${item.image}`
              : "https://via.placeholder.com/100"
          }
          alt={item.medicine_name}
          className="w-full h-20 object-cover rounded-md"
        />

        {/* Badge */}
        {/* <span className="absolute top-1 left-1 text-[9px] px-1.5 py-1 rounded bg-teal-100 text-[#0D9488] font-medium">
          {item.category || "OTC"}
        </span> */}
      </div>

      {/* Info */}
      <div className="mt-2">
        <h3 className="text-xs font-semibold text-gray-800 truncate">
          {item.medicine_name || "No Name"}
        </h3>

        <p className="text-[10px] text-gray-400 truncate">
          {item.generic_name || "N/A"}
        </p>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-[#0D9488] font-bold text-xs">
          ${Number(item.selling_price || 0).toFixed(2)}
        </span>

        <button className="w-7 h-7 flex items-center justify-center bg-teal-50 text-[#0D9488] rounded-md hover:bg-teal-100">
          <FiPlus size={14} />
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;