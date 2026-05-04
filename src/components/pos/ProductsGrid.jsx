import { FiPlus, FiMapPin, FiPackage } from "react-icons/fi";

const ProductsGrid = ({ products, onAddToCart, getProductPrice, getUnitName, formatPrice }) => {
  const isTabletType = (product) => {
    const unitName = product.unit?.name?.toLowerCase();
    return unitName === "គ្រាប់" || unitName === "tablet" || unitName === "tablets";
  };

  const getBoxSize = (product) => product.box_size || 1;

  const getPricePerBox = (product) => {
    const price = product.price_per_box || (getProductPrice(product) * (product.box_size || 1));
    return typeof price === "number" ? price : parseFloat(price) || 0;
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-sm">មិនមានទំនិញក្នុងប្រភេទនេះទេ</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {products.map((product) => {
        const stock = product.stock_unit || 0;
        const stockBox = product.stock_box || 0;
        const price = getProductPrice(product);
        const unitName = getUnitName(product);
        const isTablet = isTabletType(product);
        const boxSize = getBoxSize(product);
        const pricePerBox = getPricePerBox(product);

        let stockStatus = null;
        if (stock === 0) {
          stockStatus = { text: "អស់ស្តុក", style: "bg-red-500" };
        } else if (stock <= 10) {
          stockStatus = { text: "ជិតអស់", style: "bg-yellow-400 text-black" };
        }

        return (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-200 flex flex-col overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative bg-gray-50">
              <img
                src={product.image || "https://placehold.co/300x300/png?text=No+Image"}
                alt={product.name}
                className="w-full h-32 object-contain p-2"
              />

              {stockStatus && (
                <span
                  className={`absolute top-2 right-2 text-[10px] px-2 py-1 rounded-full text-white ${stockStatus.style}`}
                >
                  {stockStatus.text}
                </span>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-3 flex flex-col flex-1">
              {/* NAME */}
              <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
                {product.name}
              </h4>

              {/* LOCATION */}
              <div className="flex items-center text-[11px] text-gray-400 gap-1 mb-2">
                <FiMapPin size={12} />
                <span className="truncate">{product.location || "មិនមានទីតាំង"}</span>
              </div>

              {/* PRICE */}
              <div className="mb-3">
                {isTablet ? (
                  <>
                    <p className="text-teal-600 font-bold text-base">
                      ${formatPrice(price)}
                      <span className="text-xs text-gray-400 font-normal"> /{unitName}</span>
                    </p>
                    <p className="text-black font-semibold text-xs mt-1">
                      ${formatPrice(pricePerBox)}
                      <span className="text-gray-400 font-normal">
                        {" "} /ប្រអប់ ({boxSize} {unitName})
                      </span>
                    </p>
                  </>
                ) : (
                  <p className="text-teal-600 font-bold text-base">
                    ${formatPrice(price)}
                    <span className="text-xs text-gray-400 font-normal"> /{unitName}</span>
                  </p>
                )}
              </div>

              {/* BUTTONS */}
              <div className="mt-auto">
                {isTablet ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onAddToCart(product, 1, null)}
                      disabled={stock === 0}
                      className="flex-1 py-2 rounded-lg bg-teal-500 text-white text-xs font-medium flex items-center justify-center gap-1 hover:bg-teal-600 disabled:bg-gray-300"
                    >
                      <FiPlus size={14} />
                      1 {unitName}
                    </button>

                    <button
                      onClick={() => onAddToCart(product, boxSize, boxSize)}
                      disabled={stockBox === 0}
                      className="flex-1 py-2 rounded-lg bg-blue-500 text-white text-xs font-medium flex items-center justify-center gap-1 hover:bg-blue-600 disabled:bg-gray-300"
                    >
                      <FiPackage size={14} />
                      ប្រអប់
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onAddToCart(product, 1, null)}
                    disabled={stock === 0}
                    className="w-full py-2 rounded-lg bg-teal-500 text-white text-xs font-medium flex items-center justify-center gap-1 hover:bg-teal-600 disabled:bg-gray-300"
                  >
                    <FiPlus size={14} />
                    បន្ថែម
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsGrid;