import { useState } from "react";
import api from "../api/axios";
import { defaultUnit } from "../constants/productUnits";

const initialFormData = {
  name: "",
  nameEn: "",
  category: "",
  subCategory: "",
  unit: defaultUnit,

  pricePerUnit: "",
  pricePerBox: "",
  boxSize: "",
  cost: "",
  wholesalePrice: "",

  stockUnit: "",
  stockBox: "",
  minStock: "",

  expiry: "",
  prescription: false,
  description: "",
  manufacturer: "",
  location: "",

  image: null,
};

const useProductForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [previewImage, setPreviewImage] = useState(null);

  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ===============================
  // Handle Input
  // ===============================
  const handleChange = async (e, fetchSubCategories) => {
    const { name, value, type, checked, files } = e.target;

    // File Upload
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

    // Checkbox
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    // Category Change
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

    // Normal Input
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // Reset Form
  // ===============================
  const resetForm = () => {
    setFormData(initialFormData);
    setPreviewImage(null);
  };

  // ===============================
  // Submit Product
  // ===============================
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setSaving(true);

    await api.get("/sanctum/csrf-cookie");

    const sendData = new FormData();

    sendData.append("name", formData.name);
    sendData.append("name_en", formData.nameEn);

    sendData.append("category_id", formData.category);
    sendData.append("sub_category_id", formData.subCategory || "");

    sendData.append("unit", formData.unit);

    sendData.append("price_per_unit", formData.pricePerUnit || 0);
    sendData.append("price_per_box", formData.pricePerBox || 0);
    sendData.append("box_size", formData.boxSize || 0);

    sendData.append("cost", formData.cost || 0);

    sendData.append("stock_box", formData.stockBox || 0);

    sendData.append("expiry_date", formData.expiry || "");

    sendData.append("manufacturer", formData.manufacturer);
    sendData.append(
      "prescription_required",
      formData.prescription ? 1 : 0
    );

    sendData.append("description", formData.description);
    sendData.append("location", formData.location);

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
    console.log(error.response?.data || error);
  } finally {
    setSaving(false);
  }
};

  const isTablet = formData.unit === "គ្រាប់";

  return {
    formData,
    setFormData,

    previewImage,
    setPreviewImage,

    saving,
    showSuccess,

    isTablet,

    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useProductForm;
