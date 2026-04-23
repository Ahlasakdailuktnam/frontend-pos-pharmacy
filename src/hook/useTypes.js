// src/hooks/useTypes.js

import { useEffect, useState } from "react";
import {
  getCategories,
  getSubCategories,
  addCategory,
  addSubCategory,
  deleteCategory,
  deleteSubCategory,
} from "../services/auth";

const useTypes = () => {
  // ======================
  // DATA STATE
  // ======================
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ======================
  // UI STATE
  // ======================
  const [expandedId, setExpandedId] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSub, setShowAddSub] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // ======================
  // FETCH DATA
  // ======================
  const fetchTypes = async () => {
    try {
      setLoading(true);

      const [catRes, subRes] = await Promise.all([
        getCategories(),
        getSubCategories(),
      ]);

      setCategories(catRes?.data?.data || []);
      setSubCategories(subRes?.data?.data || []);
    } catch (error) {
      console.log("Fetch Types Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  // ======================
  // CREATE CATEGORY
  // ======================
  const createCategory = async (payload) => {
    try {
      await addCategory(payload);
      setShowAddCategory(false);
      fetchTypes();
    } catch (error) {
      console.log("Create Category Error:", error);
    }
  };

  // ======================
  // CREATE SUB CATEGORY
  // ======================
  const createSubCategory = async (payload) => {
    try {
      await addSubCategory(payload);
      setShowAddSub(false);
      setSelectedCategory(null);
      fetchTypes();
    } catch (error) {
      console.log("Create Sub Error:", error);
    }
  };

  // ======================
  // DELETE CATEGORY
  // ======================
  const removeCategory = async () => {
    try {
      if (!selectedCategory) return;

      await deleteCategory(selectedCategory.id);

      setShowDelete(false);
      setSelectedCategory(null);

      fetchTypes();
    } catch (error) {
      console.log("Delete Category Error:", error);
    }
  };

  // ======================
  // DELETE SUB CATEGORY
  // ======================
  const removeSubCategory = async (id) => {
    try {
      await deleteSubCategory(id);
      fetchTypes();
    } catch (error) {
      console.log("Delete Sub Error:", error);
    }
  };

  return {
    // data
    loading,
    categories,
    subCategories,

    // ui state
    expandedId,
    setExpandedId,

    selectedCategory,
    setSelectedCategory,

    showAddCategory,
    setShowAddCategory,

    showAddSub,
    setShowAddSub,

    showDelete,
    setShowDelete,

    // methods
    fetchTypes,
    createCategory,
    createSubCategory,
    removeCategory,
    removeSubCategory,
  };
};

export default useTypes;