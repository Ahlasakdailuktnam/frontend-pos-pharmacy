import React from "react";

import useCategories from "../../../hook/useCategories";
import useProductForm from "../../../hook/useProductForm";
import useUnits from "../../../hook/useUnits";
import useSuppliers from "../../../hook/useSuppliers";
import ProductHeader from "../../../components/products/ProductHeader";
import ProductSuccess from "../../../components/products/ProductSuccess";
import ProductImageUpload from "../../../components/products/ProductImageUpload";
import ProductBasicInfo from "../../../components/products/ProductBasicInfo";
import ProductPricing from "../../../components/products/ProductPricing";
import ProductStock from "../../../components/products/ProductStock";
import ProductExtraInfo from "../../../components/products/ProductExtraInfo";
import ProductActions from "../../../components/products/ProductActions";

import { addUnit } from "../../../services/auth";

const AddMedicine = () => {
  const { categories, subCategories, loadingCategory, fetchSubCategories } =
    useCategories();

  const { units, loadingUnits, fetchUnits } = useUnits();

  const {
    formData,
    previewImage,
    saving,
    showSuccess,
    handleChange,
    handleSubmit,
  } = useProductForm();
  const { suppliers, loadingSuppliers, fetchSuppliers } = useSuppliers();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <ProductHeader />

      {/* Success */}
      <ProductSuccess show={showSuccess} />

      <div className="p-6">
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Upload Image */}
            <ProductImageUpload
              previewImage={previewImage}
              handleChange={handleChange}
            />

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <ProductBasicInfo
                formData={formData}
                handleChange={handleChange}
                fetchSubCategories={fetchSubCategories}
                categories={categories}
                subCategories={subCategories}
                loadingCategory={loadingCategory}
                units={units}
                loadingUnits={loadingUnits}
                fetchUnits={fetchUnits}
                addUnit={addUnit}
              />

              {/* Pricing */}
              <ProductPricing
                formData={formData}
                handleChange={handleChange}
                fetchSubCategories={fetchSubCategories}
                units={units}
              />

              {/* Stock */}
              <ProductStock
                formData={formData}
                handleChange={handleChange}
                fetchSubCategories={fetchSubCategories}
              />

              {/* Extra Info */}
              <ProductExtraInfo
                formData={formData}
                handleChange={handleChange}
                fetchSubCategories={fetchSubCategories}
                suppliers={suppliers}
                loadingSuppliers={loadingSuppliers}
              />
            </div>

            {/* Actions */}
            <ProductActions saving={saving} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;
