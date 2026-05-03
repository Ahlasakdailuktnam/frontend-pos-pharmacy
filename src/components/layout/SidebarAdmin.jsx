import { useState } from "react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoIosPeople, IoIosPersonAdd } from "react-icons/io";
import {
  IoPeopleOutline,
  IoPersonAddOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { FaChartArea, FaUserCheck, FaWarehouse } from "react-icons/fa";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdAddChart,
} from "react-icons/md";
import { BsHouseAddFill } from "react-icons/bs";

import { LiaClipboardListSolid } from "react-icons/lia";
import {
  TbTruckDelivery,
  TbReportMedical,
  TbFileInvoiceFilled,
} from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Supplier from "../../pages/Admins/Supplier/Supplier";

const Sidebar = () => {
  const [navbar, setNavbar] = useState("");
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState({
    inventory: false,
    staff: false,
    supplier: false,
    warehouse: false,
  });
  const location = useLocation();

  return (
    <div>
      <div className="flex bg-white flex-col h-screen px-5 py-7 border-r border-gray-200 overflow-y-auto no-scrollbar">
        {" "}
        {/* LOGO */}
        <div className="mb-8 flex items-center gap-2">
          <img className="w-13 h-13" src={logo} alt="" />
          <p className="text-[#0D9488] font-bold text-lg leading-snug">
            ឱសថស្ថាន អាឡាត្រឡោកបែក
          </p>
        </div>
        {/* USER */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-[#0D9488] rounded-lg font-semibold">
            ST
          </div>
          <div>
            <p className="text-sm font-medium">បុគ្គលិកលក់</p>
            <p className="text-xs text-gray-400">Cashier</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-gray-600">
          {/* DASHBOARD */}
          <Link to="/admin">
            <div
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                location.pathname === "/admin"
                  ? "bg-blue-50 text-[#0D9488] border-l-4 border-[#0D9488]"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaChartArea />
              <p className="font-medium">Dashboard</p>
            </div>
          </Link>

          {/* INVENTORY DROPDOWN */}
          <div>
            {/* MAIN MENU */}
            <div
              onClick={() => {
                setOpenMenu((prev) => ({
                  ...prev,
                  inventory: !prev.inventory,
                }));
                navigate("/admin/inventory");
              }}
              className={`flex items-center justify-between gap-3 p-2 rounded-lg cursor-pointer ${
                location.pathname.includes("/admin/inventory")
                  ? "bg-blue-50 text-[#0D9488] border-l-4 border-[#0D9488]"
                  : "hover:bg-gray-100"
              }`}
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <HiOutlineDocumentReport className="text-lg" />
                <p>ការគ្រប់គ្រងទំនិញ</p>
              </div>

              {/* RIGHT ICON */}
              <span>
                {openMenu.inventory ? (
                  <MdKeyboardArrowDown />
                ) : (
                  <MdKeyboardArrowRight />
                )}
              </span>
            </div>

            {/* DROPDOWN */}
            {openMenu.inventory && (
              <div className="ml-8 mt-1 flex flex-col gap-1">
                {/* All Products */}
                <Link to="/admin/inventory/list">
                  <div
                    className={`p-2 rounded-lg flex gap-2 items-center cursor-pointer ${
                      location.pathname === "/admin/inventory/list"
                        ? "bg-blue-100 text-[#0D9488]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <LiaClipboardListSolid />
                    បញ្ជីថ្នាំទាំងអស់
                  </div>
                </Link>

                {/* Add Product */}
                <Link to="/admin/inventory/add">
                  <div
                    className={`p-2 rounded-lg gap-2  flex items-center  cursor-pointer ${
                      location.pathname === "/admin/inventory/add"
                        ? "bg-blue-100 text-[#0D9488]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <MdAddChart />
                    បន្ថែមថ្នាំថ្មី
                  </div>
                </Link>

                <Link to="/admin/inventory/addType">
                  <div
                    className={`p-2 rounded-lg gap-2  flex items-center  cursor-pointer ${
                      location.pathname === "/admin/inventory/addType"
                        ? "bg-blue-100 text-[#0D9488]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <MdAddChart />
                    បន្ថែមប្រភេទថ្នាំថ្មី
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* CUSTOMER */}
          <Link to="/admin/customer">
            <div
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                location.pathname === "/admin/customer"
                  ? "bg-blue-50 text-[#0D9488] border-l-4 border-[#0D9488]"
                  : "hover:bg-gray-100"
              }`}
            >
              <IoIosPeople />
              <p>អតិថិជន</p>
            </div>
          </Link>

          <div>
            {/* MAIN MENU */}
            <div
              onClick={() => {
                setOpenMenu((prev) => ({
                  ...prev,
                  staff: !prev.staff,
                }));
                navigate("/admin/staff");
              }}
              className={`flex items-center justify-between gap-3 p-2 rounded-lg cursor-pointer ${
                location.pathname.includes("/admin/staff")
                  ? "bg-blue-50 text-[#0D9488] border-l-4 border-[#0D9488]"
                  : "hover:bg-gray-100"
              }`}
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <HiOutlineDocumentReport className="text-lg" />
                <p>ការគ្រប់គ្រងបុគ្គលិក</p>
              </div>

              {/* RIGHT ICON */}
              <span>
                {openMenu.staff ? (
                  <MdKeyboardArrowDown />
                ) : (
                  <MdKeyboardArrowRight />
                )}
              </span>
            </div>

            {/* DROPDOWN */}
            {openMenu.staff && (
              <div className="ml-8 mt-1 flex flex-col gap-1">
                {/* All Products */}
                <Link to="/admin/staff/list">
                  <div
                    className={`p-2 rounded-lg flex gap-2 items-center cursor-pointer ${
                      location.pathname === "/admin/staff/list"
                        ? "bg-blue-100 text-[#0D9488]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <LiaClipboardListSolid />
                    បញ្ជីប្រាក់ខែ
                  </div>
                </Link>

                {/* Add Product */}
                <Link to="/admin/staff/add">
                  <div
                    className={`p-2 rounded-lg flex gap-2 items-center cursor-pointer ${
                      location.pathname === "/admin/staff/add"
                        ? "bg-blue-100 text-[#0D9488]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <IoPersonAddOutline />
                    បន្ថែមបុគ្កលិកថ្មី
                  </div>
                </Link>
                <Link to="/admin/staff/att">
                  <div
                    className={`p-2 rounded-lg flex gap-2 items-center cursor-pointer ${
                      location.pathname === "/admin/staff/att"
                        ? "bg-blue-100 text-[#0D9488]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <FaUserCheck />
                    កត់វត្តមាន
                  </div>
                </Link>
              </div>
            )}
          </div>
          <div>
            {/* MAIN MENU */}
            <div
              onClick={() => {
                setOpenMenu((prev) => ({
                  ...prev,
                  supplier: !prev.supplier,
                }));
                navigate("/admin/supplier");
              }}
              className={`flex items-center justify-between gap-3 p-2 rounded-lg cursor-pointer ${
                location.pathname.includes("/admin/supplier")
                  ? "bg-blue-50 text-[#0D9488] border-l-4 border-[#0D9488]"
                  : "hover:bg-gray-100"
              }`}
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <TbTruckDelivery className="text-lg" />
                <p>ការគ្រប់គ្រង់ទំនិញនាំចូល</p>
              </div>

              {/* RIGHT ICON */}
              <span>
                {openMenu.supplier ? (
                  <MdKeyboardArrowDown />
                ) : (
                  <MdKeyboardArrowRight />
                )}
              </span>
            </div>

            {/* DROPDOWN */}
            {openMenu.supplier && (
              <div className="ml-8 mt-1 flex flex-col gap-1">
                {/* All Products */}
                <Link to="/admin/supplier/list">
                  <div
                    className={`p-2 rounded-lg flex gap-2 items-center cursor-pointer ${
                      location.pathname === "/admin/supplier/list"
                        ? "bg-blue-100 text-[#0D9488]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <LiaClipboardListSolid />
                    បញ្ជីការនាំចូល
                  </div>
                </Link>

                <Link to="/admin/supplier/add">
                  <div
                    className={`p-2 rounded-lg flex gap-2 items-center cursor-pointer ${
                      location.pathname === "/admin/supplier/add"
                        ? "bg-blue-100 text-[#0D9488]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <IoPersonAddOutline />
                    បន្ថែមអ្នកនាំចូល
                  </div>
                </Link>
                <Link to="/admin/supplier/all-payments">
                  <div
                    className={`p-2 rounded-lg flex gap-2 items-center cursor-pointer ${
                      location.pathname === "/admin/supplier/all-payments"
                        ? "bg-blue-100 text-[#0D9488]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <TbFileInvoiceFilled />
                    ប្រវត្តិបង់ប្រាក់{" "}
                  </div>
                </Link>
                <Link to="/admin/supplier/add-sup-invoice">
                  <div
                    className={`p-2 rounded-lg flex gap-2 items-center cursor-pointer ${
                      location.pathname === "/admin/supplier/add-sup-invoice"
                        ? "bg-blue-100 text-[#0D9488]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <MdAddChart />
                    បន្ថែមវិក្ក័យបត្រទំនិញនាំចូល
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div>
            {/* MAIN MENU */}
            <div
              onClick={() => {
                setOpenMenu((prev) => ({
                  ...prev,
                  warehouse: !prev.warehouse,
                }));
                navigate("/admin/warehouse");
              }}
              className={`flex items-center justify-between gap-3 p-2 rounded-lg cursor-pointer ${
                location.pathname.includes("/admin/warehouse")
                  ? "bg-blue-50 text-[#0D9488] border-l-4 border-[#0D9488]"
                  : "hover:bg-gray-100"
              }`}
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <FaWarehouse className="text-lg" />
                <p>ទីតាំងស្តុកទំនិញ</p>
              </div>

              {/* RIGHT ICON */}
              <span>
                {openMenu.supplier ? (
                  <MdKeyboardArrowDown />
                ) : (
                  <MdKeyboardArrowRight />
                )}
              </span>
            </div>

            {/* DROPDOWN */}
            {openMenu.warehouse && (
              <div className="ml-8 mt-1 flex flex-col gap-1">
                {/* All Products */}

                {/* Add Product */}
                <Link to="/admin/warehouse/add">
                  <div
                    className={`p-2 rounded-lg flex gap-2 items-center cursor-pointer ${
                      location.pathname === "/admin/warehouse/add"
                        ? "bg-blue-100 text-[#0D9488]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <BsHouseAddFill />
                    បន្ថែមទីតាំងថ្មី
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* REPORT */}
          <Link to="/admin/expence">
            <div
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                location.pathname === "/admin/expence"
                  ? "bg-blue-50 text-[#0D9488] border-l-4 border-[#0D9488]"
                  : "hover:bg-gray-100"
              }`}
            >
              <TbReportMedical />
              <p>ការចំណាយផ្សេងៗ</p>
            </div>
          </Link>

          <Link to="/admin/report">
            <div
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
                location.pathname === "/admin/report"
                  ? "bg-blue-50 text-[#0D9488] border-l-4 border-[#0D9488]"
                  : "hover:bg-gray-100"
              }`}
            >
              <TbReportMedical />
              <p>របាយការណ៍</p>
            </div>
          </Link>
        </div>
        {/* LOGOUT */}
        <div className="mt-auto">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer">
            <IoLogOutOutline />
            <p>ចាកចេញ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
