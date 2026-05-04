import { useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoPeopleOutline, IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

import { logoutUser } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const [navbar, setNavbar] = useState("pos");
  const navigate = useNavigate();

  //  Global User
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
    } finally {
      setUser(null);
      navigate("/");
    }
  };

  return (
    <div>
      <div className="flex bg-white flex-col h-screen px-5 py-7 border-r border-gray-200">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-[#0D9488] rounded-lg font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <p className="text-sm font-medium">
              {user?.name || "Loading..."}
            </p>

            <p className="text-xs text-gray-400">
              {user?.is_admin == 1 ? "Admin" : "Staff"}
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2 text-gray-600">

          {/* POS */}
          <Link to="/staff">
            <div
              onClick={() => setNavbar("pos")}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                navbar === "pos"
                  ? "bg-blue-50 text-[#0D9488] border-l-4 border-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <AiOutlineProduct className="text-lg" />
              <p className="font-medium">លក់ទំនិញ (POS)</p>
            </div>
          </Link>

          {/* Report */}
          <Link to="/staff/check">
            <div
              onClick={() => setNavbar("report")}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                navbar === "report"
                  ? "bg-blue-50 text-[#0D9488] border-l-4 border-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <HiOutlineDocumentReport className="text-lg" />
              <p>ប្រវត្តិការលក់</p>
            </div>
          </Link>

          {/* Customer */}
          <Link to="/staff/customer">
            <div
              onClick={() => setNavbar("customer")}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                navbar === "customer"
                  ? "bg-blue-50 text-[#0D9488] border-l-4 border-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <IoPeopleOutline className="text-lg" />
              <p>អតិថិជន</p>
            </div>
          </Link>

        </div>

        {/* Logout */}
        <div className="mt-auto">
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer"
          >
            <IoLogOutOutline className="text-lg" />
            <p>ចាកចេញ</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;