import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  IoPeopleCircleOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
const Navbar = () => {
  return (
        <div>
        <div className="flex bg-white px-8 py-4 justify-between items-center border-b border-gray-200">
          {/* Search */}
          <div className="relative w-200">
            <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />

            <input
              type="text"
              placeholder="ស្វែងរកផលិតផល (ឈ្មោះ, ម៉ាក, ឬ ទូទៅ)"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Right Icons */}
          <div className="flex gap-5 items-center text-gray-600">
            <IoMdNotificationsOutline className="text-2xl cursor-pointer hover:text-blue-500" />
            <MdDarkMode className="text-2xl cursor-pointer hover:text-blue-500" />
            <Link to="/login">
            <IoPeopleCircleOutline className="text-3xl cursor-pointer hover:text-blue-500" />
            </Link>
          </div>
        </div>
        </div>
  );
};

export default Navbar;
