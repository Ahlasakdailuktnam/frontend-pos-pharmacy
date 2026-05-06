import { useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoPeopleOutline, IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { CiSettings } from "react-icons/ci";

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

      localStorage.removeItem("user"); // clear user

      navigate("/"); // go login page
    } catch (err) {
    }
  };

  return (
    <div>
      <div className="flex bg-white flex-col h-screen px-5 py-7 border-r border-gray-200">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-[#0D9488] rounded-lg font-semibold">
            S
          </div>

          <div>
            <p className="text-sm font-medium">
              Staff
            </p>

            <p className="text-xs text-gray-400">
              Chasior
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
          <Link to="/staff/customer">
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



        </div>
              <Link to="/staff/profile">
                          <div
                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                              location.pathname === "/staff/profile"
                                ? "bg-blue-50 text-[#0D9488] border-l-4 border-[#0D9488]"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <CiSettings/>
                            <p>ការកំណត់បន្ថែម</p>
                          </div>
                        </Link>
        {/* Logout */}
        <div >
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer"
          >
            <IoLogOutOutline />
            <p>ចាកចេញ</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;