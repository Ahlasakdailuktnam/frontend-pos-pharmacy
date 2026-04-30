import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdAdd,
  MdEdit,
  MdDelete,
  MdMoreVert,
  MdSearch,
  MdFilterList,
  MdWarehouse,
  MdLocationOn,
  MdNotes,
  MdCheckCircle,
  MdCancel,
  MdClose,
} from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import useWarehouses from "../../../hook/useWareHouse";

const WarehouseList = () => {
  const navigate = useNavigate();
  const {
    warehouses,
    loadingWarehouse,
    removeWarehouse,
  } = useWarehouses();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleDeleteWarehouse = async () => {
    const result = await removeWarehouse(selectedWarehouse.id);
    
    if (result.success) {
      setShowDeleteModal(false);
      setSelectedWarehouse(null);
    } else {
      alert("មានបញ្ហាក្នុងការលុបឃ្លាំង។ សូមព្យាយាមម្តងទៀត");
    }
  };

  // Convert backend status (boolean) to display status
  const getDisplayStatus = (status) => {
    return status === true || status === 1 ? "active" : "inactive";
  };

  const filteredWarehouses = warehouses.filter((warehouse) => {
    const warehouseStatus = getDisplayStatus(warehouse.status);
    const matchesSearch =
      (warehouse.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (warehouse.warehouse_code?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (warehouse.location?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || warehouseStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const isActive = status === true || status === 1;
    if (isActive) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <MdCheckCircle size={12} />
          កំពុងដំណើរការ
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
        <MdCancel size={12} />
        បិទដំណើរការ
      </span>
    );
  };

  // Loading state
  if (loadingWarehouse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">កំពុងផ្ទុកទិន្នន័យ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/dashboard"
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <MdArrowBack size={20} className="text-gray-600" />
              </a>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  ឃ្លាំងរក្សាទុកទំនិញ
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  គ្រប់គ្រងឃ្លាំងរក្សាទុកផលិតផលទាំងអស់
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/admin/warehouse/add")}
              className="px-5 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <MdAdd size={20} />
              បន្ថែមឃ្លាំងថ្មី
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">សរុបឃ្លាំងទាំងអស់</p>
                  <p className="text-2xl font-bold text-gray-800">{warehouses.length}</p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <MdWarehouse className="text-teal-600 text-2xl" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">កំពុងដំណើរការ</p>
                  <p className="text-2xl font-bold text-green-600">
                    {warehouses.filter(w => w.status === true || w.status === 1).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MdCheckCircle className="text-green-600 text-2xl" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">បិទដំណើរការ</p>
                  <p className="text-2xl font-bold text-red-600">
                    {warehouses.filter(w => w.status === false || w.status === 0).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <MdCancel className="text-red-600 text-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">
            <div className="p-5">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="ស្វែងរកឃ្លាំងតាមឈ្មោះ, កូដ ឬ ទីតាំង..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 appearance-none bg-white"
                    >
                      <option value="all">ទាំងអស់</option>
                      <option value="active">កំពុងដំណើរការ</option>
                      <option value="inactive">បិទដំណើរការ</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warehouses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWarehouses.map((warehouse) => (
              <div
                key={warehouse.id}
                className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                        <FaBoxes className="text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">
                          {warehouse.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {warehouse.warehouse_code}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MdMoreVert className="text-gray-500" />
                      </button>
                      <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        <button
                          onClick={() => navigate(`/admin/warehouse/edit/${warehouse.id}`, { state: { warehouse } })}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <MdEdit size={16} />
                          កែប្រែ
                        </button>
                        <button
                          onClick={() => {
                            setSelectedWarehouse(warehouse);
                            setShowDeleteModal(true);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <MdDelete size={16} />
                          លុប
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2">
                      <MdLocationOn className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{warehouse.location || "មិនមាន"}</span>
                    </div>
                    {warehouse.note && (
                      <div className="flex items-start gap-2">
                        <MdNotes className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{warehouse.note}</span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    {getStatusBadge(warehouse.status)}
                    <span className="text-xs text-gray-400">
                      បង្កើត: {warehouse.created_at ? new Date(warehouse.created_at).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredWarehouses.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdWarehouse className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {searchTerm || statusFilter !== "all" ? "មិនមានលទ្ធផល" : "មិនមានទិន្នន័យឃ្លាំង"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== "all" 
                  ? "សូមប្តូរលក្ខណៈវិនិច្ឆ័យស្វែងរក" 
                  : "មិនទាន់មានការបង្កើតឃ្លាំងនៅឡើយទេ"}
              </p>
              {(searchTerm || statusFilter !== "all") ? (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                  className="px-5 py-2.5 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors inline-flex items-center gap-2"
                >
                  <MdClose size={20} />
                  សម្អាតតម្រង
                </button>
              ) : (
                <button
                  onClick={() => navigate("/warehouse/add")}
                  className="px-5 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors inline-flex items-center gap-2"
                >
                  <MdAdd size={20} />
                  បន្ថែមឃ្លាំងថ្មី
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdDelete className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  លុបឃ្លាំង
                </h3>
                <p className="text-gray-500 mb-4">
                  តើអ្នកពិតជាចង់លុបឃ្លាំង 
                  <span className="font-semibold text-gray-800">
                    {" "}{selectedWarehouse?.name}{" "}
                  </span>
                  មែនទេ?
                </p>
                <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                  សូមប្រុងប្រយ័ត្ន! ការលុបនេះមិនអាចស្តារឡើងវិញបានទេ។
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  បោះបង់
                </button>
                <button
                  onClick={handleDeleteWarehouse}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  យល់ព្រមលុប
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseList;