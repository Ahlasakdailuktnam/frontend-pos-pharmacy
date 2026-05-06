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
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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
      console.error("Fetch Products Error:", error.response || error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Search Products (for Navbar)
  // ===============================
  const searchProducts = async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const res = await getProducts({ search: query });
      const data = res?.data || [];
      setSearchResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Search Products Error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
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
      console.error("Fetch Categories Error:", error.response || error);
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
      setProducts((prev) => prev.filter((item) => item.id !== id));
      return true;
    } catch (error) {
      console.error("Delete Product Error:", error.response || error);
      return false;
    } finally {
      setDeleting(false);
    }
  };

  // ===============================
  // Clear Search Results
  // ===============================
  const clearSearchResults = () => {
    setSearchResults([]);
    setSearch("");
  };

  return {
    products,
    categories,
    searchResults,
    isSearching,
    loading,
    deleting,
    search,
    setSearch,
    category,
    setCategory,
    fetchProducts,
    deleteProduct,
    searchProducts,
    clearSearchResults,
  };
};

export default useProducts;