// src/pages/products/ProductList.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";

import useProducts from "../../../hook/useProducts";

import ProductFilters from "../../../components/products/ProductFilters";
import ProductTable from "../../../components/products/ProuductTable";
import DeleteProductModal from "../../../components/products/DeleteProductModal";
import ProductEmpty from "../../../components/products/ProductEmpty";

const ProductList = () => {
  const {
    products,
    loading,
    deleting,

    search,
    setSearch,

    category,
    setCategory,

    categories,

    deleteProduct,
  } = useProducts();

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // ===============================
  // Open Delete Modal
  // ===============================
  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  // ===============================
  // Close Delete Modal
  // ===============================
  const closeDeleteModal = () => {
    setSelectedProduct(null);
    setShowDeleteModal(false);
  };

  // ===============================
  // Confirm Delete
  // ===============================
  const handleDelete = async () => {
    if (!selectedProduct) return;

    const success = await deleteProduct(
      selectedProduct.id
    );

    if (success) {
      closeDeleteModal();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              បញ្ជីផលិតផល
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              គ្រប់គ្រង និងតាមដានព័ត៌មានផលិតផលទាំងអស់
            </p>
          </div>

          <Link
            to="/add-product"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition"
          >
            <MdAdd size={20} />
            បន្ថែមផលិតផលថ្មី
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-2">
        {/* Filters */}
        <ProductFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={categories}
        />

        {/* Loading */}
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-gray-400">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <ProductEmpty />
        ) : (
          <ProductTable
            products={products}
            onDelete={openDeleteModal}
          />
        )}
      </div>

      {/* Delete Modal */}
      <DeleteProductModal
        open={showDeleteModal}
        product={selectedProduct}
        deleting={deleting}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ProductList;