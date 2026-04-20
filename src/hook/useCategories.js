import { useEffect, useState } from "react";
import api from "../api/axios";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [loadingCategory, setLoadingCategory] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);

  // ===============================
  // Fetch Categories
  // ===============================
  const fetchCategories = async () => {
    try {
      setLoadingCategory(true);

      const res = await api.get("/api/categories");

      setCategories(res.data.data || []);
    } catch (error) {
      console.log("Category Error:", error.response?.data || error);
    } finally {
      setLoadingCategory(false);
    }
  };

  // ===============================
  // Fetch Sub Categories
  // ===============================
  const fetchSubCategories = async (categoryId) => {
    try {
      const res = await api.get("/api/subcategories");

      const filtered = res.data.data.filter(
        (item) => item.category_id == categoryId
      );

      setSubCategories(filtered);
    } catch (error) {
      console.log("SubCategory Error:", error.response?.data || error);
    }
  };

  // ===============================
  // Add Category
  // ===============================
  const addCategory = async (name) => {
    try {
      setSavingCategory(true);

      await api.get("/sanctum/csrf-cookie");

      await api.post("/api/categories", {
        name,
      });

      await fetchCategories();

      return {
        success: true,
      };
    } catch (error) {
      console.log("Add Category Error:", error.response?.data || error);

      return {
        success: false,
      };
    } finally {
      setSavingCategory(false);
    }
  };

  // ===============================
  // First Load
  // ===============================
  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    subCategories,

    loadingCategory,
    savingCategory,

    fetchCategories,
    fetchSubCategories,
    addCategory,
  };
};

export default useCategories;