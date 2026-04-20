import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import HomePos from "../pages/Staff/HomePos";
import InvoiceHistory from "../pages/Staff/InvoiceHistory";
import CheckoutSuccess from "../pages/Staff/CheckoutSucess";

const StaffRoute = () => {
  return (
    <div className="grid grid-cols-[298px_1fr] h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="flex flex-col">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePos />} />
          <Route path="customer" element={<InvoiceHistory />} />
          <Route path="check" element={<CheckoutSuccess />} />
        </Routes>
      </div>
    </div>
  );
};

export default StaffRoute;