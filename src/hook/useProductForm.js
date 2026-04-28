import { useState } from "react";
import api from "../api/axios";

const initialFormData = {
  name: "",
  nameEn: "",

  category: "",
  subCategory: "",

  unit_id: "",

  pricePerUnit: "",
  pricePerPack: "",
  packSize: "",

  cost: "",

  stockUnit: "",
  stockBox: "",
  minStock: "",

  expiry: "",
  prescription: false,

  supplier_id: "",
  barcode: "",
  manufacturer: "",
  description: "",
  location: "",

  image: null,
};

const useProductForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [previewImage, setPreviewImage] = useState(null);

  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  /* ===============================
     HANDLE CHANGE
  =============================== */
  const handleChange = async (e, fetchSubCategories) => {
    const { name, value, type, checked, files } = e.target;

    // IMAGE
    if (type === "file") {
      const file = files?.[0];
      if (!file) return;

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
      return;
    }

    // CHECKBOX
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    // CATEGORY
    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: value,
        subCategory: "",
      }));

      if (fetchSubCategories) {
        await fetchSubCategories(value);
      }

      return;
    }

    // NORMAL INPUT
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===============================
     RESET FORM
  =============================== */
  const resetForm = () => {
    setFormData(initialFormData);
    setPreviewImage(null);
    setErrors({});
  };

  /* ===============================
     SUBMIT
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setErrors({});

      await api.get("/sanctum/csrf-cookie");

      const sendData = new FormData();

      // Basic Info
      sendData.append("name", formData.name);
      sendData.append("name_en", formData.nameEn);

      sendData.append("category_id", formData.category);
      sendData.append("sub_category_id", formData.subCategory || "");

      sendData.append("unit_id", formData.unit_id || "");

      // Pricing
      sendData.append(
        "price_per_unit",
        formData.pricePerUnit || 0
      );

      sendData.append(
        "price_per_box",
        formData.pricePerPack || 0
      );

      sendData.append(
        "box_size",
        formData.packSize || 1
      );

      sendData.append("cost", formData.cost || 0);

      // Stock
      sendData.append(
        "stock_unit",
        formData.stockUnit || 0
      );

      sendData.append(
        "stock_box",
        formData.stockBox || 0
      );

      sendData.append(
        "min_stock",
        formData.minStock || 0
      );

      // Extra
      sendData.append(
        "expiry_date",
        formData.expiry || ""
      );

      sendData.append(
        "prescription_required",
        formData.prescription ? 1 : 0
      );

      sendData.append(
        "supplier_id",
        formData.supplier_id || ""
      );

      sendData.append(
        "barcode",
        formData.barcode || ""
      );

      sendData.append(
        "manufacturer",
        formData.manufacturer || ""
      );

      sendData.append(
        "description",
        formData.description || ""
      );

      sendData.append(
        "location",
        formData.location || ""
      );

      // Image
      if (formData.image) {
        sendData.append("image", formData.image);
      }

      await api.post("/api/products", sendData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      resetForm();
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }

      console.log(error.response?.data || error);
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    setFormData,
    previewImage,
    saving,
    showSuccess,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useProductForm;