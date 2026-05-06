import React, { useState, useRef, useEffect } from "react";
import { 
  AiOutlineSearch, 
  AiOutlineBell, 
  AiOutlineMenu,
  AiOutlineClose 
} from "react-icons/ai";
import { FiPlus, FiPackage, FiShoppingCart } from "react-icons/fi";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";  // ← ADD Link here
import logo from "../../assets/logo.png";
import useProducts from "../../hook/useProducts";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  const { addToCart, getItemCount, getProductPrice, getUnitName, formatPrice } = useCart();
  const { user, loading: authLoading } = useAuth(); // Get user from AuthContext
  const cartCount = getItemCount();
  
  const { 
    searchProducts, 
    searchResults, 
    isSearching, 
    clearSearchResults,
    search,
    setSearch
  } = useProducts();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearch = (query) => {
    setSearch(query);
    searchProducts(query);
    if (query.trim().length >= 2) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      setShowSearchResults(false);
      clearSearchResults();
    }
  };

  const handleAddToCart = (e, product, boxQty = null) => {
    e.stopPropagation();
    const quantity = boxQty || 1;
    addToCart(product, quantity, boxQty);
  };

  const isTabletType = (product) => {
    const unitName = product.unit?.name?.toLowerCase();
    return unitName === "គ្រាប់" || unitName === "tablet" || unitName === "tablets";
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name.charAt(0).toUpperCase();
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user?.name) return "Loading...";
    return user.name;
  };

  // Get user role
  const getUserRole = () => {
    if (user?.is_admin === 1) return "Administrator";
    return "Staff";
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <AiOutlineClose className="w-5 h-5 text-slate-600" />
            ) : (
              <AiOutlineMenu className="w-5 h-5 text-slate-600" />
            )}
          </button>

          {/* Logo - Mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
            <div>
              <p className="text-sm font-semibold text-emerald-700 leading-tight">ឱសថស្ថាន</p>
              <p className="text-sm text-slate-400">Pharmacy POS</p>
            </div>
          </div>

          {/* Logo - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-xl blur opacity-20"></div>
              <img src={logo} alt="logo" className="relative w-13 h-13 object-contain rounded-xl" />
            </div>
            <div>
              <p className="text-lg font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                ឱសថស្ថាន អាឡាត្រឡោកបែក
              </p>
              <p className="text-[12px] text-slate-400">Pharmacy Management System</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div ref={searchRef} className="hidden md:flex relative flex-1 max-w-3xl mx-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AiOutlineSearch className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => search.trim().length >= 2 && setShowSearchResults(true)}
              placeholder="ស្វែងរកផលិតផលតាមឈ្មោះ ឬ បាកូដ.."
              className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-100 rounded border border-slate-200">
              ⌘K
            </kbd>

            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="p-8 text-center text-gray-500">
                    <div className="animate-spin w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                    <p className="text-sm">កំពុងស្វែងរក...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    <div className="sticky top-0 bg-white p-3 border-b border-gray-100">
                      <p className="text-xs text-gray-400">
                        លទ្ធផលស្វែងរក ({searchResults.length}) 
                        <span className="ml-2 text-emerald-600">"{search}"</span>
                      </p>
                    </div>
                    <div className="p-2">
                      {searchResults.map((product) => {
                        const stock = product.stock_unit || 0;
                        const price = getProductPrice(product);
                        const unitName = getUnitName(product);
                        const isTablet = isTabletType(product);
                        const boxSize = product.box_size || 1;
                        const isOutOfStock = stock === 0;

                        return (
                          <div
                            key={product.id}
                            className="bg-white rounded-xl border border-gray-100 mb-2 hover:shadow-md transition overflow-hidden"
                          >
                            <div className="flex gap-3 p-3">
                              <img
                                src={product.image || "https://placehold.co/60x60/png?text=No+Image"}
                                className="w-14 h-14 rounded-lg object-cover"
                                alt={product.name}
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm text-gray-800 line-clamp-2">
                                  {product.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <span className="text-xs text-teal-600 font-semibold">
                                    ${formatPrice(price)}/{unitName}
                                  </span>
                                  {isTablet && (
                                    <>
                                      <span className="text-xs text-gray-400">|</span>
                                      <span className="text-xs text-blue-600 font-semibold">
                                        ${formatPrice(product.price_per_box || price * boxSize)}/ប្រអប់
                                      </span>
                                    </>
                                  )}
                                  {isOutOfStock && (
                                    <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">
                                      អស់ស្តុក
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                {!isOutOfStock && (
                                  <button
                                    onClick={(e) => handleAddToCart(e, product)}
                                    className="px-3 py-1.5 rounded-lg bg-teal-500 text-white text-xs font-medium flex items-center gap-1 hover:bg-teal-600 transition whitespace-nowrap"
                                  >
                                    <FiPlus size={12} />
                                    បន្ថែម
                                  </button>
                                )}
                                {isTablet && !isOutOfStock && (
                                  <button
                                    onClick={(e) => handleAddToCart(e, product, boxSize)}
                                    className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-medium flex items-center gap-1 hover:bg-blue-600 transition whitespace-nowrap"
                                  >
                                    <FiPackage size={12} />
                                    ប្រអប់
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="sticky bottom-0 bg-gray-50 p-3 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setShowSearchResults(false);
                          clearSearchResults();
                        }}
                        className="w-full text-center py-2 text-sm text-emerald-600 font-medium hover:bg-emerald-50 rounded-lg transition"
                      >
                        មើលទាំងអស់ ({searchResults.length} ផលិតផល) →
                      </button>
                    </div>
                  </>
                ) : search.trim().length >= 2 ? (
                  <div className="p-8 text-center text-gray-400">
                    <AiOutlineSearch className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">រកមិនឃើញផលិតផល</p>
                    <p className="text-xs mt-1">"<span className="text-emerald-600">{search}</span>"</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Search - Mobile */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => {
                const searchInput = document.getElementById('mobile-search-input');
                searchInput?.focus();
              }}
            >
              <AiOutlineSearch className="w-5 h-5 text-slate-600" />
            </button>

            {/* Cart Icon with Counter */}
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <FiShoppingCart className="w-5 h-5 text-slate-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <AiOutlineBell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isDarkMode ? (
                <MdOutlineLightMode className="w-5 h-5 text-slate-600" />
              ) : (
                <MdDarkMode className="w-5 h-5 text-slate-600" />
              )}
            </button>
             
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="mobile-search-input"
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="ស្វែងរកផលិតផល..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Mobile Search Results */}
          {showSearchResults && search.trim().length >= 2 && (
            <div className="absolute left-4 right-4 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
              {isSearching ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="animate-spin w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                  <p className="text-sm">កំពុងស្វែងរក...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="p-2 space-y-2">
                  {searchResults.map((product) => {
                    const stock = product.stock_unit || 0;
                    const price = getProductPrice(product);
                    const unitName = getUnitName(product);
                    const isOutOfStock = stock === 0;

                    return (
                      <div key={product.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={product.image || "https://placehold.co/60x60/png?text=No+Image"}
                          className="w-12 h-12 rounded-lg object-cover"
                          alt=""
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-teal-600 font-semibold">
                            ${formatPrice(price)}/{unitName}
                          </p>
                        </div>
                        {!isOutOfStock && (
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className="px-3 py-1.5 rounded-lg bg-teal-500 text-white text-xs font-medium flex items-center gap-1"
                          >
                            <FiPlus size={12} />
                            បន្ថែម
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <AiOutlineSearch className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">រកមិនឃើញផលិតផល</p>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-white z-50 lg:hidden shadow-2xl">
            {/* Mobile sidebar content would go here */}
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;