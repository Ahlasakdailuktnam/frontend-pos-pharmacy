import React from "react";
import useTypes from "../../../hook/useTypes";

import TypeHeader from "../../../components/types/TypeHeader";
import TypeStats from "../../../components/types/TypeStats";
import CategoryList from "../../../components/types/CategoryList";
import AddCategoryModal from "../../../components/types/AddCategoryModal";
import AddSubModal from "../../../components/types/AddSubModal";
import DeleteModal from "../../../components/types/DeleteModal";

const AddType = () => {
  const {
    loading,
    categories,
    subCategories,

    selectedCategory,
    setSelectedCategory,

    showAddCategory,
    setShowAddCategory,

    showAddSub,
    setShowAddSub,

    showDelete,
    setShowDelete,

    createCategory,
    createSubCategory,
    removeCategory,
    removeSubCategory,
  } = useTypes();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <TypeHeader onAdd={() => setShowAddCategory(true)} />

      <div className="p-6 space-y-6">
        <TypeStats categories={categories} />

        <CategoryList
          categories={categories}
          subCategories={subCategories}
          onAddSub={(category) => {
            setSelectedCategory(category);
            setShowAddSub(true);
          }}
          onDeleteCategory={(category) => {
            setSelectedCategory(category);
            setShowDelete(true);
          }}
          onDeleteSub={removeSubCategory}
        />
      </div>

      <AddCategoryModal
        open={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        onSubmit={createCategory}
      />

      <AddSubModal
        open={showAddSub}
        selectedCategory={selectedCategory}
        onClose={() => setShowAddSub(false)}
        onSubmit={createSubCategory}
      />

      <DeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={removeCategory}
        title="លុបប្រភេទ"
        message={`តើអ្នកចង់លុប ${
          selectedCategory?.name || ""
        } ?`}
      />
    </div>
  );
};

export default AddType;