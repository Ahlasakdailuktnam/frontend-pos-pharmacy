import { useState, useEffect } from "react";
import { FiPlus, FiMinus, FiGrid, FiChevronDown, FiHeart } from "react-icons/fi";
import { MdDeleteSweep, MdCategory, MdLocalPharmacy, MdFitnessCenter, MdChildCare } from "react-icons/md";
import { FaCreditCard, FaPills } from "react-icons/fa";
import { LiaDigitalTachographSolid } from "react-icons/lia";
import ProductsGrid from "../../components/pos/ProductsGrid";
import { IoIosCash } from "react-icons/io";
import useTypes from "../../hook/useTypes";
import { getProducts } from "../../services/auth";

const HomePos = () => {
  const [activeCategory, setActiveCategory] = useState("ទំនិញទាំងអស់");
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [check, setCheck] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const { categories, subCategories, loading: categoriesLoading, fetchTypes } = useTypes();

  // Get category icon
  const getCategoryIcon = (categoryName) => {
    const icons = {
      "ទំនិញទាំងអស់": <FiGrid size={16} />,
      "Skincare": <FiHeart size={16} />,
      "ថ្នាំទូទៅ": <MdLocalPharmacy size={16} />,
      "វីតាមីន": <FaPills size={16} />,
      "ថ្នាំបំប៉ន": <MdFitnessCenter size={16} />,
      "សម្ភារៈសម្រាប់កុមារ": <MdChildCare size={16} />,
    };
    return icons[categoryName] || <MdCategory size={16} />;
  };

  const categoryList = [
    { id: "all", name: "ទំនិញទាំងអស់", icon: getCategoryIcon("ទំនិញទាំងអស់") },
    ...categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      icon: getCategoryIcon(cat.name),
      subItems: subCategories.filter(sub => sub.category_id === cat.id)
    }))
  ];

  // Fetch categories
  useEffect(() => {
    fetchTypes();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    fetchProducts();
  }, [activeCategoryId]);

  const fetchProducts = async () => {
    try {
      const params = {};
      if (activeCategoryId !== "all") {
        const selectedCategory = categories.find(cat => cat.id === activeCategoryId);
        if (selectedCategory) {
          params.category = selectedCategory.name;
        }
      }
      const res = await getProducts(params);
      const data = res?.data || res || [];
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  // Get product price safely
  const getProductPrice = (product) => {
    const price = product.price_per_unit || product.cost || 0;
    return typeof price === "number" ? price : parseFloat(price) || 0;
  };

  // Get unit name
  const getUnitName = (product) => {
    if (product.unit?.name) {
      return product.unit.name;
    }
    return "ដុំ";
  };

  // Format price safely
  const formatPrice = (price) => {
    const numPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
    return numPrice.toFixed(2);
  };

  // Show message
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Cart functions
  const addToCart = (product, quantity = 1, boxQty = null) => {
    const stock = product.stock_unit || 0;
    const unitName = getUnitName(product);
    const isTablet = unitName === "គ្រាប់" || unitName === "tablet" || unitName === "tablets";

    if (stock === 0) {
      setMessage({ type: "error", text: "អស់ស្តុក!" });
      return;
    }

    let itemPrice = getProductPrice(product);
    if (boxQty) {
      itemPrice = product.price_per_box || (itemPrice * (product.box_size || 1));
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity + quantity > stock) {
          setMessage({ type: "error", text: "លើសស្តុក!" });
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === product.id
            ? { 
                ...item, 
                quantity: item.quantity + quantity,
                boxQty: isTablet && boxQty ? (item.boxQty || 0) + boxQty : null
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: itemPrice,
          originalPrice: getProductPrice(product),
          image: product.image,
          quantity: quantity,
          stock,
          unit: unitName,
          isTablet: isTablet,
          boxQty: boxQty || null,
          boxSize: product.box_size || 1,
          pricePerBox: product.price_per_box,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id !== productId) return item;
          if (quantity > item.stock) {
            setMessage({ type: "error", text: "លើសស្តុក!" });
            return item;
          }
          if (quantity <= 0) return null;
          return { ...item, quantity };
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    if (window.confirm("តើអ្នកចង់លុបទំនិញទាំងអស់ក្នុងកន្ត្រកមែនទេ?")) {
      setCart([]);
    }
  };

  const getCartSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const subtotal = getCartSubtotal();
  const total = subtotal;

  const handleCheckout = () => {
    if (cart.length === 0) {
      setMessage({ type: "error", text: "សូមបញ្ចូលទំនិញក្នុងកន្ត្រកមុន!" });
      return;
    }

    if (!check) {
      setMessage({ type: "error", text: "សូមជ្រើសរើសវិធីបង់ប្រាក់!" });
      return;
    }

    const orderSummary = cart
      .map(
        (item) =>
          `${item.name} x ${item.quantity} = $${formatPrice(item.price * item.quantity)}`
      )
      .join("\n");

    alert(
      `លំដាប់ការលក់:\n${orderSummary}\n\nសរុប: $${formatPrice(total)}\nវិធីបង់ប្រាក់: ${check.toUpperCase()}`
    );
  };

  const handleSelectCategory = (categoryId, categoryName) => {
    setActiveCategoryId(categoryId);
    setActiveCategory(categoryName);
    setOpenDropdown(null);
  };

  const handleSelectSubCategory = (subId, subName) => {
    setActiveCategoryId(subId);
    setActiveCategory(subName);
    setOpenDropdown(null);
  };

  if (categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">កំពុងផ្ទុកប្រភេទទំនិញ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Message Toast */}
      {message.text && (
        <div
          className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-lg shadow-lg ${
            message.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-[70%_1fr] items-start gap-5 p-5 min-h-screen">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4">
          {/* CATEGORY ROW WITH DROPDOWN */}
          <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {categoryList.map((cat) => {
                const hasSubItems = cat.subItems && cat.subItems.length > 0;
                const isActive = activeCategoryId === cat.id;
                const isOpen = openDropdown === cat.id;

                return (
                  <div key={cat.id} className="relative">
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          if (hasSubItems) {
                            setOpenDropdown(isOpen ? null : cat.id);
                          } else {
                            handleSelectCategory(cat.id, cat.name);
                          }
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                          isActive
                            ? "bg-[#0D9488] text-white shadow-sm"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        <span className={isActive ? "text-white" : "text-teal-600"}>
                          {cat.icon}
                        </span>
                        <span className="text-sm font-medium">{cat.name}</span>
                        {hasSubItems && (
                          <FiChevronDown 
                            size={14} 
                            className={`transition-transform ${isOpen ? "rotate-180" : ""} ${isActive ? "text-white" : "text-gray-400"}`}
                          />
                        )}
                      </button>
                    </div>

                    {/* Dropdown Subcategories */}
                    {hasSubItems && isOpen && (
                      <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 min-w-[200px] z-50 overflow-hidden">
                        <div className="py-2">
                          <button
                            onClick={() => handleSelectCategory(cat.id, cat.name)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-teal-50 flex items-center gap-2"
                          >
                            <span className="text-teal-600">{cat.icon}</span>
                            <span>{cat.name} (ទាំងអស់)</span>
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                          {cat.subItems.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => handleSelectSubCategory(sub.id, sub.name)}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-teal-50 pl-8"
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* PRODUCTS */}
          <ProductsGrid
            products={products}
            onAddToCart={addToCart}
            getProductPrice={getProductPrice}
            getUnitName={getUnitName}
            formatPrice={formatPrice}
          />
        </div>

        {/* RIGHT SIDE - CART */}
        <div className="w-full max-w-md h-[85vh] bg-white rounded-2xl shadow-sm flex flex-col sticky top-5">
          <div className="flex justify-between items-center p-5 border-b border-gray-300">
            <h2 className="text-lg font-semibold">កន្ត្រកបច្ចុប្បន្ន</h2>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-1 text-red-500 text-sm"
              >
                <MdDeleteSweep />
                លុបទាំងអស់
              </button>
            )}
          </div>

          {/* CART ITEMS */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p>មិនទាន់មានទំនិញក្នុងកន្ត្រក</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <img
                      src={item.image || "https://placehold.co/48x48/png?text=No+Img"}
                      className="w-12 h-12 rounded-lg object-cover"
                      alt=""
                    />
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        {item.isTablet && item.boxQty ? (
                          <>ចំនួន: {item.boxQty} ប្រអប់ ({item.quantity} {item.unit}) • ${formatPrice(item.price)}/ប្រអប់</>
                        ) : item.isTablet && !item.boxQty ? (
                          <>ចំនួន: {item.quantity} {item.unit} • ${formatPrice(item.originalPrice || item.price)}/{item.unit}</>
                        ) : (
                          <>ចំនួន: {item.quantity} {item.unit} • ${formatPrice(item.price)}/{item.unit}</>
                        )}
                      </p>
                      {item.isTablet && item.boxSize > 1 && (
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          1 ប្រអប់ = {item.boxSize} {item.unit}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${formatPrice(item.price * item.quantity)}
                    </p>
                    <div className="flex items-center gap-2 mt-1 justify-end">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                    {item.isTablet && (
                      <button
                        onClick={() => {
                          const boxSize = item.boxSize;
                          const newQuantity = item.quantity + boxSize;
                          if (newQuantity <= item.stock) {
                            updateQuantity(item.id, newQuantity);
                          } else {
                            setMessage({ type: "error", text: "លើសស្តុក!" });
                          }
                        }}
                        disabled={item.quantity + item.boxSize > item.stock}
                        className="mt-1 text-[10px] text-blue-500 hover:text-blue-600 disabled:text-gray-300"
                      >
                        +1 ប្រអប់ ({item.boxSize} {item.unit})
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* TOTAL SECTION */}
          <div className="p-5 border-t border-gray-300 bg-gray-50 space-y-3 rounded-b-2xl">
            <div className="flex justify-between text-sm text-gray-500">
              <span>សរុបរង</span>
              <span>${formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-sm text-red-500">
              <span>បញ្ចុះតម្លៃ</span>
              <span>-$0.00</span>
            </div>

            <div className="border-t border-gray-300 pt-3 flex justify-between items-center">
              <span className="font-semibold text-lg">សរុប</span>
              <span className="text-xl font-bold text-teal-600">
                ${formatPrice(total)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <button
                onClick={() => setCheck("cash")}
                className={`${
                  check === "cash"
                    ? "bg-[#0D9488] text-white border flex flex-col items-center rounded-lg py-3 text-sm"
                    : "bg-white border border-gray-300 flex flex-col items-center rounded-lg py-3 text-sm"
                }`}
              >
                <IoIosCash className="text-xl" />
                <p className="text-[10px] font-bold">CASH</p>
              </button>
              <button
                onClick={() => setCheck("card")}
                className={`${
                  check === "card"
                    ? "bg-[#0D9488] text-white border flex flex-col items-center rounded-lg py-3 text-sm"
                    : "bg-white border border-gray-300 flex flex-col items-center rounded-lg py-3 text-sm"
                }`}
              >
                <FaCreditCard className="text-xl" />
                <p className="text-[10px] font-bold">CARD</p>
              </button>
              <button
                onClick={() => setCheck("qr")}
                className={`${
                  check === "qr"
                    ? "bg-[#0D9488] text-white border flex flex-col items-center rounded-lg py-3 text-sm"
                    : "bg-white border border-gray-300 flex flex-col items-center rounded-lg py-3 text-sm"
                }`}
              >
                <LiaDigitalTachographSolid className="text-xl" />
                <p className="text-[10px] font-bold">SCAN QR</p>
              </button>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-[#0D9488] hover:bg-teal-700 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              បញ្ចប់ការលក់
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePos;