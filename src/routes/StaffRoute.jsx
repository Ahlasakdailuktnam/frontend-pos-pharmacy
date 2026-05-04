import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import HomePos from "../pages/Staff/HomePos";
import InvoiceHistory from "../pages/Staff/InvoiceHistory";
import CheckoutSuccess from "../pages/Staff/CheckoutSucess";

const StaffRoute = () => {
  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC]">

  <Navbar />

  <div className="flex flex-1 overflow-hidden">

    <Sidebar />
    <div className="flex-1 overflow-hidden">
      <Routes>
        <Route path="/" element={<HomePos />} />
        <Route path="customer" element={<InvoiceHistory />} />
        <Route path="check" element={<CheckoutSuccess />} />
      </Routes>
    </div>

  </div>

</div>
  );
};

export default StaffRoute;