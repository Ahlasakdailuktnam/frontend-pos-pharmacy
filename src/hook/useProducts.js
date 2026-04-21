// src/hooks/useProducts.js

import { useEffect, useMemo, useState } from "react";
import {
  getProducts,
  deleteProductById,
} from "../services/auth";

const useProducts = () => {
  const [products, setProducts] = useState([]);

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

      const res = await getProducts();

      const rows = res?.data || res || [];

      setProducts(Array.isArray(rows) ? rows : []);
    } catch (error) {
      console.error("Fetch Products Error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ===============================
  // Delete Product
  // ===============================
  const deleteProduct = async (id) => {
    try {
      setDeleting(true);

      await deleteProductById(id);

      setProducts((prev) =>
        prev.filter((item) => item.id !== id)
      );

      return true;
    } catch (error) {
      console.error("Delete Product Error:", error);
      return false;
    } finally {
      setDeleting(false);
    }
  };

  // ===============================
  // Categories
  // ===============================
  const categories = useMemo(() => {
    const list = products.map(
      (item) =>
        item.category?.name ||
        item.category_name ||
        item.category ||
        "Unknown"
    );

    return ["all", ...new Set(list)];
  }, [products]);

  // ===============================
  // Filter Products
  // ===============================
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const name = (
        item.name ||
        ""
      ).toLowerCase();

      const nameEn = (
        item.name_en ||
        item.nameEn ||
        ""
      ).toLowerCase();

      const keyword = search.toLowerCase();

      const itemCategory =
        item.category?.name ||
        item.category_name ||
        item.category ||
        "Unknown";

      const matchSearch =
        name.includes(keyword) ||
        nameEn.includes(keyword);

      const matchCategory =
        category === "all" ||
        itemCategory === category;

      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  return {
    products: filteredProducts,
    loading,
    deleting,

    search,
    setSearch,

    category,
    setCategory,

    categories,

    fetchProducts,
    deleteProduct,
  };
};

export default useProducts;