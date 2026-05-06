import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import SidebarAdmin from "../components/layout/SidebarAdmin"
import HomePos from "../pages/Staff/HomePos";
import InvoiceHistory from "../pages/Staff/InvoiceHistory";
import CheckoutSuccess from "../pages/Staff/CheckoutSuccess";
import CheckoutCash from "../pages/Staff/CheckoutCash";
import CheckoutCard from "../pages/Staff/CheckoutCard";
import CheckoutQR from "../pages/Staff/CheckoutQR";
import Profile from "../pages/Admins/Profile";

const StaffRoute = () => {
  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar/>
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePos />} />
            <Route path="profile" element={<Profile />} />
            <Route path="customer" element={<InvoiceHistory />} />
            <Route path="check" element={<CheckoutSuccess />} />
            <Route path="customer" element={<InvoiceHistory />} />
            <Route path="checkPay" element={<CheckoutCash />} />
            <Route path="checkout-card" element={<CheckoutCard/>} />
            <Route path="checkout-qr" element={<CheckoutQR />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default StaffRoute;