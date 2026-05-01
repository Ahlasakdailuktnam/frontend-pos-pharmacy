// src/hooks/useProducts.js

import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProductById,
  getCategories,
} from "../services/auth";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");
const [category, setCategory] = useState("all");

  // ===============================
  // Fetch Products
  // ===============================
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts({
        search,
        category,
      });

      const rows = res?.data || [];


      setProducts(Array.isArray(rows) ? rows : []);
    } catch (error) {
      console.error(
        "Fetch Products Error:",
        error.response || error
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Fetch Categories
  // ===============================
  const fetchCategories = async () => {
    try {
      const res = await getCategories();

      const rows = res?.data?.data || [];

      setCategories(Array.isArray(rows) ? rows : []);
    } catch (error) {
      console.error(
        "Fetch Categories Error:",
        error.response || error
      );
      setCategories([]);
    }
  };

  // ===============================
  // Auto Fetch Products
  // ===============================
  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  // ===============================
  // First Load Categories
  // ===============================
  useEffect(() => {
    fetchCategories();
  }, []);

  // ===============================
  // Delete Product
  // ===============================
  const deleteProduct = async (id) => {
    try {
      setDeleting(true);

      await deleteProductById(id);

      // Update UI instantly
      setProducts((prev) =>
        prev.filter((item) => item.id !== id)
      );

      return true;
    } catch (error) {
      console.error(
        "Delete Product Error:",
        error.response || error
      );
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return {
    products,
    categories,

    loading,
    deleting,

    search,
    setSearch,

    category,
    setCategory,

    fetchProducts,
    deleteProduct,
  };
};

export default useProducts;