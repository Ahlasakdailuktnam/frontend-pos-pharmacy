import { Routes, Route } from "react-router-dom";
import SidebarAdmin from "../components/layout/SidebarAdmin";
import Navbar from "../components/layout/Navbar";

import Dashboard from "../pages/Admins/Dashborad";
import ChartProducts from "../pages/Admins/Iventory/ChartProducts";
import AddMedicine from "../pages/Admins/Iventory/AddMedicine";
import AddType from "../pages/Admins/Iventory/AddType";
import StaffDashboard from "../pages/Admins/staff/StaffDashboard";
import AddStaff from "../pages/Admins/staff/Addstaff";
import PayRoll from "../pages/Admins/staff/PayRoll";
import Attendance from "../pages/Admins/staff/Attendance";
import Supplier from "../pages/Admins/Supplier/Supplier";
import AddSupplier from "../pages/Admins/Supplier/AddSupplier";
import SupplierDetail from "../pages/Admins/Supplier/SupplierDetail";
import Customer from "../pages/Admins/Customer";
import Expence from "../pages/Admins/Expence";
import ReportAdmin from "../pages/Admins/ReportAdmin";
import ProductList from "../pages/Admins/Iventory/ProductList";
import AddPurchaseItem from "../pages/Admins/Supplier/AddPurchaseItem";
import ReceiptPage from "../pages/Admins/Supplier/ReceiptPage";
import { Warehouse } from "lucide-react";
import WarehouseList from "../pages/Admins/warehouse/WareHouseList";
import AddWarehouse from "../pages/Admins/warehouse/AddWarehouse";
import EditWarehouse from "../pages/Admins/warehouse/EditWarehouse";
import PurchaseInvoiceManagement from "../pages/Admins/Supplier/PurchaseInvoiceManagement";
import PurchasePaymentManagement from "../pages/Admins/Supplier/PurchasePaymentManagement";
import AllPaymentsList from "../pages/Admins/Supplier/AllPaymentsList";
const AdminRoute = () => {
  return (
    <div className="grid grid-cols-[298px_1fr] h-screen bg-gray-100">
      <SidebarAdmin />

      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar />

        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="inventory" element={<ChartProducts />} />
            <Route path="inventory/list" element={<ProductList />} />
            <Route path="inventory/add" element={<AddMedicine />} />
            <Route path="inventory/addType" element={<AddType />} />
            <Route path="staff" element={<StaffDashboard />} />
            <Route path="staff/add" element={<AddStaff />} />
            <Route path="staff/list" element={<PayRoll />} />
            <Route path="staff/attendance" element={<Attendance />} />
            <Route path="supplier" element={<Supplier />} />
            <Route path="supplier/add" element={<AddSupplier />} />
            <Route
              path="supplier/add-sup-invoice"
              element={<AddPurchaseItem />}
            />
            <Route path="supplier/details" element={<SupplierDetail />} />
            <Route
              path="supplier/purchase-receipt/:id"
              element={<ReceiptPage />}
            />
            <Route
              path="supplier/purchase-payments/:id"
              element={<PurchasePaymentManagement />}
            />
            <Route
              path="supplier/list"
              element={<PurchaseInvoiceManagement />}
            />
            <Route path="supplier/all-payments" element={<AllPaymentsList />} />

            <Route path="warehouse" element={<WarehouseList />} />
            <Route path="warehouse/add" element={<AddWarehouse />} />
            <Route path="warehouse/edit/:id" element={<EditWarehouse />} />
            <Route path="customer" element={<Customer />} />
            <Route path="expence" element={<Expence />} />
            <Route path="report" element={<ReportAdmin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminRoute;
