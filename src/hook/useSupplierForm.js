import { useState } from "react";
import { addSupplier } from "../services/auth";

const useSupplierForm = () => {
  const [formData, setFormData] = useState({
    company_name_kh: "",
    company_name_en: "",
    contact_person: "",
    phone: "",
    email: "",
    address: "",
    note: "",
    status: true,
    image: null,
  });

  const [previewLogo, setPreviewLogo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setFormData({
      company_name_kh: "",
      company_name_en: "",
      contact_person: "",
      phone: "",
      email: "",
      address: "",
      note: "",
      status: true,
      image: null,
    });

    setPreviewLogo(null);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      setPreviewLogo(URL.createObjectURL(file));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setErrors({});

      const sendData = new FormData();

      sendData.append("company_name_kh", formData.company_name_kh);
      sendData.append("company_name_en", formData.company_name_en);
      sendData.append("contact_person", formData.contact_person);
      sendData.append("phone", formData.phone);
      sendData.append("email", formData.email);
      sendData.append("address", formData.address);
      sendData.append("note", formData.note);
      sendData.append("status", formData.status ? 1 : 0);

      if (formData.image) {
        sendData.append("image", formData.image);
      }

      await addSupplier(sendData);

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      resetForm();
    } catch (error) {
      console.log(error.response?.data || error);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    previewLogo,
    saving,
    showSuccess,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useSupplierForm;