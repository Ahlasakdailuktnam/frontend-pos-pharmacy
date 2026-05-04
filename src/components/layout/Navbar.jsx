import React, { useState } from "react";
import { 
  AiOutlineSearch, 
  AiOutlineBell, 
  AiOutlineMenu,
  AiOutlineClose 
} from "react-icons/ai";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Apply dark mode logic here
  };

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

          <div className="hidden md:flex relative flex-1 max-w-3xl mx-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <AiOutlineSearch className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ស្វែងរកផលិតផលតាមឈ្មោះ ឬ បាកូដ.."
              className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-100 rounded border border-slate-200">
              ⌘K
            </kbd>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Search - Mobile */}
            <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <AiOutlineSearch className="w-5 h-5 text-slate-600" />
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

            {/* User Menu */}
            <button className="flex items-center gap-2 ml-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-medium shadow-md">
                JD
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-slate-700">John Doe</p>
                <p className="text-[10px] text-slate-400">Administrator</p>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
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